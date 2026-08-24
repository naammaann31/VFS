import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './mockTest.css';

export default function MockTestList() {
  const navigate = useNavigate();
  const [featuredTest, setFeaturedTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verification Step: 'DETAILS' | 'OTP'
  const [step, setStep] = useState('DETAILS');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetCountry: 'Canada'
  });

  const [otpInput, setOtpInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');

  // Resend OTP Cooldown
  const [resendCooldown, setResendCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchFeaturedTest();
    // Pre-fill student if in localStorage
    const savedStudent = localStorage.getItem('vfs_student');
    if (savedStudent) {
      try {
        const parsed = JSON.parse(savedStudent);
        setFormData(prev => ({
          ...prev,
          name: parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          targetCountry: parsed.targetCountry || 'Canada'
        }));
      } catch (e) {}
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const fetchFeaturedTest = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/mock-tests');
      const data = await res.json();
      if (data.success && data.tests && data.tests.length > 0) {
        setFeaturedTest(data.tests[0]);
      } else {
        throw new Error('No published mock test available.');
      }
    } catch (err) {
      console.error('Fetch test error:', err);
      setError('Unable to load mock test configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = (seconds = 30) => {
    setResendCooldown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: Send OTP to Candidate's Email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Please enter your full name and email address.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.name,
          phone: formData.phone,
          targetCountry: formData.targetCountry
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      setStep('OTP');
      setOtpInput('');
      setOtpError('');
      setOtpSuccessMsg('');
      startResendTimer(30);
    } catch (err) {
      console.error('Send OTP error:', err);
      setFormError(err.message || 'Failed to send verification email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Verify OTP and Launch Exam Attempt
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setOtpError('');
    setOtpSuccessMsg('');

    if (!otpInput || otpInput.trim().length !== 6 || !/^\d{6}$/.test(otpInput.trim())) {
      setOtpError('Please enter a valid 6-digit verification code.');
      return;
    }

    if (!featuredTest) {
      setOtpError('Mock test is not ready. Please refresh.');
      return;
    }

    try {
      setSubmitting(true);

      // 1. Verify OTP with Backend
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: otpInput.trim(),
          name: formData.name,
          phone: formData.phone,
          targetCountry: formData.targetCountry
        })
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(verifyData.message || 'Incorrect verification code.');
      }

      setOtpSuccessMsg('✓ Email Verified Successfully! Launching your test...');
      localStorage.setItem('vfs_token', verifyData.token);
      localStorage.setItem('vfs_student', JSON.stringify(verifyData.user));

      // 2. Start or Resume Attempt
      const startRes = await fetch(`/api/mock-tests/${featuredTest.id}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${verifyData.token}`
        }
      });
      const startData = await startRes.json();

      if (!startData.success) {
        throw new Error(startData.message || 'Failed to start exam attempt');
      }

      setTimeout(() => {
        navigate(`/mock-tests/attempt/${startData.attemptId}`);
      }, 800);

    } catch (err) {
      console.error('Verify OTP error:', err);
      setOtpError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mock-app-container">
      <Navbar />

      {/* Hero Banner */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1C2B4B 0%, #121D33 100%)', 
        color: '#FFFFFF', 
        padding: 'clamp(120px, 12vw, 150px) 1.5rem 3.5rem 1.5rem', 
        textAlign: 'center', 
        borderBottom: '4px solid #D97706' 
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ background: '#D97706', color: '#1C2B4B', fontWeight: 800, fontSize: '0.8rem', padding: '0.35rem 0.9rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '1rem' }}>
            🎓 Official Computer-Delivered Format
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
            Free Online IELTS Full Mock Test
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '750px', margin: '0 auto 1.5rem auto' }}>
            Take an authentic 4-section practice test covering <strong>Listening</strong> (audio), <strong>Reading</strong> (passage), <strong>Writing Task 2</strong> (live word counter), and <strong>Speaking</strong> (microphone voice recorder). Your complete score report will be evaluated by certified IELTS trainers and sent to your email within <strong>48 hours</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.88rem' }}>
            <div style={{ color: '#FCD34D' }}>⏱️ Duration: <strong>{featuredTest?.duration ? `${featuredTest.duration} Minutes` : '40 Minutes'}</strong></div>
            <div style={{ color: '#FCD34D' }}>🎧 Listening • 📖 Reading • ✍️ Writing • 🎙️ Speaking</div>
            <div style={{ color: '#FCD34D' }}>📩 Official Report: <strong>Delivered via Email</strong></div>
          </div>
        </div>
      </section>

      {/* Main Registration & Launch Container */}
      <main className="mock-content-body" style={{ maxWidth: '960px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTopColor: '#D97706', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginTop: '1rem', color: '#64748B', fontWeight: 600 }}>Loading mock test configuration...</p>
          </div>
        )}

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', margin: '2rem 0' }}>
            <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ Connection Notice</p>
            <p>{error}</p>
            <button type="button" className="btn-vfs btn-vfs-primary" style={{ marginTop: '1rem' }} onClick={fetchFeaturedTest}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
            {/* Left Column: Form & OTP Cards */}
            <div style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              
              {/* STEP 1: CANDIDATE DETAILS FORM */}
              {step === 'DETAILS' && (
                <div>
                  <div style={{ marginBottom: '1.5rem', borderBottom: '1.5px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Candidate Registration
                    </span>
                    <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#1C2B4B', margin: '0.2rem 0' }}>
                      Begin Your Practice Exam
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
                      Enter your details to receive your email verification code.
                    </p>
                  </div>

                  {formError && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                      ⚠️ {formError}
                    </div>
                  )}

                  <form onSubmit={handleSendOtp}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="fill-blank-input"
                        style={{ maxWidth: '100%' }}
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={submitting}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                        Email Address * (For OTP & Band Score Report Delivery)
                      </label>
                      <input
                        type="email"
                        required
                        className="fill-blank-input"
                        style={{ maxWidth: '100%' }}
                        placeholder="e.g. candidate@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={submitting}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          className="fill-blank-input"
                          style={{ maxWidth: '100%' }}
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={submitting}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                          Target Country
                        </label>
                        <select
                          className="fill-blank-input"
                          style={{ maxWidth: '100%' }}
                          value={formData.targetCountry}
                          onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                          disabled={submitting}
                        >
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Australia">Australia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Europe">Europe / Germany</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ background: '#F8FAFC', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                      🔒 <strong>Email Verification:</strong> We will dispatch a 6-digit verification code to your email address before launching the test.
                    </div>

                    <button
                      type="submit"
                      className="btn-vfs btn-vfs-gold"
                      style={{ width: '100%', padding: '0.85rem', fontSize: '1.05rem', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)' }}
                      disabled={submitting}
                    >
                      {submitting ? '⏳ Sending Verification Code...' : '✉️ Send Verification Code & Start →'}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: EMAIL OTP VERIFICATION SCREEN */}
              {step === 'OTP' && (
                <div>
                  {/* Email Notice Header */}
                  <div style={{ backgroundColor: '#111827', color: '#FFFFFF', padding: '1.25rem 1.5rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid #D97706' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✉️</span> <span>Email Verification Required</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#E5E7EB', lineHeight: '1.5' }}>
                      We have sent a 6-digit verification code to <strong style={{ color: '#FBBF24', wordBreak: 'break-all' }}>{formData.email}</strong>. Please enter the code below to verify your email and start your test.<br />
                      <span style={{ color: '#FCD34D', fontSize: '0.82rem', display: 'inline-block', marginTop: '0.35rem' }}>
                        💡 <strong>Note:</strong> If you do not see the email in your inbox, please check your spam or junk folder.
                      </span>
                    </div>
                  </div>

                  {otpError && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.88rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                      ⚠️ {otpError}
                    </div>
                  )}

                  {otpSuccessMsg && (
                    <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.92rem', marginBottom: '1.25rem', textAlign: 'center', fontWeight: 700 }}>
                      {otpSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={(e) => e.preventDefault()} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem', display: 'block' }}>
                        Enter 6-Digit Verification Code:
                      </label>
                      <input
                        type="text"
                        maxLength="6"
                        autoFocus
                        className="fill-blank-input"
                        style={{ textAlign: 'center', fontSize: '1.8rem', letterSpacing: '8px', fontWeight: 700, padding: '0.6rem', maxWidth: '240px', margin: '0 auto', display: 'block', fontFamily: 'monospace' }}
                        placeholder="000000"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                        disabled={submitting}
                      />
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                      <button
                        type="button"
                        className="btn-vfs btn-vfs-secondary"
                        style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                        onClick={() => {
                          setStep('DETAILS');
                          setOtpError('');
                        }}
                        disabled={submitting}
                      >
                        ✏️ Change Email ID
                      </button>

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                          type="button"
                          className="btn-vfs btn-vfs-secondary"
                          style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                          onClick={handleSendOtp}
                          disabled={submitting || resendCooldown > 0}
                        >
                          🔄 Resend {resendCooldown > 0 ? `(${resendCooldown}s)` : ''}
                        </button>

                        <button
                          type="button"
                          className="btn-vfs btn-vfs-gold"
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem' }}
                          onClick={handleVerifyOtp}
                          disabled={submitting || otpInput.length !== 6}
                        >
                          {submitting ? 'Verifying...' : 'Verify & Start IELTS Test →'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

            </div>

            {/* Right Column: Exam Breakdown & Vectra Foreign Services Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Test Modules Card */}
              <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: '#1C2B4B', marginBottom: '1rem' }}>
                  4 Test Modules Included
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem' }}>🎧</span>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1C2B4B' }}>Listening (3 Questions)</strong>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>High-quality audio recording with prep timer</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem' }}>📖</span>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1C2B4B' }}>Reading (3 Questions)</strong>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Academic split-view passage with MCQ & True/False</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem' }}>✍️</span>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1C2B4B' }}>Writing Task 2 Essay</strong>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Live 150-word counter & trainer essay feedback</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem' }}>🎙️</span>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1C2B4B' }}>Speaking Voice Recorder</strong>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Task 1 (60s) & Task 2 (90s) browser mic recording</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Abroad & IELTS Services Banner */}
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', color: '#1C2B4B', marginBottom: '0.4rem' }}>
                  Vectra Foreign Services
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1rem' }}>
                  Leading Study Abroad, Visa Consultation & IELTS / PTE Coaching institute in Ahmedabad.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link to="/services" className="btn-vfs btn-vfs-secondary" style={{ padding: '0.5rem', fontSize: '0.82rem' }}>
                    🌐 Explore Foreign Services & Visas
                  </Link>
                  <Link to="/contact" className="btn-vfs btn-vfs-primary" style={{ padding: '0.5rem', fontSize: '0.82rem' }}>
                    📞 Book 1-on-1 Free Consultation
                  </Link>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Link to="/admin/login" style={{ fontSize: '0.82rem', color: '#94A3B8', textDecoration: 'none' }}>
                  🔒 Evaluator / Admin Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
