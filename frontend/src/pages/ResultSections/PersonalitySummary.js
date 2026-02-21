import React from "react";

const PersonalitySummary = ({ personality }) => {
  return (
    <div className="summaryWrapper">
      <h2 className="summaryHeading">Personality Report</h2>

      {/* Full hero image instead of small avatar */}
      <img
        src={personality.avatar} 
        alt={personality.label}
        className="summaryAvatar"
      />

      <h2 className="summaryLabel">{personality.label}</h2>
      <p className="summaryText">{personality.summary}</p>
    </div>
  );
};

export default PersonalitySummary;
