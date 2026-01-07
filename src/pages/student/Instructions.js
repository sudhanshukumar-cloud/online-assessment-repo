import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './student.scss';

const Instructions = () => {
  const { linkCode } = useParams();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleStart = () => {
    if (!accepted) return;
    // store acknowledgement and proceed
    localStorage.setItem('instructionsAccepted', JSON.stringify({ linkCode, accepted: true }));
    navigate(`/test/${linkCode}/attempt`);
  };

  return (
    <div className="instructions-container">
      <div className="instructions-card">
        <h1>Test Instructions</h1>

        <ul className="instructions-list">
          <li>Read each question carefully before answering</li>
          <li>Your answers are saved automatically</li>
          <li>You can move between questions</li>
          <li>Do not refresh or open in another tab</li>
        </ul>

        <label className="acknowledge">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>I have read and understood the instructions</span>
        </label>

        <div className="instructions-actions">
          <button
            className={`btn-start ${accepted ? 'enabled' : 'disabled'}`}
            onClick={handleStart}
            disabled={!accepted}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
