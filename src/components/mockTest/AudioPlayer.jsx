import React, { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ audioUrl, maxPlays = 2, autoPrepSeconds = 30 }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [prepCountdown, setPrepCountdown] = useState(autoPrepSeconds);
  const [prepActive, setPrepActive] = useState(autoPrepSeconds > 0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Preparation Countdown Timer
  useEffect(() => {
    let timer;
    if (prepActive && prepCountdown > 0) {
      timer = setInterval(() => {
        setPrepCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPrepActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [prepActive, prepCountdown]);

  const handleSkipPrep = () => {
    setPrepActive(false);
    setPrepCountdown(0);
  };

  const handlePlayToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (playCount >= maxPlays) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        if (currentTime === 0) {
          setPlayCount(prev => prev + 1);
        }
      }).catch(err => {
        console.error('Audio play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const canPlay = playCount < maxPlays && !prepActive;

  return (
    <div className="vfs-audio-player">
      <audio
        ref={audioRef}
        src={audioUrl || '/listening-audio.mp3'}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="audio-header-row">
        <div className="audio-track-title">
          <span>🎧</span>
          <span>IELTS Listening Track (Max {maxPlays} Plays)</span>
        </div>
        <div className="audio-play-counter">
          Plays: <strong>{playCount} / {maxPlays}</strong>
        </div>
      </div>

      {prepActive ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '0.6rem 1rem', borderRadius: '6px' }}>
          <span style={{ fontSize: '0.9rem', color: '#FCD34D' }}>
            ⏳ <strong>Read questions carefully:</strong> {prepCountdown}s remaining
          </span>
          <button
            type="button"
            className="btn-vfs btn-vfs-gold"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            onClick={handleSkipPrep}
          >
            Start Audio Now →
          </button>
        </div>
      ) : (
        <div className="audio-controls-row">
          <button
            type="button"
            className="btn-play-audio"
            onClick={handlePlayToggle}
            disabled={!canPlay && !isPlaying}
          >
            {isPlaying ? '⏸ Pause Audio' : (playCount >= maxPlays ? '🚫 Play Limit Reached' : '▶ Play Track')}
          </button>

          <div className="audio-progress-container">
            <div className="audio-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.85rem', color: '#CBD5E1' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      )}
    </div>
  );
}
