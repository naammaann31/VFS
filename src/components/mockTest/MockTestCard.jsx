import React from 'react';

export default function MockTestCard({ test, onStartTest }) {
  const { id, title, description, category, duration, sections = [], totalQuestions, totalMarks } = test;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '1.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 20px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span
            style={{
              background: '#FEF3C7',
              color: '#B45309',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {category || 'IELTS'}
          </span>
          <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            ⏱️ {duration} Mins
          </span>
        </div>

        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.35rem', color: '#1C2B4B', marginBottom: '0.5rem', lineHeight: '1.3' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '1.25rem' }}>
          {description || 'Full-length computer-delivered mock test featuring all four modules with auto-scoring and human evaluation.'}
        </p>

        {/* Section Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          <span style={{ background: '#F1F5F9', color: '#334155', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            🎧 Listening
          </span>
          <span style={{ background: '#F1F5F9', color: '#334155', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            📖 Reading
          </span>
          <span style={{ background: '#F1F5F9', color: '#334155', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            ✍️ Writing
          </span>
          <span style={{ background: '#F1F5F9', color: '#334155', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            🎙️ Speaking
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn-vfs btn-vfs-gold"
        style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
        onClick={() => onStartTest(test)}
      >
        🚀 Start Practice Test →
      </button>
    </div>
  );
}
