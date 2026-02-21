import React, { useEffect, useRef } from 'react';
import QuestionCard from './QuestionCard';
import './QuestionList.css';

const QuestionList = ({ questions, currentIndex, onAnswer, onSubmit }) => {
  const containerRef = useRef(null);
  const totalQuestions = questions.length;

  const progressPercent =
    totalQuestions === 0
      ? 0
      : Math.min(Math.round((currentIndex / totalQuestions) * 100), 100);

  useEffect(() => {
    const currentCard = containerRef.current?.querySelector(
      `.question-wrapper[data-index="${currentIndex}"]`
    );
    currentCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  return (
    <div className="question-list-page">
      {/* Background */}
      <div className="progress-wrapper">
        <div
          className="progress-bar-custom"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="question-list-container" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-5 header-section">
          <h2 className="fw-bold main-title">Personality Assessment Tool</h2>
          <p className="text-muted fs-5 subtitle">
            Get career guidance based on your Big Five personality profile.
          </p>
          <p className="text-dark mt-3 info-text">
            Answer the questions by selecting from: 
            <span className="text-success fw-bold"> Strongly Agree</span>, 
            <span className="text-success"> Agree</span>, 
            <span className="text-secondary"> Neutral</span>, 
            <span className="text-purple"> Disagree</span>, and 
            <span className="text-purple fw-bold"> Strongly Disagree</span>.
          </p>
        </div>

        {questions.map((q, index) => (
          <div
            key={q._id}
            data-index={index}
            className={`question-wrapper ${
              index === currentIndex
                ? 'active'
                : index < currentIndex
                ? 'above'
                : 'below'
            }`}
          >
            <div className="question-number">
              Question {index + 1} / {totalQuestions}
            </div>

            <QuestionCard
              question={q}
              onAnswer={(value) => onAnswer(q, value)}
              dimmed={index !== currentIndex}
            />
          </div>
        ))}

        {currentIndex === questions.length && (
          <div className="submit-wrapper text-center">
            <button className="btn btn-success btn-lg" onClick={onSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
