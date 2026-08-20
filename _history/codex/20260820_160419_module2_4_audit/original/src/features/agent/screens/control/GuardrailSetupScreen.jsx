import React from 'react';
import { safetyGuardrails } from '../../agentData';
import { evaluateGuardrailSafety } from '../../agentEngine';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function GuardrailSetupScreen({ guardrailChoices = {}, onSelectGuardrail, onNext, onPrev }) {
  const evaluation = evaluateGuardrailSafety(guardrailChoices);

  const handleChoice = (guardId, optionId) => {
    if (onSelectGuardrail) {
      onSelectGuardrail(guardId, optionId);
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div className="text-center mb-5">
        <img src={geumjjokDoctor} alt="안전 가드레일" style={{ width: '56px', height: 'auto', marginBottom: '6px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px' }}>
          4대 안전 가드레일(Guardrails) 설정 🛡️
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          자율 AI 에이전트가 통제를 벗어나지 않도록 4가지 안전 보호막을 구축해 주세요.
        </p>
      </div>

      {/* 안전 지수 배너 */}
      <div 
        style={{
          backgroundColor: evaluation.safetyScore >= 100 ? '#f0fdfa' : '#fffbeb',
          border: evaluation.safetyScore >= 100 ? '1.5px solid #99f6e4' : '1.5px solid #fde047',
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>현재 에이전트 안전 통제 지수</span>
          <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: evaluation.safetyScore >= 100 ? 'var(--color-primary-hover)' : '#b45309' }}>
            {evaluation.safetyScore}점 / 100점 · {evaluation.safetyLevel}
          </div>
        </div>
        <div style={{ fontSize: '13px', color: '#475569' }}>
          {evaluation.safetyScore >= 100 
            ? "🛡️ 모든 가드레일이 완벽하게 가동 중입니다!" 
            : "⚠️ 권장 설정을 선택하여 안전성을 높여주세요."}
        </div>
      </div>

      {/* 4대 가드레일 카드 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {safetyGuardrails.map(guard => {
          const currentOptId = guardrailChoices[guard.id] || guard.options[0].id;

          return (
            <div 
              key={guard.id}
              style={{
                backgroundColor: 'white',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 'bold', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{guard.icon}</span> {guard.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                  {guard.desc}
                </p>

                {/* 옵션 버튼 2개 */}
                <div className="flex flex-col gap-2">
                  {guard.options.map(opt => {
                    const isSelected = currentOptId === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleChoice(guard.id, opt.id)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected 
                            ? (opt.recommended ? '2px solid var(--color-primary)' : '2px solid #f59e0b') 
                            : '1px solid #e2e8f0',
                          backgroundColor: isSelected 
                            ? (opt.recommended ? '#f0fdfa' : '#fffbeb') 
                            : '#fafafa',
                          color: isSelected 
                            ? (opt.recommended ? 'var(--color-primary-hover)' : '#92400e') 
                            : '#334155',
                          fontSize: '12.5px',
                          fontWeight: isSelected ? 'bold' : 'normal',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 처음으로
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          🚨 킬스위치(Kill-Switch) 실전 시뮬레이션으로 가기 →
        </button>
      </div>
    </div>
  );
}
