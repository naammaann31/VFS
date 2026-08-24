import React from 'react';

const SECTIONS = [
  { id: 'LISTENING', label: '1. Listening', icon: '🎧' },
  { id: 'READING', label: '2. Reading', icon: '📖' },
  { id: 'WRITING', label: '3. Writing', icon: '✍️' },
  { id: 'SPEAKING', label: '4. Speaking', icon: '🎙️' },
  { id: 'REVIEW', label: '5. Review & Submit', icon: '📋' }
];

export default function SectionNavigator({ currentSection, onSelectSection, completedSections = [] }) {
  const currentIndex = SECTIONS.findIndex(s => s.id === currentSection);

  return (
    <div className="stepper-nav-bar">
      <div className="stepper-container">
        {SECTIONS.map((sec, idx) => {
          const isActive = sec.id === currentSection;
          const isCompleted = completedSections.includes(sec.id) || idx < currentIndex;

          let pillClass = 'stepper-pill';
          if (isActive) pillClass += ' active';
          else if (isCompleted) pillClass += ' completed';

          return (
            <button
              key={sec.id}
              className={pillClass}
              onClick={() => {
                if (isCompleted && !isActive) return;
                onSelectSection(sec.id);
              }}
              disabled={isCompleted && !isActive}
              style={{ cursor: isCompleted && !isActive ? 'not-allowed' : 'pointer' }}
              type="button"
            >
              <span>{isCompleted && !isActive ? '🔒' : sec.icon}</span>
              <span>{sec.label}</span>
              {isCompleted && !isActive && <span style={{ marginLeft: '4px' }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
