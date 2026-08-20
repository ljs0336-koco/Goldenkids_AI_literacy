import React from 'react';
import { roleScenarios, aiPersonas } from '../../roleData';

export default function PersonaScenarioScreen({ currentScenarioId, userPersonaChoices = {}, onSelectScenario, onPrev }) {
  const completedCount = Object.keys(userPersonaChoices).length;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          탐구할 일상·학습 상황을 골라주세요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          8가지 상황 중 궁금한 상황을 선택하면, 4색 AI 금쪽이가 각자 다른 방식으로 답변해 줍니다.
        </p>
      </div>

      {/* 수업 권장 안내 배너 */}
      <div 
        style={{
          backgroundColor: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: 'var(--font-size-sm)', color: '#1e40af', fontWeight: '500' }}>
          ⏱️ <strong>활동 안내:</strong> 다양한 상황 중 관심 있는 상황을 <strong>3개 이상</strong> 선택하여 4색 응답을 비교해 보세요.
        </span>
        <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '12px', backgroundColor: completedCount >= 3 ? '#ccfbf1' : '#dbeafe', color: completedCount >= 3 ? '#0f766e' : '#1e40af', fontWeight: 'bold' }}>
          완료 현황: {completedCount} / 3개 권장 (전체 8개)
        </span>
      </div>

      {/* 4색 페르소나 소개 바 */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '10px',
          marginBottom: '24px'
        }}
      >
        {aiPersonas.map(persona => (
          <div
            key={persona.id}
            style={{
              backgroundColor: persona.bgLight,
              border: `1.5px solid ${persona.border}`,
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '24px' }}>{persona.icon}</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '13px', color: persona.color }}>
                {persona.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {persona.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 8개 시나리오 카드 그리드 */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {roleScenarios.map(scenario => {
          const isSelected = scenario.id === currentScenarioId;
          const userChoice = userPersonaChoices[scenario.id];
          const isDone = Boolean(userChoice);

          return (
            <div
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className="card interactive-card"
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                border: isSelected 
                  ? '2px solid var(--color-primary)' 
                  : isDone 
                    ? '1.5px solid #99f6e4' 
                    : '1.5px solid var(--color-border)',
                backgroundColor: isSelected ? '#f0fdfa' : 'white',
                marginBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectScenario(scenario.id); }}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                    {scenario.category}
                  </span>
                  {isDone ? (
                    <span style={{ fontSize: '11px', backgroundColor: '#ccfbf1', color: 'var(--color-primary-hover)', padding: '2px 6px', borderRadius: '8px', fontWeight: 'bold' }}>
                      ✅ 완료됨
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      선택하기
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', margin: '4px 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{scenario.icon}</span> {scenario.situationTitle}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.5', fontStyle: 'italic' }}>
                  "{scenario.userPrompt}"
                </p>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', textAlign: 'right', fontSize: '12px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                4색 답변 비교하러 가기 →
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 처음으로
        </button>
        <div></div>
      </div>
    </div>
  );
}
