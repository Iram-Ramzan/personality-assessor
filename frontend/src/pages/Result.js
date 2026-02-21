// src/pages/Result.js
import React, { useMemo, useEffect, useState } from "react";
import PersonalitySummary from "./ResultSections/PersonalitySummary";
import TraitProgress from "./ResultSections/TraitProgress";
import CareerSuggestions from "./ResultSections/CareerSuggestions";
import AdditionalInfo from "./ResultSections/AdditionalInfo";
import "./Result.css";

const PERSONALITY_PROFILES = {
  O: {
    label: "Innovator",
    avatar: "/avatars/innovator.png",
    summary:
      "You are imaginative, curious and open to new ideas. You enjoy exploring possibilities, thinking creatively and learning continuously.",
    topCareers: [
      "UX UI Designer",
      "Product Designer",
      "Research Scientist",
      "Entrepreneur",
      "Creative Technologist",
    ],
    strengths: [
      "Highly creative and imaginative",
      "Quick to learn new concepts",
      "Strong abstract thinking",
      "Adaptable to change",
      "Visionary problem solver",
    ],
    weaknesses: [
      "May lose focus on practical details",
      "Can become bored with routine",
      "Overly idealistic at times",
      "Difficulty finishing long projects",
    ],
    tips: [
      "Balance creativity with execution",
      "Break big ideas into actionable steps",
      "Set deadlines to stay focused",
      "Collaborate with structured teammates",
    ],
  },
  C: {
    label: "Organizer",
    avatar: "/avatars/organizer.png",
    summary:
      "You are disciplined, dependable and goal oriented. You thrive in structured environments and take pride in doing things thoroughly and correctly.",
    topCareers: [
      "Project Manager",
      "Operations Manager",
      "Accountant",
      "Quality Analyst",
      "Supply Chain Manager",
    ],
    strengths: [
      "Highly reliable and responsible",
      "Strong planning and organization skills",
      "Excellent self discipline",
      "Detail oriented execution",
      "Consistent performance under pressure",
    ],
    weaknesses: [
      "Can be overly rigid",
      "Struggles with sudden changes",
      "May overwork or self criticize",
      "Difficulty delegating tasks",
    ],
    tips: [
      "Practice flexibility when plans change",
      "Delegate to avoid burnout",
      "Focus on progress not perfection",
      "Schedule breaks intentionally",
    ],
  },
  E: {
    label: "Enthusiast",
    avatar: "/avatars/enthusiast.png",
    summary:
      "You are energetic, outgoing and socially confident. You gain energy from people interaction and enjoy leading activities.",
    topCareers: [
      "Sales Executive",
      "Marketing Manager",
      "Public Relations Specialist",
      "Entrepreneur",
      "Corporate Trainer",
    ],
    strengths: [
      "Strong communication skills",
      "Confident and expressive",
      "Motivates others",
      "Comfortable in leadership roles",
      "Builds relations easily",
    ],
    weaknesses: [
      "May act impulsively",
      "Difficulty working alone long term",
      "Can overlook details",
      "Easily distracted by social activities",
    ],
    tips: [
      "Practice active listening",
      "Pause before big decisions",
      "Use planners to stay organized",
      "Balance social time with focused work",
    ],
  },
  A: {
    label: "Mediator",
    avatar: "/avatars/mediator.png",
    summary:
      "You are compassionate, cooperative and emotionally aware. You value harmony and enjoy helping others succeed.",
    topCareers: [
      "Human Resources Specialist",
      "Psychologist",
      "Counselor",
      "Social Worker",
      "Customer Success Manager",
    ],
    strengths: [
      "Highly empathetic",
      "Excellent team player",
      "Strong conflict resolution skills",
      "Supportive and trustworthy",
      "Emotionally aware",
    ],
    weaknesses: [
      "Avoids confrontation",
      "May neglect personal needs",
      "Difficulty saying no",
      "May absorb others stress",
    ],
    tips: [
      "Set healthy boundaries",
      "Practice assertive communication",
      "Prioritize self care",
      "Remember disagreement is healthy",
    ],
  },
  N: {
    label: "Analyzer",
    avatar: "/avatars/analyzer.png",
    summary:
      "You are reflective, careful and detail focused. You excel at analysis and risk awareness.",
    topCareers: [
      "Data Analyst",
      "Research Scientist",
      "Risk Analyst",
      "Quality Assurance Engineer",
      "Policy Analyst",
    ],
    strengths: [
      "Deep analytical thinking",
      "High attention to detail",
      "Risk aware decision making",
      "Emotionally perceptive",
      "Strong problem analysis",
    ],
    weaknesses: [
      "Tendency to overthink",
      "Stress sensitive under pressure",
      "Self doubt in uncertainty",
      "Avoids risky situations",
    ],
    tips: [
      "Practice stress control habits",
      "Set decision time limits",
      "Trust data more than fear",
      "Balance logic with action",
    ],
  },
};

