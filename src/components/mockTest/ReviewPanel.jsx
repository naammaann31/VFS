import React from 'react';

export default function ReviewPanel({
  test,
  answers = {},
  writingEssay = '',
  speakingRecordings = {},
  onNavigateSection,
  onSubmitTest,
  isSubmitting = false
}) {
  // Compute counts for listening & reading
  let listeningTotal = 0, listeningAnswered = 0;
  let readingTotal = 0, readingAnswered = 0;
  let speakingTotal = 0, speakingRecorded = 0;

  if (test && test.sections) {
    test.sections.forEach(sec => {
      if (sec.type === 'LISTENING') {
        listeningTotal += sec.questions.length;
        sec.questions.forEach(q => {
          if (answers[q.id] && String(answers[q.id]).trim() !== '') listeningAnswered++;
        });
      } else if (sec.type === 'READING') {
        readingTotal += sec.questions.length;
        sec.questions.forEach(q => {
          if (answers[q.id] && String(answers[q.id]).trim() !== '') readingAnswered++;
        });
      } else if (sec.type === 'SPEAKING') {
        speakingTotal += sec.questions.length;
        sec.questions.forEach(q => {
          if (speakingRecordings[q.id] || (q.speakingSubs && q.speakingSubs.length > 0)) speakingRecorded++;
        });
      }
    });
  }

  const writingWords = writingEssay.trim() ? writingEssay.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="review-dashboard-wrap">
      <div className="review-stats-grid">
        <div className="review-stat-box">
          <div className="review-stat-title">🎧 Listening Module</div>
          <div className="review-stat-number">{listeningAnswered} / {listeningTotal}</div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem' }}>Questions Answered</p>
          <button
            type="button"
            className="btn-vfs btn-vfs-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            onClick={() => onNavigateSection('LISTENING')}
          >
            Review Listening →
          </button>
        </div>

        <div className="review-stat-box">
          <div className="review-stat-title">📖 Reading Module</div>
          <div className="review-stat-number">{readingAnswered} / {readingTotal}</div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem' }}>Questions Answered</p>
          <button
            type="button"
            className="btn-vfs btn-vfs-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            onClick={() => onNavigateSection('READING')}
          >
            Review Reading →
          </button>
        </div>

        <div className="review-stat-box">
          <div className="review-stat-title">✍️ Writing Module</div>
          <div className="review-stat-number">{writingWords}</div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem' }}>Words Written (Min 150)</p>
          <button
            type="button"
            className="btn-vfs btn-vfs-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            onClick={() => onNavigateSection('WRITING')}
          >
            Edit Essay →
          </button>
        </div>

        <div className="review-stat-box">
          <div className="review-stat-title">🎙️ Speaking Module</div>
          <div className="review-stat-number">{speakingRecorded} / {speakingTotal}</div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem' }}>Tasks Recorded</p>
          <button
            type="button"
            className="btn-vfs btn-vfs-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            onClick={() => onNavigateSection('SPEAKING')}
          >
            Check Recordings →
          </button>
        </div>
      </div>

      <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '1.25rem', marginBottom: '2rem' }}>
        <h4 style={{ color: '#065F46', fontSize: '1rem', marginBottom: '0.4rem', fontWeight: 700 }}>
          📋 Ready for Submission
        </h4>
        <p style={{ fontSize: '0.88rem', color: '#047857', lineHeight: '1.5' }}>
          By clicking <strong>"Submit Full Test Now"</strong>, your objective answers will be graded immediately, and your Writing essay and Speaking audio recordings will be forwarded to Vectra's certified IELTS evaluation team for band assessment.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn-vfs btn-vfs-green"
          style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)' }}
          onClick={onSubmitTest}
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Submitting Test...' : '🚀 Submit Full Test Now'}
        </button>
      </div>
    </div>
  );
}
