import React, { useState } from 'react';
import { calculateTaskDistribution, evaluateTaskClassifications } from '../../roleEngine';
import { rolePrinciples } from '../../roleData';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function TaskAnalysisScreen({ taskClassifications = {}, selectedPrinciples = [], onSelectPrinciples, onNext, onPrev }) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const dist = calculateTaskDistribution(taskClassifications);
  const evalResult = evaluateTaskClassifications(taskClassifications);

  const handleTogglePrinciple = (principleText) => {
    const current = selectedPrinciples || [];
    const updated = current.includes(principleText)
      ? current.filter(p => p !== principleText)
      : [...current, principleText];

    if (onSelectPrinciples) {
      onSelectPrinciples(updated);
    }
  };

  const isReady = (selectedPrinciples || []).length >= 2;

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* 타이틀 */}
      <div className="text-center mb-5">
        <img 
          src={geumjjokDoctor} 
          alt="박사 금쪽이" 
          style={{ width: '56px', height: 'auto', marginBottom: '6px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px' }}>
          미래 업무 분류 결과와 인간의 고유 가치
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          우리가 분류한 12개 업무의 분포를 살펴보고, AI와 공존하기 위한 약속을 정해요.
        </p>
      </div>

      {/* 3구역 분포 요약 카드 (컴팩트 & 직관적) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
          marginBottom: '22px'
        }}
      >
        <div style={{ backgroundColor: '#eff6ff', padding: '16px 14px', borderRadius: '14px', border: '2px solid #bfdbfe', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '4px' }}>🤖</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1d4ed8' }}>AI 주로 수행</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e3a8a', margin: '4px 0' }}>
            {dist.counts.ai_auto}개 <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#64748b' }}>({dist.percentages.ai_auto}%)</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#f0fdfa', padding: '16px 14px', borderRadius: '14px', border: '2px solid #99f6e4', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '4px' }}>🤝</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-primary-hover)' }}>인간-AI 협업</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary-hover)', margin: '4px 0' }}>
            {dist.counts.collaboration}개 <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#64748b' }}>({dist.percentages.collaboration}%)</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#faf5ff', padding: '16px 14px', borderRadius: '14px', border: '2px solid #e9d5ff', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '4px' }}>👤</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#7c3aed' }}>인간 최종 결정</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#6d28d9', margin: '4px 0' }}>
            {dist.counts.human_lead}개 <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#64748b' }}>({dist.percentages.human_lead}%)</span>
          </div>
        </div>
      </div>

      {/* 12개 업무 컴팩트 리스트 (클릭 시 말풍선 해설 토글) */}
      <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1.5px solid var(--color-border)', padding: '18px 20px', marginBottom: '22px' }}>
        <div className="flex justify-between items-center mb-3">
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--color-secondary)', margin: 0 }}>
            📋 12개 업무별 분류 및 이유
          </h3>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: '500' }}>
            💡 항목을 클릭하면 추천 이유가 말풍선으로 나타나요
          </span>
        </div>

        <div className="flex flex-col gap-2.5" style={{ maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
          {evalResult.items.map(item => {
            const isExpanded = expandedTaskId === item.taskId;
            const zoneText = item.userZone === 'ai_auto' ? '🤖 AI 주로' : item.userZone === 'collaboration' ? '🤝 협업' : '👤 사람 결정';
            const recText = item.recommendedZone === 'ai_auto' ? '🤖 AI 주로' : item.recommendedZone === 'collaboration' ? '🤝 협업' : '👤 사람 결정';

            return (
              <div 
                key={item.taskId}
                onClick={() => setExpandedTaskId(isExpanded ? null : item.taskId)}
                style={{
                  border: isExpanded ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                  borderRadius: '10px',
                  backgroundColor: isExpanded ? '#f0fdfa' : '#fafafa',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <strong style={{ fontSize: '15px', color: 'var(--color-text-main)' }}>{item.title}</strong>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>({item.category})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '12.5px', padding: '3px 10px', borderRadius: '10px', backgroundColor: '#f1f5f9', fontWeight: 'bold', color: '#475569' }}>
                      내 선택: {zoneText}
                    </span>
                    <span style={{ fontSize: '12.5px', padding: '3px 10px', borderRadius: '10px', backgroundColor: '#e0f2fe', fontWeight: 'bold', color: '#0369a1' }}>
                      권장: {recText}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                      {isExpanded ? '▲' : '💬 이유'}
                    </span>
                  </div>
                </div>

                {/* 팝오버 말풍선 해설 */}
                {isExpanded && (
                  <div 
                    style={{
                      marginTop: '10px',
                      paddingTop: '10px',
                      borderTop: '1px solid #ccfbf1',
                      fontSize: '14px',
                      color: '#0f766e',
                      lineHeight: '1.6',
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                  >
                    💡 <strong>권장 이유:</strong> {item.rationale}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI에게 넘길 수 없는 인간만의 3대 고유 가치 성찰 박스 */}
      <div 
        style={{
          backgroundColor: '#fffbeb',
          border: '2px solid #fde047',
          borderRadius: '14px',
          padding: '18px 20px',
          marginBottom: '22px'
        }}
      >
        <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#b45309', marginBottom: '12px' }}>
          🌟 AI에게 넘길 수 없는 인간만의 3가지 고유 가치
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '14px', color: '#92400e' }}>
          <div style={{ backgroundColor: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #fef08a' }}>
            <strong style={{ fontSize: '15px' }}>1. 진정한 공감</strong>
            <p style={{ margin: '6px 0 0 0', lineHeight: '1.5', color: '#78350f', fontSize: '13.5px' }}>사람 대 사람으로 마음을 나누는 따뜻한 소통과 위로</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #fef08a' }}>
            <strong style={{ fontSize: '15px' }}>2. 가치 판단과 책임</strong>
            <p style={{ margin: '6px 0 0 0', lineHeight: '1.5', color: '#78350f', fontSize: '13.5px' }}>생명, 법률, 도덕 등 삶에 영향을 주는 결정에 대한 윤리적 책임</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '14px', borderRadius: '10px', border: '1px solid #fef08a' }}>
            <strong style={{ fontSize: '15px' }}>3. 고유한 창의성</strong>
            <p style={{ margin: '6px 0 0 0', lineHeight: '1.5', color: '#78350f', fontSize: '13.5px' }}>통계를 넘어선 개인의 삶의 경험과 예술적 감수성</p>
          </div>
        </div>
      </div>

      {/* 우리가 지킬 AI 공존 원칙 선택 (체크리스트) */}
      <div style={{ backgroundColor: '#f8fafc', padding: '18px 20px', borderRadius: '14px', border: '1.5px solid var(--color-border)', marginBottom: '22px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '12px', color: 'var(--color-secondary)' }}>
          📜 우리가 지켜야 할 AI 공존 원칙을 골라주세요 (최소 2개)
        </h3>

        <div className="flex flex-col gap-2.5">
          {rolePrinciples.map((p, idx) => {
            const isChecked = (selectedPrinciples || []).includes(p);
            return (
              <div
                key={idx}
                onClick={() => handleTogglePrinciple(p)}
                style={{
                  backgroundColor: isChecked ? '#f0fdfa' : 'white',
                  border: isChecked ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  transition: 'all 0.15s ease'
                }}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTogglePrinciple(p); }}
              >
                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={() => {}} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }} 
                />
                <span style={{ fontWeight: isChecked ? '700' : '500', color: isChecked ? 'var(--color-primary-hover)' : 'inherit' }}>
                  {p}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 내비게이션 바 */}
      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 다시 분류하기
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!isReady}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}
        >
          {isReady ? "🎉 공존 설계도 완성하기 →" : "공존 원칙을 2개 이상 선택해 주세요"}
        </button>
      </div>
    </div>
  );
}
