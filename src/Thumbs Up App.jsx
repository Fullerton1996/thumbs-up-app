openimport React, { useState } from 'react'
import './App.css'

const EMOJI_BURST_DURATION = 1500; // ms
const EMOJI_COUNT = 24;

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

  const handleYes = () => setBurst({ type: 'yes', ts: Date.now() });
  const handleNo = () => setBurst({ type: 'no', ts: Date.now() });

  return (
    <div className="yesno-app">
      <h1>Yes or No?</h1>
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
