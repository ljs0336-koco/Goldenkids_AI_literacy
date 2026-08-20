import React, { useState } from 'react';
import { getMissionById } from '../../agentEngine';
import geumjjokIdea from '../../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

export default function MissionPlanScreen({ missionId, onNext, onPrev }) {
  const mission = getMissionById(missionId);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const handleNextStep = () => {
    if (currentStepIndex < mission.steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      if (onNext) onNext();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="text-center mb-5">
        <div style={{ fontSize: '36px', marginBottom: '4px' }}>{mission.icon}</div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px' }}>
          {mission.title}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          에이전트가 생각하고 도구를 호출하는 자율 실행 루프를 단계별로 확인해 보세요.
        </p>
      </div>

      {/* 에이전트 생각 & 도구 실행 타임라인 카드 */}
      <div 
        style={{
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-border)',
          padding: '20px 24px',
          marginBottom: '20px'
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <img src={geumjjokIdea} alt="에이전트" style={{ width: '32px', height: 'auto' }} />
          <strong style={{ fontSize: '14px', color: 'var(--color-secondary)' }}>
            🤖 AI 에이전트의 자율 실행 루프 (Step {currentStepIndex} / {mission.steps.length})
          </strong>
        </div>

        <div className="flex flex-col gap-3">
          {mission.steps.slice(0, currentStepIndex).map((step) => {
            const isApproval = step.type === 'approval_needed';

            return (
              <div 
                key={step.stepIndex}
                style={{
                  backgroundColor: isApproval ? '#fef2f2' : 'white',
                  border: isApproval ? '1.5px solid #fecaca' : '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  animation: 'fadeIn 0.2s ease-out'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: isApproval ? 'bold' : '500', color: isApproval ? '#dc2626' : '#1e293b', lineHeight: '1.5' }}>
                  {step.text}
                </div>

                {isApproval && (
                  <div style={{ marginTop: '6px', fontSize: '12px', color: '#b91c1c', fontWeight: 'bold' }}>
                    {step.warningMessage}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 내비게이션 */}
      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 미션 다시 고르기
        </button>
        <button 
          className="btn-primary" 
          onClick={handleNextStep}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          {currentStepIndex < mission.steps.length 
            ? `다음 단계 실행 보기 (${currentStepIndex}/${mission.steps.length}) →` 
            : "👤 인간 승인 검문소로 이동하기 →"}
        </button>
      </div>
    </div>
  );
}
