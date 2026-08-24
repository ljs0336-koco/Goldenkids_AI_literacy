import React from 'react';

export default function VerificationExperienceStage({ sceneKey, className = '', children }) {
  return (
    <div key={sceneKey} className={`verification-experience-stage ${className}`.trim()}>
      {children}
    </div>
  );
}
