import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './mockTest.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('evaluations'); // 'evaluations' | 'tests' | 'attempts' | 'importer'
  const [evalSubTab, setEvalSubTab] = useState('writing'); // 'writing' | 'speaking'

  // Data states
  const [writingSubmissions, setWritingSubmissions] = useState([]);
  const [speakingSubmissions, setSpeakingSubmissions] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Evaluation Modal State
  const [activeWritingModal, setActiveWritingModal] = useState(null);
  const [activeSpeakingModal, setActiveSpeakingModal] = useState(null);
  const [evalScore, setEvalScore] = useState('');
  const [evalFeedback, setEvalFeedback] = useState('');
  const [savingEval, setSavingEval] = useState(false);

  // Importer State
  const [importText, setImportText] = useState('');
  const [importTitle, setImportTitle] = useState('IELTS Academic Practice Test 02');
  const [importDuration, setImportDuration] = useState('40');
  const [importing, setImporting] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState('');
  const [importErrorMsg, setImportErrorMsg] = useState('');

  // Create Test Modal State
  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestCategory, setNewTestCategory] = useState('IELTS Academic');
  const [newTestDuration, setNewTestDuration] = useState('40');

  useEffect(() => {
    checkAdminAuth();
    loadDashboardData();
  }, [activeTab]);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('vfs_token');
    const adminStr = localStorage.getItem('vfs_admin');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const getHeaders = () => {
    const token = localStorage.getItem('vfs_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // 1. Fetch stats
      const statsRes = await fetch('/api/admin/stats', { headers: getHeaders() });
      if (statsRes.status === 401 || statsRes.status === 403) {
        navigate('/admin/login');
        return;
      }
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // 2. Fetch data based on active tab
      if (activeTab === 'evaluations') {
        const evalRes = await fetch('/api/admin/evaluations', { headers: getHeaders() });
        const evalData = await evalRes.json();
        if (evalData.success) {
          setWritingSubmissions(evalData.writing || []);
          setSpeakingSubmissions(evalData.speaking || []);
        }
      } else if (activeTab === 'tests') {
        const testsRes = await fetch('/api/mock-tests', { headers: getHeaders() });
        const testsData = await testsRes.json();
        if (testsData.success) setMockTests(testsData.tests || []);
      } else if (activeTab === 'attempts') {
        const attemptsRes = await fetch('/api/admin/attempts', { headers: getHeaders() });
        const attemptsData = await attemptsRes.json();
        if (attemptsData.success) setAttempts(attemptsData.attempts || []);
      }
    } catch (err) {
      console.error('Load dashboard data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWritingEval = (sub) => {
    setActiveWritingModal(sub);
    setEvalScore(sub.score !== null && sub.score !== undefined ? String(sub.score) : '7.0');
    setEvalFeedback(sub.feedback || 'Good vocabulary and task response. Focus on improving grammatical accuracy in complex sentences.');
  };

  const handleSaveWritingEval = async (e) => {
    e.preventDefault();
    if (!activeWritingModal) return;

    try {
      setSavingEval(true);
      const res = await fetch(`/api/admin/writing/${activeWritingModal.id}/evaluate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          score: parseFloat(evalScore),
          feedback: evalFeedback
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to save evaluation');
      }

      setActiveWritingModal(null);
      loadDashboardData();
    } catch (err) {
      console.error('Save writing error:', err);
      alert('Error saving evaluation: ' + err.message);
    } finally {
      setSavingEval(false);
    }
  };

  const handleOpenSpeakingEval = (sub) => {
    setActiveSpeakingModal(sub);
    setEvalScore(sub.score !== null && sub.score !== undefined ? String(sub.score) : '7.0');
    setEvalFeedback(sub.feedback || 'Clear pronunciation and smooth fluency. Work on varied sentence structures.');
  };

  const handleSaveSpeakingEval = async (e) => {
    e.preventDefault();
    if (!activeSpeakingModal) return;

    try {
      setSavingEval(true);
      const res = await fetch(`/api/admin/speaking/${activeSpeakingModal.id}/evaluate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          score: parseFloat(evalScore),
          feedback: evalFeedback
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to save evaluation');
      }

      setActiveSpeakingModal(null);
      loadDashboardData();
    } catch (err) {
      console.error('Save speaking error:', err);
      alert('Error saving evaluation: ' + err.message);
    } finally {
      setSavingEval(false);
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/mock-tests', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title: newTestTitle,
          category: newTestCategory,
          duration: parseInt(newTestDuration) || 40,
          status: 'PUBLISHED'
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsCreateTestOpen(false);
        setNewTestTitle('');
        loadDashboardData();
      } else {
        alert(data.message || 'Failed to create test');
      }
    } catch (err) {
      alert('Error creating test: ' + err.message);
    }
  };

  const handleImportSheet = async (e) => {
    e.preventDefault();
    setImportErrorMsg('');
    setImportSuccessMsg('');

    if (!importText.trim()) {
      setImportErrorMsg('Please paste CSV or tabular data.');
      return;
    }

    try {
      setImporting(true);

      // Parse CSV or TSV text
      const lines = importText.trim().split(/\r?\n/);
      if (lines.length < 2) {
        throw new Error('Data must contain a header row and at least one question row.');
      }

      // Detect separator (comma or tab)
      const firstLine = lines[0];
      const sep = firstLine.includes('\t') ? '\t' : ',';

      // Parse headers
      const headers = lines[0].split(sep).map(h => h.trim().replace(/^["']|["']$/g, ''));

      // Parse rows
      const rows = [];
      for (let i = 1; i < lines.length; i++) {
        const rawLine = lines[i].trim();
        if (!rawLine) continue;

        // Basic CSV split
        const values = rawLine.split(sep).map(v => v.trim().replace(/^["']|["']$/g, ''));
        const rowObj = {};
        headers.forEach((h, idx) => {
          rowObj[h] = values[idx] || '';
        });
        rows.push(rowObj);
      }

      const res = await fetch('/api/admin/import-sheet', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          mockTitle: importTitle,
          duration: parseInt(importDuration) || 40,
          rows
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Import failed');
      }

      setImportSuccessMsg(`🎉 ${data.message}! Mock test is now active in the database.`);
      setImportText('');
    } catch (err) {
      console.error('Import error:', err);
      setImportErrorMsg(err.message || 'Failed to parse and import data');
    } finally {
      setImporting(false);
    }
  };

  const loadSampleCSV = () => {
    const sample = `Section,Question Type,Question,Option A,Option B,Option C,Option D,Correct Answer,Marks
LISTENING,MCQ,What time does the university library close on weekdays?,8:00 PM,9:00 PM,10:00 PM,Midnight,B,1.0
LISTENING,FILL_BLANK,The guest speaker will discuss renewable [blank] technologies.,,,,,energy,1.0
READING,MCQ,What is the primary thesis of the author in paragraph 2?,Global trade growth,Urbanization trends,Renewable energy adoption,Climate mitigation,A,1.0
READING,TRUE_FALSE,International students contribute significantly to regional research innovation.,TRUE,FALSE,NOT GIVEN,,TRUE,1.0
WRITING,WRITING,"Some people think universities should focus on practical career skills, while others believe theoretical research is more important. Discuss both views.",,,,,,,9.0
SPEAKING,SPEAKING,"Speaking Task 1: Describe a book that had a strong influence on your perspective.",,,,,,,9.0`;
    setImportText(sample);
    setImportTitle('IELTS Academic Sample Import 02');
  };

  const handleLogout = () => {
    localStorage.removeItem('vfs_token');
    localStorage.removeItem('vfs_admin');
    navigate('/admin/login');
  };

  return (
    <div className="mock-app-container" style={{ paddingTop: '100px' }}>
      <Navbar />

      <main className="mock-content-body" style={{ maxWidth: '1320px' }}>
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', background: '#FFFFFF', padding: '1.5rem 2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Vectra Foreign Services
            </div>
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.8rem', color: '#1C2B4B', margin: '0.2rem 0' }}>
              IELTS Mock Test Evaluation Dashboard
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
              Review student submissions, assign band scores, manage question banks, and import Google Sheets data.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/mock-tests" className="btn-vfs btn-vfs-secondary" style={{ fontSize: '0.85rem' }}>
              🌐 View Student Portal
            </Link>
            <button
              type="button"
              className="btn-vfs btn-vfs-danger"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              onClick={handleLogout}
            >
              Sign Out ⎋
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Mock Tests</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1C2B4B', margin: '0.25rem 0' }}>{stats.totalTests}</div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Active Tests</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Attempts</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1C2B4B', margin: '0.25rem 0' }}>{stats.totalAttempts}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Students Enrolled: {stats.totalStudents}</div>
            </div>

            <div style={{ background: '#FEF3C7', padding: '1.25rem', borderRadius: '10px', border: '1px solid #FCD34D', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400E', textTransform: 'uppercase' }}>Pending Writing</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#B45309', margin: '0.25rem 0' }}>{stats.pendingWriting}</div>
              <div style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 600 }}>Needs Evaluation</div>
            </div>

            <div style={{ background: '#FEF3C7', padding: '1.25rem', borderRadius: '10px', border: '1px solid #FCD34D', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400E', textTransform: 'uppercase' }}>Pending Speaking</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#B45309', margin: '0.25rem 0' }}>{stats.pendingSpeaking}</div>
              <div style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 600 }}>Audio Ready to Listen</div>
            </div>

            <div style={{ background: '#ECFDF5', padding: '1.25rem', borderRadius: '10px', border: '1px solid #A7F3D0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase' }}>Completed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#059669', margin: '0.25rem 0' }}>{stats.completedAttempts}</div>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>Fully Graded</div>
            </div>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #E2E8F0', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-vfs"
            style={{
              background: activeTab === 'evaluations' ? '#1C2B4B' : 'transparent',
              color: activeTab === 'evaluations' ? '#FFFFFF' : '#475569',
              borderRadius: '8px 8px 0 0',
              borderBottom: 'none'
            }}
            onClick={() => setActiveTab('evaluations')}
          >
            ✍️ Pending Evaluations ({stats ? stats.pendingTotal : 0})
          </button>

          <button
            type="button"
            className="btn-vfs"
            style={{
              background: activeTab === 'attempts' ? '#1C2B4B' : 'transparent',
              color: activeTab === 'attempts' ? '#FFFFFF' : '#475569',
              borderRadius: '8px 8px 0 0',
              borderBottom: 'none'
            }}
            onClick={() => setActiveTab('attempts')}
          >
            📋 All Attempts & Results
          </button>

          <button
            type="button"
            className="btn-vfs"
            style={{
              background: activeTab === 'tests' ? '#1C2B4B' : 'transparent',
              color: activeTab === 'tests' ? '#FFFFFF' : '#475569',
              borderRadius: '8px 8px 0 0',
              borderBottom: 'none'
            }}
            onClick={() => setActiveTab('tests')}
          >
            📚 Mock Tests & Question Bank
          </button>

          <button
            type="button"
            className="btn-vfs"
            style={{
              background: activeTab === 'importer' ? '#1C2B4B' : 'transparent',
              color: activeTab === 'importer' ? '#FFFFFF' : '#475569',
              borderRadius: '8px 8px 0 0',
              borderBottom: 'none'
            }}
            onClick={() => setActiveTab('importer')}
          >
            📊 Google Sheets / CSV Importer
          </button>
        </div>

        {/* TAB 1: PENDING EVALUATIONS */}
        {activeTab === 'evaluations' && (
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                className={`btn-vfs ${evalSubTab === 'writing' ? 'btn-vfs-primary' : 'btn-vfs-secondary'}`}
                style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                onClick={() => setEvalSubTab('writing')}
              >
                Writing Submissions ({writingSubmissions.length})
              </button>
              <button
                type="button"
                className={`btn-vfs ${evalSubTab === 'speaking' ? 'btn-vfs-primary' : 'btn-vfs-secondary'}`}
                style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                onClick={() => setEvalSubTab('speaking')}
              >
                Speaking Recordings ({speakingSubmissions.length})
              </button>
            </div>

            {/* Writing Submissions Table */}
            {evalSubTab === 'writing' && (
              <div>
                {writingSubmissions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                    🎉 No pending writing evaluations in queue! All essays are graded.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Mock Test</th>
                          <th>Question</th>
                          <th>Word Count</th>
                          <th>Submitted</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {writingSubmissions.map((w) => (
                          <tr key={w.id}>
                            <td>
                              <strong>{w.attempt?.user?.name}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{w.attempt?.user?.email}</div>
                            </td>
                            <td>{w.attempt?.mockTest?.title}</td>
                            <td style={{ maxWidth: '280px' }}>
                              {w.question?.questionText ? w.question.questionText.slice(0, 75) + '...' : 'Writing Task 2'}
                            </td>
                            <td>
                              <strong>{w.wordCount}</strong> words
                            </td>
                            <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                            <td><span className="status-badge pending">Pending</span></td>
                            <td>
                              <button
                                type="button"
                                className="btn-vfs btn-vfs-gold"
                                style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
                                onClick={() => handleOpenWritingEval(w)}
                              >
                                ✍️ Grade Essay
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Speaking Submissions Table */}
            {evalSubTab === 'speaking' && (
              <div>
                {speakingSubmissions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                    🎉 No pending speaking evaluations in queue! All voice recordings are graded.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Mock Test</th>
                          <th>Task Prompt</th>
                          <th>Audio Playback</th>
                          <th>Submitted</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speakingSubmissions.map((s) => (
                          <tr key={s.id}>
                            <td>
                              <strong>{s.attempt?.user?.name}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{s.attempt?.user?.email}</div>
                            </td>
                            <td>{s.attempt?.mockTest?.title}</td>
                            <td style={{ maxWidth: '250px' }}>
                              {s.question?.questionText ? s.question.questionText.slice(0, 60) + '...' : 'Speaking Task'}
                            </td>
                            <td>
                              {s.audioUrl ? (
                                <audio controls src={s.audioUrl} style={{ height: '36px', maxWidth: '240px' }} />
                              ) : (
                                <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>No audio</span>
                              )}
                            </td>
                            <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                            <td><span className="status-badge pending">Pending</span></td>
                            <td>
                              <button
                                type="button"
                                className="btn-vfs btn-vfs-gold"
                                style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
                                onClick={() => handleOpenSpeakingEval(s)}
                              >
                                🎙️ Evaluate Audio
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ATTEMPTS & RESULTS */}
        {activeTab === 'attempts' && (
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: '#1C2B4B', marginBottom: '1rem' }}>
              All Student Attempts
            </h3>

            {attempts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                No student attempts recorded yet.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Target Country</th>
                      <th>Test Title</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total Score</th>
                      <th>Band Score</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.map((att) => (
                      <tr key={att.id}>
                        <td>
                          <strong>{att.user?.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{att.user?.email}</div>
                        </td>
                        <td>{att.user?.targetCountry || 'N/A'}</td>
                        <td>{att.mockTest?.title}</td>
                        <td>{new Date(att.startedAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${att.status.toLowerCase()}`}>
                            {att.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <strong>{att.totalScore}</strong> / {att.maxScore}
                        </td>
                        <td>
                          {att.bandScore ? (
                            <span style={{ fontWeight: 700, color: '#059669' }}>Band {att.bandScore}</span>
                          ) : (
                            <span style={{ color: '#94A3B8' }}>Pending</span>
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/mock-tests/result/${att.id}`}
                            className="btn-vfs btn-vfs-secondary"
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
                          >
                            View Report →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MOCK TESTS MANAGER */}
        {activeTab === 'tests' && (
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: '#1C2B4B' }}>
                Active Mock Tests ({mockTests.length})
              </h3>
              <button
                type="button"
                className="btn-vfs btn-vfs-primary"
                onClick={() => setIsCreateTestOpen(true)}
              >
                + Create New Mock Test
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {mockTests.map((t) => (
                <div key={t.id} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.5rem', background: '#F8FAFC' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {t.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>⏱️ {t.duration} Mins</span>
                  </div>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: '#1C2B4B', margin: '0.5rem 0' }}>
                    {t.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                    {t.description || 'Full-length IELTS test simulation.'}
                  </p>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '1rem' }}>
                    Sections: <strong>{t.sections?.length || 4}</strong> | Total Questions: <strong>{t.totalQuestions || 9}</strong> | Attempts: <strong>{t.attemptCount || 0}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/mock-tests`} className="btn-vfs btn-vfs-secondary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.82rem' }}>
                      Preview Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE SHEETS / CSV IMPORTER */}
        {activeTab === 'importer' && (
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ maxWidth: '850px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>
                Data Migration & Import Engine
              </span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#1C2B4B', margin: '0.35rem 0 0.75rem 0' }}>
                Import Questions from Google Sheets / CSV
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Migrate your question bank from Google Sheets. Paste CSV/Tab-delimited rows below containing columns: <br />
                <code>Section, Question Type, Question, Option A, Option B, Option C, Option D, Correct Answer, Marks</code>
              </p>

              {importSuccessMsg && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 600 }}>
                  {importSuccessMsg}
                </div>
              )}

              {importErrorMsg && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  ⚠️ {importErrorMsg}
                </div>
              )}

              <form onSubmit={handleImportSheet}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Mock Test Title *
                    </label>
                    <input
                      type="text"
                      required
                      className="fill-blank-input"
                      style={{ maxWidth: '100%' }}
                      value={importTitle}
                      onChange={(e) => setImportTitle(e.target.value)}
                      placeholder="e.g. IELTS Full Mock Test 02"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      className="fill-blank-input"
                      style={{ maxWidth: '100%' }}
                      value={importDuration}
                      onChange={(e) => setImportDuration(e.target.value)}
                      placeholder="40"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                      Paste CSV / TSV Rows *
                    </label>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#D97706', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                      onClick={loadSampleCSV}
                    >
                      📋 Load Sample Template
                    </button>
                  </div>
                  <textarea
                    rows={10}
                    className="writing-textarea"
                    style={{ minHeight: '180px', fontFamily: 'monospace', fontSize: '0.85rem' }}
                    placeholder="Section,Question Type,Question,Option A,Option B,Option C,Option D,Correct Answer,Marks..."
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-vfs btn-vfs-green"
                  style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
                  disabled={importing}
                >
                  {importing ? '⏳ Importing & Building Mock Test...' : '🚀 Import Mock Test to Database'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: GRADE WRITING */}
        {activeWritingModal && (
          <div className="vfs-modal-backdrop" onClick={() => !savingEval && setActiveWritingModal(null)}>
            <div className="vfs-modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: '#1C2B4B' }}>
                  Evaluate Writing Task 2 Essay
                </h3>
                <button type="button" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setActiveWritingModal(null)}>
                  ✕
                </button>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1rem', fontSize: '0.88rem' }}>
                <div style={{ color: '#64748B', fontWeight: 600 }}>Candidate:</div>
                <div style={{ fontWeight: 700, color: '#1C2B4B', marginBottom: '0.5rem' }}>
                  {activeWritingModal.attempt?.user?.name} ({activeWritingModal.attempt?.user?.email})
                </div>
                <div style={{ color: '#64748B', fontWeight: 600 }}>Essay Question:</div>
                <div style={{ color: '#1E293B' }}>{activeWritingModal.question?.questionText}</div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#334155' }}>Student Essay Response:</label>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669' }}>
                    {activeWritingModal.wordCount} words
                  </span>
                </div>
                <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', padding: '1rem', borderRadius: '6px', maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-line', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {activeWritingModal.answer || '(No essay text)'}
                </div>
              </div>

              <form onSubmit={handleSaveWritingEval}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.35rem' }}>
                    Assigned Band Score (0.0 – 9.0) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9.0"
                    required
                    className="fill-blank-input"
                    value={evalScore}
                    onChange={(e) => setEvalScore(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.35rem' }}>
                    Trainer Feedback & Advice *
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="writing-textarea"
                    style={{ minHeight: '100px' }}
                    value={evalFeedback}
                    onChange={(e) => setEvalFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on Task Achievement, Coherence, Vocabulary and Grammar..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="btn-vfs btn-vfs-secondary" onClick={() => setActiveWritingModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-vfs btn-vfs-gold" disabled={savingEval}>
                    {savingEval ? 'Saving Evaluation...' : '✓ Save Writing Score & Complete'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: GRADE SPEAKING */}
        {activeSpeakingModal && (
          <div className="vfs-modal-backdrop" onClick={() => !savingEval && setActiveSpeakingModal(null)}>
            <div className="vfs-modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: '#1C2B4B' }}>
                  Evaluate Speaking Task Recording
                </h3>
                <button type="button" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setActiveSpeakingModal(null)}>
                  ✕
                </button>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1rem', fontSize: '0.88rem' }}>
                <div style={{ color: '#64748B', fontWeight: 600 }}>Candidate:</div>
                <div style={{ fontWeight: 700, color: '#1C2B4B', marginBottom: '0.5rem' }}>
                  {activeSpeakingModal.attempt?.user?.name} ({activeSpeakingModal.attempt?.user?.email})
                </div>
                <div style={{ color: '#64748B', fontWeight: 600 }}>Speaking Prompt:</div>
                <div style={{ color: '#1E293B' }}>{activeSpeakingModal.question?.questionText}</div>
              </div>

              <div style={{ background: '#1C2B4B', color: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#FCD34D', fontWeight: 600, marginBottom: '0.5rem' }}>
                  🎙️ Candidate Audio Recording ({activeSpeakingModal.duration}s)
                </div>
                {activeSpeakingModal.audioUrl ? (
                  <audio controls src={activeSpeakingModal.audioUrl} style={{ width: '100%', maxWidth: '450px' }} />
                ) : (
                  <div style={{ color: '#CBD5E1' }}>No audio recording file found</div>
                )}
              </div>

              <form onSubmit={handleSaveSpeakingEval}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.35rem' }}>
                    Assigned Band Score (0.0 – 9.0) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9.0"
                    required
                    className="fill-blank-input"
                    value={evalScore}
                    onChange={(e) => setEvalScore(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#334155', marginBottom: '0.35rem' }}>
                    Trainer Feedback & Advice *
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="writing-textarea"
                    style={{ minHeight: '100px' }}
                    value={evalFeedback}
                    onChange={(e) => setEvalFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on Fluency, Pronunciation, Lexical Resource, and Grammar..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="btn-vfs btn-vfs-secondary" onClick={() => setActiveSpeakingModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-vfs btn-vfs-gold" disabled={savingEval}>
                    {savingEval ? 'Saving Evaluation...' : '✓ Save Speaking Score & Complete'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE TEST */}
        {isCreateTestOpen && (
          <div className="vfs-modal-backdrop" onClick={() => setIsCreateTestOpen(false)}>
            <div className="vfs-modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: '#1C2B4B' }}>
                  Create New Mock Test
                </h3>
                <button type="button" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsCreateTestOpen(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTest}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                    Test Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="fill-blank-input"
                    style={{ maxWidth: '100%' }}
                    placeholder="e.g. IELTS Full Mock Test 03"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                      Category
                    </label>
                    <select
                      className="fill-blank-input"
                      style={{ maxWidth: '100%' }}
                      value={newTestCategory}
                      onChange={(e) => setNewTestCategory(e.target.value)}
                    >
                      <option value="IELTS Academic">IELTS Academic</option>
                      <option value="IELTS General">IELTS General</option>
                      <option value="PTE Academic">PTE Academic</option>
                      <option value="TOEFL iBT">TOEFL iBT</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      className="fill-blank-input"
                      style={{ maxWidth: '100%' }}
                      value={newTestDuration}
                      onChange={(e) => setNewTestDuration(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="btn-vfs btn-vfs-secondary" onClick={() => setIsCreateTestOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-vfs btn-vfs-primary">
                    Create Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
