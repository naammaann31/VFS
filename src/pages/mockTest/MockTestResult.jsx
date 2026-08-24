import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './mockTest.css';

export default function MockTestResult() {
  const { attemptId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResult();
  }, [attemptId]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('vfs_token');
      const res = await fetch(`/api/results/${attemptId}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch submission details');
      }

      setResult(data.result);
    } catch (err) {
      console.error('Fetch result error:', err);
      setError(err.message || 'Unable to retrieve submission details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mock-app-container" style={{ paddingTop: '100px' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <div style={{ display: 'inline-block', width: '48px', height: '48px', border: '5px solid #E2E8F0', borderTopColor: '#D97706', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem', fontWeight: 700, color: '#1C2B4B' }}>Processing your test submission...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="mock-app-container" style={{ paddingTop: '100px' }}>
        <Navbar />
        <div style={{ maxWidth: '500px', margin: '4rem auto', background: '#FFFFFF', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ color: '#1C2B4B', marginBottom: '0.5rem' }}>Submission Record Not Found</h3>
          <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>{error || 'Unable to retrieve submission details.'}</p>
          <Link to="/mock-tests" className="btn-vfs btn-vfs-primary">
            Return to Mock Test
          </Link>
        </div>
      </div>
    );
  }

  const { student, testTitle } = result;
  const candidateEmail = student?.email || 'your registered email';
  const candidateName = student?.name || 'Candidate';
  const targetCountry = student?.targetCountry || 'Abroad';

  return (
    <div className="mock-app-container" style={{ paddingTop: '100px' }}>
      <Navbar />

      <main className="mock-content-body" style={{ maxWidth: '920px' }}>
        {/* Success Header Banner */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '2rem' }}>
          <div style={{ width: '76px', height: '76px', background: '#ECFDF5', color: '#059669', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '1.25rem', border: '2px solid #A7F3D0' }}>
            ✓
          </div>

          <span style={{ display: 'block', color: '#D97706', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.35rem' }}>
            IELTS Mock Exam Successfully Submitted
          </span>

          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.3rem', color: '#1C2B4B', marginBottom: '0.75rem', lineHeight: '1.2' }}>
            Thank You, {candidateName}!
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '680px', margin: '0 auto 1.75rem auto', lineHeight: '1.6' }}>
            Your answers for <strong>Listening</strong>, <strong>Reading</strong>, <strong>Writing Task 2 Essay</strong>, and your recorded <strong>Speaking audio responses</strong> have been securely transmitted to the evaluation desk at <strong>Vectra Foreign Services</strong>.
          </p>

          {/* Email Notification Alert */}
          <div style={{ background: '#FEF3C7', border: '1.5px solid #F59E0B', borderRadius: '10px', padding: '1.25rem 1.5rem', maxWidth: '650px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400E', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.35rem' }}>
              <span>📩</span> <span>Score Report Delivery within 48 Hours</span>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#78350F', lineHeight: '1.5', margin: 0 }}>
              To maintain official exam integrity and provide thorough human evaluation, your answers are not displayed on screen. Our certified IELTS master trainers will assess your complete performance and email your official <strong>IELTS Band Score Report & Detailed Feedback</strong> to <strong style={{ color: '#1C2B4B', textDecoration: 'underline' }}>{candidateEmail}</strong> within <strong>48 hours</strong>.
            </p>
          </div>
        </div>

        {/* What Happens Next Timeline */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.35rem', color: '#1C2B4B', marginBottom: '1.25rem' }}>
            📋 What Happens Next?
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>🎧 📖</div>
              <strong style={{ fontSize: '0.92rem', color: '#1C2B4B', display: 'block', marginBottom: '0.25rem' }}>
                1. Objective Verification
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                Listening and Reading answers are analyzed and graded against the IELTS marking schema.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>✍️</div>
              <strong style={{ fontSize: '0.92rem', color: '#1C2B4B', display: 'block', marginBottom: '0.25rem' }}>
                2. Essay Assessment
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                Graded for Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammar.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>🎙️</div>
              <strong style={{ fontSize: '0.92rem', color: '#1C2B4B', display: 'block', marginBottom: '0.25rem' }}>
                3. Voice Evaluation
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                Certified trainers listen to your audio for Fluency, Pronunciation, and Vocabulary.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>📊</div>
              <strong style={{ fontSize: '0.92rem', color: '#1C2B4B', display: 'block', marginBottom: '0.25rem' }}>
                4. Band Score Dispatch
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                Full Band Score Breakdown & 1-on-1 feedback sent to your email within 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Study Abroad, Coaching & Foreign Services Showcase */}
        <div style={{ background: 'linear-gradient(135deg, #1C2B4B 0%, #121D33 100%)', color: '#FFFFFF', borderRadius: '16px', padding: '2.5rem 2rem', marginBottom: '2.5rem', border: '2px solid #D97706' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ background: '#D97706', color: '#1C2B4B', fontWeight: 800, fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Vectra Foreign Services • Ahmedabad
            </span>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.9rem', color: '#FFFFFF', margin: '0.75rem 0 0.5rem 0' }}>
              Planning to Study Abroad in {targetCountry}?
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
              Vectra Foreign Services is your premier study abroad consultancy and language training institute. We guide you at every step of your overseas education journey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎓</div>
              <h4 style={{ color: '#FCD34D', fontSize: '1.05rem', marginBottom: '0.35rem' }}>University Admissions</h4>
              <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                Profile evaluation, university shortlisting, SOP/LOR drafting, and scholarship applications for Canada, UK, USA, Australia, and Europe.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛂</div>
              <h4 style={{ color: '#FCD34D', fontSize: '1.05rem', marginBottom: '0.35rem' }}>Student Visa & Filing</h4>
              <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                End-to-end visa filing, financial documentation assistance, embassy appointment scheduling, and mock visa interview preparation.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📚</div>
              <h4 style={{ color: '#FCD34D', fontSize: '1.05rem', marginBottom: '0.35rem' }}>IELTS & PTE Coaching</h4>
              <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                Target Band 7.5+ with certified trainers, personalized feedback, extensive mock test series, and flexible batch timings in Ahmedabad.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              className="btn-vfs btn-vfs-gold"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800 }}
            >
              📅 Book Free 1-on-1 Consultation →
            </Link>
            <Link
              to="/services"
              className="btn-vfs btn-vfs-secondary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
            >
              🌐 Explore All Foreign Services
            </Link>
          </div>
        </div>

        {/* Office Contact Info Footer */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.75rem', textAlign: 'center', marginBottom: '3rem' }}>
          <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', color: '#1C2B4B', marginBottom: '0.5rem' }}>
            Visit Vectra Foreign Services (Ahmedabad Office)
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1rem' }}>
            Have questions about your IELTS mock test or abroad applications? Get in touch with our counselors today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>
            <div>📍 Ahmedabad, Gujarat, India</div>
            <div>📧 info@vectraforeignservices.com</div>
            <div>🌐 vectraforeignservices.com</div>
          </div>
        </div>
      </main>
    </div>
  );
}
