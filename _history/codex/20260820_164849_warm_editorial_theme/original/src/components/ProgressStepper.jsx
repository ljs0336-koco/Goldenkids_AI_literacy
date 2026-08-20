import React from 'react';

export default function ProgressStepper({ steps, currentStep, subStepIndex = 0, subStepTotal = 1 }) {
  return (
    <div className="card mb-4" style={{ padding: '16px 20px' }}>
      <div className="stepper-container">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;

          let bg = 'var(--color-background)';
          let color = 'var(--color-text-muted)';
          let border = '1px solid var(--color-border)';
          let fontWeight = 'normal';

          if (isActive) {
            bg = 'var(--color-primary)';
            color = 'white';
            border = '2px solid var(--color-primary-hover)';
            fontWeight = 'bold';
          } else if (isCompleted) {
            bg = '#ccfbf1';
            color = 'var(--color-primary-hover)';
            border = '1px solid var(--color-primary)';
            fontWeight = '500';
          }

          return (
            <React.Fragment key={idx}>
              <div 
                className="step-item"
                style={{
                  backgroundColor: bg,
                  color: color,
                  border: border,
                  fontWeight: fontWeight
                }}
              >
                <div className="flex items-center justify-center gap-1">
                  {isCompleted && <span aria-hidden="true" style={{ fontSize: '14px' }}>✅</span>}
                  <span>{step}</span>
                </div>

                {/* Sub-step progress dots if this step has multiple screens and is active */}
                {isActive && subStepTotal > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-1" aria-label={`진행 ${subStepIndex + 1}/${subStepTotal}`}>
                    {Array.from({ length: subStepTotal }).map((_, dotIdx) => (
                      <span 
                        key={dotIdx}
                        style={{
                          display: 'inline-block',
                          width: dotIdx === subStepIndex ? '8px' : '6px',
                          height: dotIdx === subStepIndex ? '8px' : '6px',
                          borderRadius: '50%',
                          backgroundColor: dotIdx === subStepIndex ? 'white' : 'rgba(255, 255, 255, 0.45)',
                          transition: 'all 0.2s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow separator for desktop single-row layout */}
              {idx < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        .stepper-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
        }
        .step-item {
          flex: 1;
          min-height: 48px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          text-align: center;
          transition: all 0.2s ease;
        }
        .step-arrow {
          color: var(--color-text-muted);
          font-weight: bold;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        @media (max-width: 680px) {
          .stepper-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .step-arrow {
            display: none;
          }
          .step-item {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