const BG_IMAGES = {
  O: "/avatars/innovatorbg.jpg",
  C: "/avatars/organizerbg.jpg",
  E: "/avatars/enthusiastbg.jpg",
  A: "/avatars/mediatorbg.jpg",
  N: "/avatars/analyzerbg.jpg",
};

const MAX_SCALE_VALUE = 5;

const Result = ({ answers, questions, onRestart, backendPersonality }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    fetch(`http://localhost:5000/api/assessments/report/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        console.log("Secure report loaded", data);
      })
      .catch((err) => console.log(err));
  }, []);

  const hasData =
    answers &&
    questions &&
    Array.isArray(questions) &&
    questions.length > 0;

  const {
    traitScores,
    traitCounts,
    traitPercent,
    facetScores,
    facetCounts,
    facetPercent,
    dominantTrait,
  } = useMemo(() => {
    if (!hasData) {
      return {
        traitScores: { O: 0, C: 0, E: 0, A: 0, N: 0 },
        traitCounts: { O: 0, C: 0, E: 0, A: 0, N: 0 },
        traitPercent: { O: 0, C: 0, E: 0, A: 0, N: 0 },
        facetScores: {},
        facetCounts: {},
        facetPercent: {},
        dominantTrait: "O",
      };
    }

    const tScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const tCounts = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const fScores = {};
    const fCounts = {};

    questions.forEach((q) => {
      const raw = answers[q.itemNumber];
      const trait = q.domain;
      const facetCode = q.facetCode;

      if (raw === undefined) return;
      if (!["O", "C", "E", "A", "N"].includes(trait)) return;

      let effective = raw;
      if (q.reverse === true || q.keyedDirection === "-") {
        effective = MAX_SCALE_VALUE + 1 - raw;
      }

      tScores[trait] += effective;
      tCounts[trait] += 1;

      if (facetCode) {
        if (!fScores[facetCode]) {
          fScores[facetCode] = 0;
          fCounts[facetCode] = 0;
        }
        fScores[facetCode] += effective;
        fCounts[facetCode] += 1;
      }
    });

    const tPercent = {};
    Object.keys(tScores).forEach((key) => {
      const maxPossible = (tCounts[key] || 0) * MAX_SCALE_VALUE;
      tPercent[key] =
        maxPossible > 0 ? Math.round((tScores[key] / maxPossible) * 100) : 0;
    });

    const fPercent = {};
    Object.keys(fScores).forEach((code) => {
      const maxPossible = (fCounts[code] || 0) * MAX_SCALE_VALUE;
      fPercent[code] =
        maxPossible > 0 ? Math.round((fScores[code] / maxPossible) * 100) : 0;
    });

    const domTrait = Object.keys(tScores).reduce((a, b) =>
      tScores[a] > tScores[b] ? a : b
    );

    return {
      traitScores: tScores,
      traitCounts: tCounts,
      traitPercent: tPercent,
      facetScores: fScores,
      facetCounts: fCounts,
      facetPercent: fPercent,
      dominantTrait: domTrait,
    };
  }, [hasData, answers, questions]);

  if (!hasData) {
    return (
      <div className="container py-5 text-center">
        <h4>No results available</h4>
        <button className="btn btn-primary mt-3" onClick={onRestart}>
          Restart Assessment
        </button>
      </div>
    );
  }

  const personality =
    PERSONALITY_PROFILES[dominantTrait] || PERSONALITY_PROFILES.O;
  const bg = BG_IMAGES[dominantTrait];

  const careersToShow =
    report &&
    Array.isArray(report.careerSuggestions) &&
    report.careerSuggestions.length > 0
      ? report.careerSuggestions
      : personality.topCareers;

  return (
    <div
      className="result-container container py-5"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PersonalitySummary
        personality={personality}
        traitScores={traitScores}
        facetScores={facetScores}
        facetPercent={facetPercent}
      />

      <TraitProgress traitPercent={traitPercent} />

      <CareerSuggestions topCareers={careersToShow} />

      <AdditionalInfo
        strengths={personality.strengths}
        weaknesses={personality.weaknesses}
        tips={personality.tips}
      />

      <div className="text-center mt-4">
        <button className="btn btn-primary px-4 py-2" onClick={onRestart}>
          Restart Assessment
        </button>
      </div>
    </div>
  );
};

export default Result;
