import React, { useState, useRef, useEffect } from 'react';

export default function SpeakingRecorder({
  question,
  attemptId,
  savedAudioUrl,
  onAudioUploaded,
  partNumber = 1,
  disabled = false
}) {
  const { id: questionId, questionText, preparationTime = 15, responseTime = 180 } = question;

  const [state, setState] = useState('IDLE'); // 'IDLE' | 'PREPARING' | 'RECORDING' | 'UPLOADING' | 'COMPLETED'
  const [prepCountdown, setPrepCountdown] = useState(preparationTime);
  const [recElapsed, setRecElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState(savedAudioUrl || null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [candidateNotes, setCandidateNotes] = useState(''); // Scratchpad for Part 2 notes

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const prepTimerRef = useRef(null);
  const recTimerRef = useRef(null);

  useEffect(() => {
    if (savedAudioUrl) {
      setAudioUrl(savedAudioUrl);
      setState('COMPLETED');
    }
  }, [savedAudioUrl]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startPreparation = () => {
    setErrorMsg(null);
    if (preparationTime > 0) {
      setState('PREPARING');
      setPrepCountdown(preparationTime);
      prepTimerRef.current = setInterval(() => {
        setPrepCountdown(prev => {
          if (prev <= 1) {
            clearInterval(prepTimerRef.current);
            startRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    setErrorMsg(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : (MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm');

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        // Stop all audio tracks to release microphone
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const localPreview = URL.createObjectURL(audioBlob);
        setAudioUrl(localPreview);

        // Upload to server
        await uploadRecording(audioBlob);
      };

      recorder.start(500); // 500ms chunks
      setState('RECORDING');
      setRecElapsed(0);

      // Response countdown timer
      recTimerRef.current = setInterval(() => {
        setRecElapsed(prev => {
          const nextVal = prev + 1;
          if (nextVal >= responseTime) {
            stopRecording();
            return responseTime;
          }
          return nextVal;
        });
      }, 1000);

    } catch (err) {
      console.error('Microphone error:', err);
      setState('IDLE');
      setErrorMsg('Microphone access denied or unavailable. Please enable microphone permissions in your browser.');
    }
  };

  const stopRecording = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setState('UPLOADING');
  };

  const uploadRecording = async (blob) => {
    if (!attemptId) return;

    try {
      const formData = new FormData();
      formData.append('audio', blob, `speaking_${questionId}.webm`);
      formData.append('questionId', questionId);
      formData.append('duration', recElapsed || responseTime);

      const token = localStorage.getItem('vfs_token');
      const response = await fetch(`/api/attempts/${attemptId}/upload-speaking`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData
      });

      const data = await response.json();
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
        setState('COMPLETED');
        if (onAudioUploaded) {
          onAudioUploaded(questionId, data.audioUrl, recElapsed || responseTime);
        }
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Recording upload error:', err);
      setErrorMsg('Failed to save audio recording to server. Please try recording again.');
      setState('IDLE');
    }
  };

  const resetRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    setAudioUrl(null);
    setRecElapsed(0);
    setState('IDLE');
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const remainingResponseTime = Math.max(0, responseTime - recElapsed);
  const isPart2CueCard = questionText.includes('Part 2') || questionText.includes('PART 2') || questionText.includes('Cue Card') || questionText.includes('Describe a meeting');

  return (
    <div className="question-item-card" style={{ borderLeftColor: '#059669', marginBottom: '2rem', background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <div className="question-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
        <span className="question-num-tag" style={{ color: '#059669', fontWeight: 800, fontSize: '0.85rem' }}>
          🎙️ Speaking {isPart2CueCard ? 'Part 2: Candidate Task Card' : (questionText.includes('Part 3') || questionText.includes('PART 3') ? 'Part 3: Discussion' : 'Part 1: General Topics')}
        </span>
        <span className="question-marks-badge" style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
          Max Band 9.0
        </span>
      </div>

      {/* Task Prompt */}
      <div className="question-prompt" style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1E293B', whiteSpace: 'pre-line', background: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #059669', marginBottom: '1.25rem' }}>
        {questionText}
      </div>

      {/* Part 2 Preparation Scratchpad */}
      {isPart2CueCard && (
        <div style={{ marginBottom: '1.5rem', background: '#FEF3C7', border: '1px solid #FDE68A', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#92400E', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>📝</span> <span>Candidate Scratchpad (Make notes during your 1-minute preparation)</span>
          </div>
          <textarea
            placeholder="Type your outline points and vocabulary keywords here..."
            value={candidateNotes}
            onChange={(e) => setCandidateNotes(e.target.value)}
            style={{ width: '100%', minHeight: '80px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#FEF2F2', border: '1px solid #F87171', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.88rem', margin: '1rem 0' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div className={`speaking-recorder-card ${state === 'RECORDING' ? 'recording' : ''}`} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.5rem', textAlign: 'center' }}>
        {state === 'IDLE' && (
          <div>
            <p style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem', fontSize: '1rem' }}>
              Ready to record your spoken response?
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Preparation time: <strong>{preparationTime}s</strong> | Response talk time: <strong>{Math.floor(responseTime / 60)} min {responseTime % 60 ? `${responseTime % 60}s` : ''}</strong>
            </p>
            <button
              type="button"
              className="btn-vfs btn-vfs-green"
              style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', fontWeight: 700 }}
              onClick={startPreparation}
              disabled={disabled}
            >
              🎙️ {preparationTime > 0 ? 'Start Preparation Timer' : 'Start Voice Recording'}
            </button>
          </div>
        )}

        {state === 'PREPARING' && (
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D97706', marginBottom: '0.5rem' }}>
              ⏳ Preparation Time Remaining: {prepCountdown}s
            </div>
            <div className="speaking-timer-display" style={{ color: '#D97706', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'monospace', margin: '0.5rem 0' }}>
              00:{prepCountdown < 10 ? '0' : ''}{prepCountdown}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Review the prompt questions and jot down your key ideas. Voice recording will initiate automatically when time expires.
            </p>
            <button
              type="button"
              className="btn-vfs btn-vfs-danger"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.92rem' }}
              onClick={startRecording}
            >
              🎙️ Skip Prep & Record Now
            </button>
          </div>
        )}

        {state === 'RECORDING' && (
          <div>
            <div className="rec-pulse-indicator" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626', fontWeight: 800, marginBottom: '0.5rem' }}>
              <span className="rec-dot" style={{ width: '12px', height: '12px', background: '#DC2626', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1s infinite' }}></span>
              <span>LIVE RECORDING IN PROGRESS</span>
            </div>
            <div className="speaking-timer-display" style={{ color: '#DC2626', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'monospace', margin: '0.5rem 0' }}>
              {formatTimer(recElapsed)} / {formatTimer(responseTime)}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Speak clearly into your microphone. You have {remainingResponseTime} seconds remaining.
            </p>
            <div className="recorder-btn-group">
              <button
                type="button"
                className="btn-vfs btn-vfs-danger"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.98rem', fontWeight: 700 }}
                onClick={stopRecording}
              >
                ⏹️ Finish & Save Spoken Response
              </button>
            </div>
          </div>
        )}

        {state === 'UPLOADING' && (
          <div style={{ padding: '1.5rem 0' }}>
            <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '4px solid #E2E8F0', borderTopColor: '#059669', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '0.75rem' }}></div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1C2B4B', marginBottom: '0.35rem' }}>
              🔄 Saving your voice recording to server...
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
              Please wait a moment while your audio is encoded and stored securely.
            </p>
          </div>
        )}

        {state === 'COMPLETED' && (
          <div>
            <div style={{ color: '#059669', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>✓</span>
              <span>Spoken Response Recorded & Uploaded Successfully</span>
            </div>

            {audioUrl && (
              <div style={{ margin: '1.25rem auto', maxWidth: '440px' }}>
                <audio controls src={audioUrl} style={{ width: '100%', borderRadius: '8px' }} />
              </div>
            )}

            {!disabled && (
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-vfs btn-vfs-secondary"
                  onClick={resetRecording}
                  style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
                >
                  🔄 Re-record Response
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
