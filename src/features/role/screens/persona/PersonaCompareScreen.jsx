import React, { useState } from 'react';
import { roleScenarios, aiPersonas } from '../../roleData';

export default function PersonaCompareScreen({ scenarioId, userChoice, onChoosePersona, onNext, onPrev }) {
  const scenario = roleScenarios.find(s => s.id === scenarioId) || roleScenarios[0];
  const [selectedPersonaId, setSelectedPersonaId] = useState(userChoice || null);

  const handleSelect = (pId) => {
    setSelectedPersonaId(pId);
    if (onChoosePersona) {
      onChoosePersona(scenario.id, pId);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          4색 AI 금쪽이의 실시간 응답을 비교해요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          같은 질문에 대해 4가지 역할의 AI 금쪽이가 어떻게 다르게 대답하는지 읽어보고, 가장 적절한 역할을 골라보세요.
        </p>
      </div>

      {/* 상황 및 학생 질문 말풍선 */}
      <div 
        style={{
          backgroundColor: '#f8fafc',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '24px'
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            📍 상황: {scenario.category} · {scenario.situationTitle}
          </span>
          <span style={{ fontSize: '20px' }}>{scenario.icon}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>🙋</div>
          <div 
            style={{
              backgroundColor: 'white',
              border: '1px solid #cbd5e1',
              borderRadius: '0 16px 16px 16px',
              padding: '12px 18px',
              fontSize: 'var(--font-size-base)',
              fontWeight: '600',
              color: '#1e293b',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            "{scenario.userPrompt}"
          </div>
        </div>
      </div>

      {/* 4색 AI 금쪽이 응답 카드 목록 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '14px', color: 'var(--color-secondary)' }}>
        💬 4색 AI 금쪽이의 응답 비교 (하나를 선택해 주세요)
      </h3>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {aiPersonas.map(persona => {
          const responseText = scenario.responses[persona.id];
          const isSelected = selectedPersonaId === persona.id;

          return (
            <div
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              className="card interactive-card"
              style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? `2.5px solid ${persona.color}` : `1.5px solid ${persona.border}`,
                backgroundColor: isSelected ? persona.bgLight : 'white',
                marginBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'var(--shadow-sm)'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(persona.id); }}
              aria-pressed={isSelected}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={persona.avatar} 
                      alt={persona.name} 
                      style={{ width: '36px', height: 'auto' }} 
                    />
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '15px', color: persona.color }}>
                        {persona.icon} {persona.name}
                      </span>
                    </div>
                  </div>

                  <span 
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? persona.color : '#f1f5f9',
                      color: isSelected ? 'white' : '#64748b'
                    }}
                  >
                    {isSelected ? '✅ 선택됨' : '선택'}
                  </span>
                </div>

                <div 
                  style={{
                    backgroundColor: 'white',
                    border: `1px solid ${isSelected ? persona.border : '#e2e8f0'}`,
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontSize: '13.5px',
                    lineHeight: '1.6',
                    color: '#334155'
                  }}
                >
                  {responseText}
                </div>
              </div>

              <div style={{ marginTop: '10px', fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                💡 <strong>특징:</strong> {persona.tone}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 다른 상황 고르기
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!selectedPersonaId}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {selectedPersonaId ? "💡 피드백 & 교육적 교훈 보기 →" : "가장 마음에 드는 AI 역할을 골라주세요"}
        </button>
      </div>
    </div>
  );
}
