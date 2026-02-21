import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TRAIT_META = {
  O: { label: 'Openness', color: '#20c997' },
  C: { label: 'Conscientiousness', color: '#0d6efd' },
  E: { label: 'Extraversion', color: '#fd7e14' },
  A: { label: 'Agreeableness', color: '#198754' },
  N: { label: 'Neuroticism', color: '#d63384' },
};

const TraitProgress = ({ traitPercent }) => {
  return (
    <div className="traits-container d-flex justify-content-around flex-wrap mb-5">
      {Object.keys(traitPercent).map((trait) => {
        const meta = TRAIT_META[trait];
        return (
          <div key={trait} className="trait-card text-center mb-4">
            <CircularProgressbar
              value={traitPercent[trait]}
              text={`${traitPercent[trait]}%`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: meta.color,
                textColor: '#212529',
                trailColor: '#e9ecef',
              })}
            />
            <div
              className="mt-3 fw-bold"
              style={{ color: meta.color }}
            >
              {meta.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TraitProgress;
