import React, { useState, useEffect } from 'react';

export default function CountdownTimer({
  durationMinutes = 40,
  studentName = 'Candidate',
  testTitle = 'IELTS Full Mock Test',
  onTimeExpire
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeExpire) onTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMinutes, onTimeExpire]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isWarning = secondsRemaining < 300; // Under 5 minutes

  const formatDigits = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="exam-sticky-header">
      <div className="exam-header-inner">
        <div className="candidate-badge">
          <div className="candidate-avatar">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="candidate-name">{studentName}</div>
            <div className="candidate-id">{testTitle}</div>
          </div>
        </div>

        <div className={`exam-timer-box ${isWarning ? 'warning' : ''}`}>
          <span>⏱️</span>
          <span>
            {formatDigits(minutes)}:{formatDigits(seconds)}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94A3B8' }}>remaining</span>
        </div>
      </div>
    </div>
  );
}
