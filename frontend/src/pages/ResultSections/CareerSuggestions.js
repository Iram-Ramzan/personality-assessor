import React from 'react';
import './CareerSuggestions.css';
const CareerSuggestions = ({ topCareers }) => {
  return (
    <div className="careers-section mb-5 text-center">
      <h3 className="fw-bold mb-4 text-primary">
        Best Fit Career Recommendations
      </h3>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {topCareers.map((career, index) => (
          <div
            key={index}
            className="career-card-highlight shadow-lg p-3 text-center rounded"
            style={{
              width: '220px',
              minHeight: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff',
              borderRadius: '12px',
            }}
          >
            <div className="career-icon fs-2">💼</div>
            <h5 className="fw-bold mt-2">{career}</h5>
            <p className="text-muted small mb-0 text-center">
              Strong match based on your personality traits
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerSuggestions;
