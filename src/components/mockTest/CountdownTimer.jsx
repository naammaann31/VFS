import React, { useState, useEffect } from 'react';

export default function CountdownTimer({
  durationMinutes = 20,
  studentName = 'Candidate',
  testTitle = 'IELTS Full Mock Test',
  onTimeExpire
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);

  useEffect(() => {
    setSecondsRemaining(durationMinutes * 60);
  }, [durationMinutes]);

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
  }, [onTimeExpire]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isWarning = secondsRemaining <= 180; // Under 3 minutes

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

        <div className={`exam-timer-box ${isWarning ? 'warning' : ''}`} title="Overall 20-Minute Exam Countdown">
          <span>⏱️</span>
          <span>
            {formatDigits(minutes)}:{formatDigits(seconds)}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: isWarning ? '#FCA5A5' : '#94A3B8' }}>
            remaining
          </span>
        </div>
      </div>
    </div>
  );
}
