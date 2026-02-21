import React from "react";
import QuestionCard from "./QuestionCard";
import "./styles.css";

const Questionnaire = ({
  questions,
  currentStep,
  onAnswer,
  onSubmit,
}) => {
  const totalQuestions = questions.length;

  const progressPercent =
    totalQuestions === 0
      ? 0
      : Math.min(Math.round((currentStep / totalQuestions) * 100), 100);

  return (
    <div className="questionnaire-page">
      {/* Top Progress Bar */}
      <div className="progress-wrapper">
        <div
          className="progress-bar-custom"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="questionnaire-container">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="questionnaire-title">
            Personality Assessment Tool
          </h2>
          <p className="text-muted fs-5 mt-3">
            Discover your strengths and get career guidance based on your personality type
          </p>
        </div>

        {/* QUESTIONS */}
        {questions.map((q, index) => (
          <div
            key={q._id}
            className={`question-wrapper ${
              index === currentStep
                ? "active"
                : index < currentStep
                ? "dimmed"
                : "upcoming"
            }`}
          >
            <div className="question-number">
              Question {index + 1} / {totalQuestions}
            </div>

            <QuestionCard
              question={q}
              onAnswer={(value) => onAnswer(q, value)}
              disabled={index !== currentStep}
            />
          </div>
        ))}

        {/* SUBMIT BUTTON */}
        {currentStep >= totalQuestions && (
          <div className="text-center mt-5">
            <button
              className="btn btn-primary px-5 py-3 fs-5"
              onClick={onSubmit}
            >
              Submit Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
