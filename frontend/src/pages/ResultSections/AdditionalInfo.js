import React from 'react';
import './AdditionalInfo.css';

const AdditionalInfo = ({ strengths, weaknesses, tips }) => {
  return (
    <div className="additional-info mb-5">
      <div className="row text-start">
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">Strengths</h5>
          <ul className="info-list mt-2">
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">Weaknesses</h5>
          <ul className="info-list mt-2">
            {weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">Tips</h5>
          <ul className="info-list mt-2">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
