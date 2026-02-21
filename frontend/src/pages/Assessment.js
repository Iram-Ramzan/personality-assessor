import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionList from "./QuestionList";
import Result from "./Result";

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Fetch questions from backend API on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswer = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question.itemNumber]: value,
    }));
    setStep((prev) => prev + 1);
  };

  // Restart the assessment
  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Submit the assessment and show results
  const handleSubmit = () => {
    setShowResult(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        Loading questions...
      </div>
    );
  }

  if (!questions.length) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">
      No questions available.
    </div>;
  }

  return (
    <div>
      {!showResult ? (
        <QuestionList
          questions={questions}
          currentIndex={step}
          onAnswer={handleAnswer}
          onSubmit={handleSubmit}
        />
      ) : (
        <Result
          answers={answers}
          questions={questions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Assessment;
