import React, { useState } from 'react'
import './App.css'

const EMOJI_BURST_DURATION = 1500; // ms
const EMOJI_COUNT = 24;
const YES_URL = 'https://www.youtube.com/watch?v=gD2lt5bOYOM';
const NO_URL = 'https://www.youtube.com/watch?v=31g0YE61PLQ';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function EmojiBurst({ emoji, trigger }) {
  const [emojis, setEmojis] = useState([]);

  React.useEffect(() => {
    if (trigger) {
      // Generate random emoji positions and animations
      const newEmojis = Array.from({ length: EMOJI_COUNT }, (_, i) => ({
        id: i + '-' + Date.now(),
        left: getRandomInt(10, 90), // percent
        top: getRandomInt(20, 70), // percent
        rotate: getRandomInt(-30, 30),
        size: getRandomInt(28, 48),
      }));
      setEmojis(newEmojis);
      // Clear after duration
      const timeout = setTimeout(() => setEmojis([]), EMOJI_BURST_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return (
    <div className="emoji-burst-container">
      {emojis.map(e => (
        <span
          key={e.id}
          className="emoji-burst"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            transform: `rotate(${e.rotate}deg)`,
            fontSize: `${e.size}px`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [burst, setBurst] = useState({ type: null, ts: 0 });
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  const handleYes = () => {
    setBurst({ type: 'yes', ts: Date.now() });
    if (redirectTimeout) clearTimeout(redirectTimeout);
    setRedirectTimeout(setTimeout(() => {
      window.location.href = YES_URL;
    }, EMOJI_BURST_DURATION));
  };

  const handleNo = () => {
    setBurst({ type: 'no', ts: Date.now() });
    if (redirectTimeout) clearTimeout(redirectTimeout);
    setRedirectTimeout(setTimeout(() => {
      window.location.href = NO_URL;
    }, EMOJI_BURST_DURATION));
  };

  return (
    <div className="yesno-app">
      <div className="button-row">
        <button className="yes-btn" onClick={handleYes}>Yes</button>
        <button className="no-btn" onClick={handleNo}>No</button>
      </div>
      <EmojiBurst
        emoji={burst.type === 'yes' ? '👍' : burst.type === 'no' ? '👎' : ''}
        trigger={burst.ts}
      />
    </div>
  );
}

export default App
