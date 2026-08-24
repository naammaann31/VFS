import React from 'react';

export default function QuestionCard({
  question,
  index,
  value,
  onChange,
  disabled = false
}) {
  const { id, type, questionText, marks, options = [] } = question;

  return (
    <div className="question-item-card">
      <div className="question-header">
        <span className="question-num-tag">
          Question {index !== undefined ? index + 1 : ''} ({type.replace('_', ' ')})
        </span>
        <span className="question-marks-badge">
          {marks} {marks === 1 ? 'Mark' : 'Marks'}
        </span>
      </div>

      <div className="question-prompt">
        {questionText}
      </div>

      {(type === 'MCQ' || type === 'TRUE_FALSE') && (
        <div className="options-list">
          {options.map((opt, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            const isSelected = value === opt.optionText || value === opt.id || value === letter;

            return (
              <label
                key={opt.id || optIdx}
                className={`option-choice-label ${isSelected ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`question_${id}`}
                  value={opt.optionText}
                  checked={isSelected}
                  onChange={() => onChange(id, opt.optionText)}
                  disabled={disabled}
                />
                <span>
                  <strong>{letter})</strong> {opt.optionText}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {type === 'FILL_BLANK' && (
        <div style={{ marginTop: '0.75rem' }}>
          <input
            type="text"
            className="fill-blank-input"
            placeholder="Type your answer here..."
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value)}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}
