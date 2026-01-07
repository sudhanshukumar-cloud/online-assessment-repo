import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './student.scss';
import {QUESTIONS} from '../../../question';
import Modal from '../../common/Modal';

const Exam = () => {
  const { linkCode } = useParams();
  const [questions] = useState(() => {
    // use all questions from QUESTIONS and normalize options to array [A,B,C,D]
    return QUESTIONS.map((q) => ({
      id: q.id,
      text: q.text,
      options: ['A', 'B', 'C', 'D'].map((k) => q.options[k])
    }));
  });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0]));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    // restore answers if present
    try {
      const saved = JSON.parse(localStorage.getItem('examAnswers')) || {};
      setAnswers(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    setVisited((s) => new Set(s).add(current));
  }, [current]);

  const selectOption = (qIndex, optionIndex) => {
    setAnswers((prev) => {
      const next = { ...prev, [qIndex]: optionIndex };
      localStorage.setItem('examAnswers', JSON.stringify(next));
      return next;
    });
  };

  const goTo = (index) => {
    if (index < 0 || index >= questions.length) return;
    setCurrent(index);
  };

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  const handleSubmit = () => {
    setConfirmOpen(true);
  };

  const onConfirmSubmit = () => {
    setConfirmOpen(false);
    localStorage.setItem('examFinalAnswers', JSON.stringify({ linkCode, answers }));
    setSuccessOpen(true);
  };

  const statusOf = (idx) => {
    if (idx === current) return 'current';
    if (answers[idx] !== undefined) return 'answered';
    if (visited.has(idx)) return 'visited';
    return 'not-visited';
  };

  return (
    <>
    <div className="exam-root">
      <header className="exam-header">
        <div className="exam-title">Javascript Test </div>
        <div className="exam-progress">Question {current + 1} of {questions.length}</div>
      </header>

      <div className="exam-body">
        <main className="question-area">
          <div className="question-number">Question {current + 1}</div>
          <div className="question-text">{questions[current].text}</div>

          <div className="options-list">
            {questions[current].options.map((opt, oi) => (
              <label key={oi} className={`option ${answers[current] === oi ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={`q-${current}`}
                  checked={answers[current] === oi}
                  onChange={() => selectOption(current, oi)}
                />
                <span className="option-label">{String.fromCharCode(65 + oi)}. {opt}</span>
              </label>
            ))}
          </div>

          <div className="question-nav">
            <button onClick={handlePrev} disabled={current === 0} className="nav-btn">◀ Previous</button>
            <button onClick={handleNext} disabled={current === questions.length - 1} className="nav-btn">Next ▶</button>
            <button onClick={handleSubmit} className="nav-btn submit">Submit Test</button>
          </div>
        </main>

        <aside className="question-palette">
          <div className="palette-title">Question Palette</div>
          <div className="palette-grid">
            {questions.map((q, i) => (
              <button
                key={q.id}
                className={`palette-item ${statusOf(i)}`}
                onClick={() => goTo(i)}
                aria-label={`Go to question ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
      <Modal
        visible={confirmOpen}
        title="Confirm Submit"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirmSubmit}
        confirmText="Submit"
        cancelText="Cancel"
      >
        <div>Submit test? You will not be able to change answers after submitting.</div>
      </Modal>

      <Modal
        visible={successOpen}
        title="Submitted"
        onConfirm={() => setSuccessOpen(false)}
        confirmText="OK"
      >
        <div>Test submitted successfully</div>
      </Modal>
      </>
  );
};

export default Exam;
