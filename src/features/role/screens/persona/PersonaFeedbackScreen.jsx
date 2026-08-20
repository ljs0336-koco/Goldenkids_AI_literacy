import React, { useState } from 'react';
import { roleScenarios } from '../../roleData';
import { getPersonaMatchAnalysis } from '../../roleEngine';
import geumjjokTouched from '../../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function PersonaFeedbackScreen({ scenarioId, userChoice, onChooseOtherScenario, onComplete }) {
  const [showPromptTip, setShowPromptTip] = useState(false);
  const scenario = roleScenarios.find(s => s.id === scenarioId) || roleScenarios[0];
  const analysis = getPersonaMatchAnalysis(scenario, userChoice);

  if (!analysis) return null;

  const { isPrimary, isSecondary, chosenPersona, primaryPersona, secondaryPersona, roleGuidance, pedagogicalTakeaway, cautionNotice } = analysis;

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 28px' }}>
      {/* 캐릭터 헤더 */}
      <div className="text-center mb-5">
        <img 
          src={chosenPersona.avatar || geumjjokTouched} 
          alt="선택한 금쪽이" 
          style={{ width: '68px', height: 'auto', marginBottom: '6px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '4px' }}>
          {chosenPersona.name}를 선택하셨네요!
        </h2>
        <span 
          style={{ 
            fontSize: '12.5px', 
            fontWeight: 'bold', 
            padding: '3px 12px', 
            borderRadius: '16px',
            backgroundColor: isPrimary ? '#ccfbf1' : isSecondary ? '#fef3c7' : '#dbeafe',
            color: isPrimary ? '#0f766e' : isSecondary ? '#b45309' : '#1e40af'
          }}
        >
          {isPrimary ? '🎯 상황에 딱 맞는 주 추천 역할!' : isSecondary ? '🤝 함께 쓰면 시너지가 나는 보조 역할!' : '💡 색다른 관점을 주는 역할!'}
        </span>
      </div>

      {/* 2단계 권장 역할 조합 카드 */}
      <div 
        style={{
          backgroundColor: '#f8fafc',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 18px',
          marginBottom: '16px'
        }}
      >
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '6px' }}>
          💡 권장되는 2단계 역할 조합
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', padding: '4px 10px', backgroundColor: primaryPersona.bgLight, color: primaryPersona.color, borderRadius: '8px', border: `1px solid ${primaryPersona.border}` }}>
            1단계: {primaryPersona.icon} {primaryPersona.name} (주 역할)
          </span>
          <span style={{ color: '#94a3b8' }}>➔</span>
          <span style={{ fontSize: '13px', fontWeight: 'bold', padding: '4px 10px', backgroundColor: secondaryPersona.bgLight, color: secondaryPersona.color, borderRadius: '8px', border: `1px solid ${secondaryPersona.border}` }}>
            2단계: {secondaryPersona.icon} {secondaryPersona.name} (보조 역할)
          </span>
        </div>
        <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: '1.5' }}>
          {roleGuidance}
        </p>
      </div>

      {/* 배운 점 1줄 요약 */}
      <div 
        style={{ 
          backgroundColor: '#f0fdfa', 
          border: '1px solid #99f6e4', 
          borderRadius: 'var(--radius-md)', 
          padding: '12px 16px', 
          fontSize: '13px', 
          color: '#0f766e', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '18px' }}>🎓</span>
        <div><strong>배운 점:</strong> {pedagogicalTakeaway}</div>
      </div>

      {/* 말풍선 토글 버튼들: 프롬프트 팁 & 안전 주의사항 */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setShowPromptTip(!showPromptTip)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            border: showPromptTip ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
            backgroundColor: showPromptTip ? '#f0fdfa' : 'white',
            color: showPromptTip ? 'var(--color-primary-hover)' : 'var(--color-text-main)',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>✨</span> {showPromptTip ? '프롬프트 꿀팁 닫기' : '실전 프롬프트 꿀팁 보기'}
        </button>
      </div>

      {/* 팝오버 프롬프트 꿀팁 말풍선 */}
      {showPromptTip && (
        <div 
          style={{ 
            backgroundColor: '#f8fafc', 
            padding: '14px 16px', 
            borderRadius: 'var(--radius-md)', 
            border: '1.5px solid var(--color-border)', 
            marginBottom: '16px',
            fontSize: '12.5px',
            lineHeight: '1.6',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{ fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '6px' }}>
            💬 AI에게 역할을 지정하는 마법의 프롬프트:
          </div>
          <div style={{ backgroundColor: 'white', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '6px' }}>
            <strong>• 코치 요청:</strong> "정답을 바로 주지 말고, 내가 스스로 생각할 수 있게 단계별 유도 질문을 해줘."
          </div>
          <div style={{ backgroundColor: 'white', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <strong>• 비판자 요청:</strong> "내 생각의 허점이나 다른 사람이 반박할 수 있는 약점을 날카롭게 짚어줘."
          </div>
        </div>
      )}

      {/* 안전 경계 안내 (컴팩트) */}
      {cautionNotice && (
        <div 
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde047',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            marginBottom: '20px',
            color: '#92400e',
            fontSize: '12px',
            lineHeight: '1.5'
          }}
        >
          {cautionNotice}
        </div>
      )}

      {/* 하단 버튼 바 */}
      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onChooseOtherScenario}>
          🔄 다른 상황 더 탐구하기
        </button>
        <button 
          className="btn-primary" 
          onClick={onComplete}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          🎉 페르소나 탐구 마무리하기 →
        </button>
      </div>
    </div>
  );
}
