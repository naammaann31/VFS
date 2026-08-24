import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountdownTimer from '../../components/mockTest/CountdownTimer';
import SectionNavigator from '../../components/mockTest/SectionNavigator';
import AudioPlayer from '../../components/mockTest/AudioPlayer';
import QuestionCard from '../../components/mockTest/QuestionCard';
import ReadingPassage from '../../components/mockTest/ReadingPassage';
import WritingEditor from '../../components/mockTest/WritingEditor';
import SpeakingRecorder from '../../components/mockTest/SpeakingRecorder';
import ReviewPanel from '../../components/mockTest/ReviewPanel';
import './mockTest.css';

export default function MockTestAttempt() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active section view: 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING' | 'REVIEW'
  const [activeSection, setActiveSection] = useState('LISTENING');
  const [activeSpeakingPart, setActiveSpeakingPart] = useState(1);

  // Answers State
  const [answers, setAnswers] = useState({}); // { [questionId]: value }
  const [writingEssays, setWritingEssays] = useState({}); // { [questionId]: text }
  const [speakingRecordings, setSpeakingRecordings] = useState({}); // { [questionId]: audioUrl }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  const autoSaveTimerRef = useRef(null);

  useEffect(() => {
    fetchAttempt();

    // Setup periodic auto-save every 25 seconds
    autoSaveTimerRef.current = setInterval(() => {
      saveDraft();
    }, 25000);

    // Anti-Cheat: Disable right click during exam
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Anti-Cheat: Monitor tab switches
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.warn('Tab switch detected in IELTS exam.');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [attemptId]);

  const fetchAttempt = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('vfs_token');
      const res = await fetch(`/api/attempts/${attemptId}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to load attempt');
      }

      const att = data.attempt;
      setAttempt(att);

      // If already submitted or completed, redirect to result confirmation page
      if (att.status === 'COMPLETED' || att.status === 'UNDER_REVIEW' || att.status === 'SUBMITTED') {
        navigate(`/mock-tests/result/${attemptId}`, { replace: true });
        return;
      }

      // Populate existing answers
      const existingAnswers = {};
      if (att.answers) {
        att.answers.forEach(a => {
          if (a.answer !== null) existingAnswers[a.questionId] = a.answer;
        });
      }
      setAnswers(existingAnswers);

      // Populate writing essays
      const existingWriting = {};
      if (att.writingSubmissions) {
        att.writingSubmissions.forEach(w => {
          existingWriting[w.questionId] = w.answer || '';
        });
      }
      setWritingEssays(existingWriting);

      // Populate speaking recordings
      const existingSpeaking = {};
      if (att.speakingSubmissions) {
        att.speakingSubmissions.forEach(s => {
          if (s.audioUrl) existingSpeaking[s.questionId] = s.audioUrl;
        });
      }
      setSpeakingRecordings(existingSpeaking);

    } catch (err) {
      console.error('Fetch attempt error:', err);
      setError(err.message || 'Failed to load exam attempt');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleWritingChange = (questionId, text) => {
    setWritingEssays(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const handleAudioUploaded = (questionId, audioUrl, duration) => {
    setSpeakingRecordings(prev => ({
      ...prev,
      [questionId]: audioUrl
    }));
  };

  const saveDraft = async () => {
    if (!attemptId) return;

    try {
      setAutoSaveStatus('Saving draft...');
      const token = localStorage.getItem('vfs_token');

      const formattedAnswers = Object.entries(answers).map(([qId, val]) => ({
        questionId: qId,
        answer: val
      }));

      const formattedWriting = Object.entries(writingEssays).map(([qId, text]) => ({
        questionId: qId,
        answer: text
      }));

      await fetch(`/api/attempts/${attemptId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          answers: formattedAnswers,
          writing: formattedWriting
        })
      });

      setAutoSaveStatus('Draft auto-saved ✓');
      setTimeout(() => setAutoSaveStatus(''), 3000);
    } catch (err) {
      console.error('Auto-save error:', err);
      setAutoSaveStatus('');
    }
  };

  const handleSubmitTest = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('vfs_token');

      const formattedAnswers = Object.entries(answers).map(([qId, val]) => ({
        questionId: qId,
        answer: val
      }));

      const formattedWriting = Object.entries(writingEssays).map(([qId, text]) => ({
        questionId: qId,
        answer: text
      }));

      const formattedSpeaking = Object.entries(speakingRecordings).map(([qId, url]) => ({
        questionId: qId,
        audioUrl: url
      }));

      const res = await fetch(`/api/attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          answers: formattedAnswers,
          writing: formattedWriting,
          speaking: formattedSpeaking
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to submit test');
      }

      navigate(`/mock-tests/result/${attemptId}`);
    } catch (err) {
      console.error('Submit test error:', err);
      alert('Error submitting test: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mock-app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ display: 'inline-block', width: '48px', height: '48px', border: '5px solid #E2E8F0', borderTopColor: '#D97706', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1.25rem', fontWeight: 700, color: '#1C2B4B', fontSize: '1.1rem' }}>
            Preparing your IELTS Exam Environment...
          </p>
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="mock-app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', textAlign: 'center', maxWidth: '480px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ color: '#1C2B4B', marginBottom: '0.5rem' }}>Failed to Load Test</h3>
          <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>{error || 'Unable to find or verify this attempt.'}</p>
          <button type="button" className="btn-vfs btn-vfs-primary" onClick={() => navigate('/mock-tests')}>
            Return to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const mockTest = attempt.mockTest;
  const sections = mockTest.sections || [];

  const listeningSec = sections.find(s => s.type === 'LISTENING');
  const readingSec = sections.find(s => s.type === 'READING');
  const writingSec = sections.find(s => s.type === 'WRITING');
  const speakingSec = sections.find(s => s.type === 'SPEAKING');

  // Candidate name for header
  const savedStudent = localStorage.getItem('vfs_student');
  const studentObj = savedStudent ? JSON.parse(savedStudent) : null;
  const studentName = studentObj?.name || 'Candidate';

  // Compute total writing words
  const totalWritingWords = Object.values(writingEssays).join(' ').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="mock-app-container">
      {/* Sticky Exam Header & Timer (2h 45m / 165 mins) */}
      <CountdownTimer
        durationMinutes={mockTest.duration || 165}
        studentName={studentName}
        testTitle={mockTest.title}
        onTimeExpire={handleSubmitTest}
      />

      {/* Module Navigator Stepper */}
      <SectionNavigator
        currentSection={activeSection}
        onSelectSection={(sec) => {
          saveDraft();
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedSections={completedSections}
      />

      <main className="mock-content-body">
        {autoSaveStatus && (
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginBottom: '0.5rem' }}>
            {autoSaveStatus}
          </div>
        )}

        {/* 1. LISTENING SECTION */}
        {activeSection === 'LISTENING' && listeningSec && (
          <div className="mock-section-card">
            <div className="section-title-wrap">
              <div className="section-category-tag">Module 1</div>
              <h2 className="section-heading">{listeningSec.title}</h2>
              <p className="section-subtext">{listeningSec.instructions || 'Listen to the audio recording carefully and answer all questions.'}</p>
            </div>

            <AudioPlayer
              audioUrl={listeningSec.questions[0]?.audioUrl || '/listening-audio.mp3'}
              maxPlays={2}
              autoPrepSeconds={30}
            />

            <div>
              {listeningSec.questions.map((q, idx) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={q.order ? q.order - 1 : idx}
                  value={answers[q.id]}
                  onChange={handleAnswerChange}
                />
              ))}
            </div>

            <div className="section-nav-footer">
              <div></div>
              <button
                type="button"
                className="btn-vfs btn-vfs-primary"
                onClick={() => {
                  saveDraft();
                  setCompletedSections(prev => [...new Set([...prev, 'LISTENING'])]);
                  setActiveSection('READING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Next: Reading Section (60 Mins) →
              </button>
            </div>
          </div>
        )}

        {/* 2. READING SECTION (60 MINUTES - 40 QUESTIONS) */}
        {activeSection === 'READING' && readingSec && (
          <div className="mock-section-card">
            <div className="section-title-wrap">
              <div className="section-category-tag">Module 2 • 60 Minutes</div>
              <h2 className="section-heading">{readingSec.title}</h2>
              <p className="section-subtext">{readingSec.instructions || 'Read the passages and answer Questions 1–40.'}</p>
            </div>

            <ReadingPassage
              questions={readingSec.questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
            />

            <div className="section-nav-footer">
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                onClick={() => {
                  saveDraft();
                  setActiveSection('LISTENING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← Back to Listening
              </button>
              <button
                type="button"
                className="btn-vfs btn-vfs-primary"
                onClick={() => {
                  saveDraft();
                  setCompletedSections(prev => [...new Set([...prev, 'READING'])]);
                  setActiveSection('WRITING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Next: Writing Section (60 Mins) →
              </button>
            </div>
          </div>
        )}

        {/* 3. WRITING SECTION (60 MINUTES - TASK 1 & TASK 2) */}
        {activeSection === 'WRITING' && writingSec && (
          <div className="mock-section-card">
            <div className="section-title-wrap">
              <div className="section-category-tag">Module 3 • 60 Minutes</div>
              <h2 className="section-heading">{writingSec.title}</h2>
              <p className="section-subtext">{writingSec.instructions || 'Spend 20 minutes on Task 1 and 40 minutes on Task 2.'}</p>
            </div>

            {writingSec.questions.map((q, qIdx) => (
              <div key={q.id} style={{ marginBottom: '2.5rem' }}>
                <WritingEditor
                  question={q}
                  value={writingEssays[q.id] || ''}
                  onChange={(text) => handleWritingChange(q.id, text)}
                  minWords={qIdx === 0 ? 150 : 250}
                />
              </div>
            ))}

            <div className="section-nav-footer">
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                onClick={() => {
                  saveDraft();
                  setActiveSection('READING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← Back to Reading
              </button>
              <button
                type="button"
                className="btn-vfs btn-vfs-primary"
                onClick={() => {
                  saveDraft();
                  setCompletedSections(prev => [...new Set([...prev, 'WRITING'])]);
                  setActiveSection('SPEAKING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Next: Speaking Section →
              </button>
            </div>
          </div>
        )}

        {/* 4. SPEAKING SECTION */}
        {activeSection === 'SPEAKING' && speakingSec && (
          <div className="mock-section-card">
            <div className="section-title-wrap">
              <div className="section-category-tag">Module 4 • 11–14 Minutes</div>
              <h2 className="section-heading">{speakingSec.title}</h2>
              <p className="section-subtext">Record your voice responses using your device's microphone.</p>
            </div>

            {/* Official 5-point instructions card */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1C2B4B', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📋</span> <span>Speaking – Instructions</span>
              </div>
              <ol style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.7', margin: 0, paddingLeft: '1.25rem' }}>
                <li><strong>Total time:</strong> The total time for the speaking will be <strong>11–14 minutes</strong>.</li>
                <li><strong>3 Parts:</strong> The test consists of 3 structured parts.</li>
                <li><strong>Part-1 (4–5 minutes):</strong> The candidate and examiner introduce themselves. Candidates then answer general questions about familiar topics.</li>
                <li><strong>Part-2 (3–4 minutes):</strong> The candidate is given a task card with prompts and is asked to talk on a particular topic. The candidate has <strong>one minute to prepare and make notes</strong>, before speaking for between <strong>1 and 2 minutes</strong>.</li>
                <li><strong>Part-3 (4–5 minutes):</strong> The examiner and candidate engage in a discussion of more abstract issues which are thematically linked to the topic in Part-2.</li>
              </ol>
            </div>

            {/* Speaking Part Tabs */}
            {speakingSec.questions.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {speakingSec.questions.map((q, idx) => {
                  const pNum = idx + 1;
                  const isRecorded = !!speakingRecordings[q.id];
                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={`btn-vfs ${activeSpeakingPart === pNum ? 'btn-vfs-primary' : 'btn-vfs-secondary'}`}
                      style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
                      onClick={() => setActiveSpeakingPart(pNum)}
                    >
                      🎙️ Part {pNum} {pNum === 1 ? '(Introduction)' : pNum === 2 ? '(Cue Card)' : '(Discussion)'} {isRecorded ? '✓' : '•'}
                    </button>
                  );
                })}
              </div>
            )}

            {speakingSec.questions.map((q, idx) => {
              const pNum = idx + 1;
              if (speakingSec.questions.length > 1 && activeSpeakingPart !== pNum) {
                return null;
              }
              return (
                <SpeakingRecorder
                  key={q.id}
                  question={q}
                  attemptId={attemptId}
                  savedAudioUrl={speakingRecordings[q.id]}
                  onAudioUploaded={handleAudioUploaded}
                />
              );
            })}

            <div className="section-nav-footer">
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                onClick={() => {
                  saveDraft();
                  setActiveSection('WRITING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← Back to Writing
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {activeSpeakingPart < speakingSec.questions.length && (
                  <button
                    type="button"
                    className="btn-vfs btn-vfs-secondary"
                    onClick={() => setActiveSpeakingPart(prev => prev + 1)}
                  >
                    Next Speaking Part →
                  </button>
                )}

                <button
                  type="button"
                  className="btn-vfs btn-vfs-primary"
                  onClick={() => {
                    saveDraft();
                    setCompletedSections(prev => [...new Set([...prev, 'SPEAKING'])]);
                    setActiveSection('REVIEW');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Review & Submit Test →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. REVIEW & SUBMIT SECTION */}
        {activeSection === 'REVIEW' && (
          <div className="mock-section-card">
            <div className="section-title-wrap">
              <div className="section-category-tag">Final Step</div>
              <h2 className="section-heading">Test Summary & Final Submission</h2>
              <p className="section-subtext">Please review your completed sections before final submission.</p>
            </div>

            <ReviewPanel
              test={mockTest}
              answers={answers}
              writingEssay={Object.values(writingEssays).join('\n\n')}
              speakingRecordings={speakingRecordings}
              onNavigateSection={(sec) => {
                setActiveSection(sec);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSubmitTest={handleSubmitTest}
              isSubmitting={isSubmitting}
            />

            <div className="section-nav-footer">
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                onClick={() => {
                  setActiveSection('SPEAKING');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={isSubmitting}
              >
                ← Back to Speaking
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
