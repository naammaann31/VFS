import React from 'react';

const SECTIONS = [
  { id: 'LISTENING', label: '1. Listening', icon: '🎧' },
  { id: 'READING', label: '2. Reading', icon: '📖' },
  { id: 'WRITING', label: '3. Writing', icon: '✍️' },
  { id: 'SPEAKING', label: '4. Speaking', icon: '🎙️' },
  { id: 'REVIEW', label: '5. Review & Submit', icon: '📋' }
];

export default function SectionNavigator({ currentSection, onSelectSection }) {
  return (
    <div className="stepper-nav-bar">
      <div className="stepper-container">
        {SECTIONS.map((sec) => {
          const isActive = sec.id === currentSection;
          const pillClass = `stepper-pill ${isActive ? 'active' : ''}`;

          return (
            <button
              key={sec.id}
              className={pillClass}
              onClick={() => onSelectSection(sec.id)}
              type="button"
              title={`Switch to ${sec.label}`}
            >
              <span>{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
