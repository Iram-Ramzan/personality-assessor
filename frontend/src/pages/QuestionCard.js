import React, { useState } from 'react';
import './QuestionList.css';

function QuestionCard({ question, onAnswer, dimmed }) {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const options = [
    { label: 'Strongly Agree', value: 5 },
    { label: 'Slightly Agree', value: 4 },
    { label: 'Neutral', value: 3 },
    { label: 'Slightly Disagree', value: 2 },
    { label: 'Strongly Disagree', value: 1 },
  ];

  const handleClick = (value) => {
    setSelected(value);
    setIsAnswered(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        onAnswer(value);
        setIsAnswered(false);
        setSelected(null);
      }, 400);
    });
  };

  const getSizeClass = (value) => {
    switch (value) {
      case 1:
      case 5:
        return 'size-lg';
      case 2:
      case 4:
        return 'size-md';
      case 3:
      default:
        return 'size-sm';
    }
  };

  return (
    <div
      className="question-card floating-card p-4 mb-4 rounded bg-white"
      style={{ maxWidth: '900px' }}
    >
      <h4 className="question-text text-center mb-4">{question.text}</h4>

      <div className="d-flex align-items-center justify-content-center gap-3">
        <span className="scale-label agree-label fw-bold fs-5">Agree</span>

        {options.map(({ label, value }) => {
          const isSelected = selected === value;
          const sizeClass = getSizeClass(value);

          let typeClass = 'neutral';
          if (value === 4 || value === 5) typeClass = 'agree';
          else if (value === 1 || value === 2) typeClass = 'disagree';

          return (
            <div className="d-flex flex-column align-items-center" key={value}>
              <button
                disabled={dimmed || isAnswered}
                className={`circle-btn ${typeClass} ${sizeClass} ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => handleClick(value)}
              >
                {isSelected && <span className="tick">✓</span>}
              </button>
              <small className="scale-caption mt-1 text-center">{label}</small>
            </div>
          );
        })}

        <span className="scale-label disagree-label fw-bold fs-5">Disagree</span>
      </div>
    </div>
  );
}

export default QuestionCard;
