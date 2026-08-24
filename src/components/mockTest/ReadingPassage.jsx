import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

export default function ReadingPassage({
  questions = [],
  answers = {},
  onAnswerChange,
  disabled = false
}) {
  const [fontSize, setFontSize] = useState(15); // in px

  // Group questions by section/passage
  // Range: Part 1 (1-14), Part 2 (15-27), Part 3 (28-40)
  const [activePart, setActivePart] = useState(1);

  const part1Questions = questions.filter(q => q.order <= 14);
  const part2Questions = questions.filter(q => q.order >= 15 && q.order <= 27);
  const part3Questions = questions.filter(q => q.order >= 28);

  const currentQuestions = activePart === 1
    ? (part1Questions.length > 0 ? part1Questions : questions)
    : (activePart === 2 ? part2Questions : part3Questions);

  const currentPassage = currentQuestions[0]?.passage || 'Please read the text and answer the questions.';

  const getAnsweredCount = (list) => {
    return list.filter(q => answers[q.id] && String(answers[q.id]).trim() !== '').length;
  };

  return (
    <div>
      {/* Passage Selector Tabs */}
      {questions.length > 14 && (
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn-vfs ${activePart === 1 ? 'btn-vfs-primary' : 'btn-vfs-secondary'}`}
            style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
            onClick={() => setActivePart(1)}
          >
            📑 Passage 1 (Q1–14) • {getAnsweredCount(part1Questions)}/14
          </button>
          <button
            type="button"
            className={`btn-vfs ${activePart === 2 ? 'btn-vfs-primary' : 'btn-vfs-secondary'}`}
            style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
            onClick={() => setActivePart(2)}
          >
            📑 Passage 2 (Q15–27) • {getAnsweredCount(part2Questions)}/13
          </button>
          <button
            type="button"
            className={`btn-vfs ${activePart === 3 ? 'btn-vfs-primary' : 'btn-vfs-secondary'}`}
            style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
            onClick={() => setActivePart(3)}
          >
            📑 Passage 3 (Q28–40) • {getAnsweredCount(part3Questions)}/13
          </button>
        </div>
      )}

      <div className="reading-layout-grid">
        {/* Left Column: Passage */}
        <div className="passage-panel" style={{ fontSize: `${fontSize}px`, maxHeight: '680px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B' }}>
              📖 Reading Passage (Part {activePart})
            </span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                style={{ padding: '0.15rem 0.5rem', fontSize: '0.75rem' }}
                onClick={() => setFontSize(prev => Math.max(13, prev - 1))}
                title="Decrease text size"
              >
                A-
              </button>
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                style={{ padding: '0.15rem 0.5rem', fontSize: '0.75rem' }}
                onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
                title="Increase text size"
              >
                A+
              </button>
            </div>
          </div>

          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.75' }}>
            {currentPassage}
          </div>
        </div>

        {/* Right Column: Questions */}
        <div className="questions-panel" style={{ maxHeight: '680px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {currentQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={q.order ? q.order - 1 : undefined}
              value={answers[q.id]}
              onChange={onAnswerChange}
              disabled={disabled}
            />
          ))}

          {/* Next / Previous Passage Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
            {activePart > 1 ? (
              <button
                type="button"
                className="btn-vfs btn-vfs-secondary"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
                onClick={() => setActivePart(prev => prev - 1)}
              >
                ← Previous Passage
              </button>
            ) : <div />}

            {activePart < 3 && questions.length > 14 && (
              <button
                type="button"
                className="btn-vfs btn-vfs-primary"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
                onClick={() => setActivePart(prev => prev + 1)}
              >
                Next Passage →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
