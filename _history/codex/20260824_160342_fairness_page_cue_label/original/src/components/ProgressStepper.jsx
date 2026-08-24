import React from 'react';

export default function ProgressStepper({ steps, currentStep, subStepIndex = 0, subStepTotal = 1 }) {
  return (
    <nav className="progress-panel" aria-label="활동 진행 단계">
      <div className="stepper-container">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const stateClass = isActive ? 'is-active' : isCompleted ? 'is-completed' : '';

          return (
            <React.Fragment key={step}>
              <div className={`step-item ${stateClass}`} aria-current={isActive ? 'step' : undefined}>
                <div>
                  {isCompleted && <span className="step-state-mark" aria-hidden="true">✓</span>}
                  <span>{step}</span>
                </div>

                {isActive && subStepTotal > 1 && (
                  <div className="step-dots" aria-label={`진행 ${subStepIndex + 1}/${subStepTotal}`}>
                    {Array.from({ length: subStepTotal }).map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`step-dot ${dotIndex === subStepIndex ? 'is-current' : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {index < steps.length - 1 && <div className="step-arrow" aria-hidden="true">›</div>}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
