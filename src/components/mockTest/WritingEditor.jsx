import React from 'react';

export default function WritingEditor({
  question,
  value = '',
  onChange,
  minWords = 150,
  maxWords = 215,
  taskNumber = 1,
  disabled = false
}) {
  const wordsArray = value.trim() ? value.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const isTargetMet = wordCount >= minWords;

  const handleChange = (newVal) => {
    const arr = newVal.trim() ? newVal.trim().split(/\s+/).filter(Boolean) : [];
    if (maxWords && arr.length > maxWords) {
      const truncated = arr.slice(0, maxWords).join(' ');
      onChange(truncated);
    } else {
      onChange(newVal);
    }
  };

  const isTask1 = minWords <= 150;

  return (
    <div className="writing-editor-container" style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      {/* Header Tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '0.75rem' }}>
        <div>
          <span style={{ background: isTask1 ? '#EFF6FF' : '#FEF3C7', color: isTask1 ? '#1D4ED8' : '#B45309', fontWeight: 800, fontSize: '0.78rem', padding: '0.3rem 0.75rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {isTask1 ? '✍️ Writing Task 1 (Letter)' : '✍️ Writing Task 2 (Discursive Essay)'}
          </span>
          <span style={{ fontSize: '0.82rem', color: '#64748B', marginLeft: '0.75rem' }}>
            ⏱️ Suggested time: {isTask1 ? '20 minutes' : '40 minutes'}
          </span>
        </div>

        <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
          Max Band 9.0
        </span>
      </div>

      {/* Task Prompt */}
      <div style={{ background: '#F8FAFC', borderLeft: `4px solid ${isTask1 ? '#2563EB' : '#D97706'}`, padding: '1.25rem 1.5rem', borderRadius: '0 8px 8px 0', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: '#1E293B', whiteSpace: 'pre-line' }}>
        {question?.questionText || 'Write your response addressing the prompt below.'}
      </div>

      {/* Essay Editor Area */}
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label
            htmlFor={`writing-textarea-${question?.id || taskNumber}`}
            style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1E293B' }}
          >
            Your {isTask1 ? 'Letter' : 'Essay'} Response:
          </label>
          <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
            Minimum requirement: <strong>{minWords} words</strong>
          </span>
        </div>

        <textarea
          id={`writing-textarea-${question?.id || taskNumber}`}
          className="writing-textarea"
          style={{ minHeight: isTask1 ? '240px' : '320px', fontFamily: 'inherit', fontSize: '0.98rem', lineHeight: '1.7' }}
          placeholder={`Start typing your response here... (Write at least ${minWords} words)`}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onPaste={(e) => {
            e.preventDefault();
          }}
          onCopy={(e) => {
            e.preventDefault();
          }}
          onCut={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
          }}
        />

        {/* Live Word Count & Progress Bar */}
        <div className="word-counter-card" style={{ marginTop: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.88rem' }}>Live Word Count:</span>
              <span className={`word-count-badge ${isTargetMet ? 'met' : 'pending'}`} style={{ fontSize: '0.85rem' }}>
                {wordCount} / {minWords} words
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: isTargetMet ? '#059669' : '#D97706', fontWeight: 700 }}>
              {isTargetMet ? '✓ Minimum word requirement satisfied' : `Needs ${Math.max(0, minWords - wordCount)} more words to reach minimum`}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.min(100, Math.round((wordCount / minWords) * 100))}%`,
                height: '100%',
                background: isTargetMet ? '#059669' : '#D97706',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
