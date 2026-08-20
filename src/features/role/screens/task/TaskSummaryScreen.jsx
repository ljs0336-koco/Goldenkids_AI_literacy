import React from 'react';
import { calculateTaskDistribution } from '../../roleEngine';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function TaskSummaryScreen({ taskClassifications = {}, selectedPrinciples = [], onReset, onBackToActivities }) {
  const dist = calculateTaskDistribution(taskClassifications);

  return (
    <div className="card text-center" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <img 
        src={geumjjokCelebration} 
        alt="축하하는 금쪽이" 
        style={{ width: '84px', height: 'auto', marginBottom: '12px' }} 
      />
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
        미래 업무 3구역 공존 설계도 완성!
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', marginBottom: '24px' }}>
        AI와 인간이 각자의 장점을 살려 아름답게 협력하는 미래 청사진을 완성했어요.
      </p>

      {/* 나의 3구역 설계 요약 */}
      <div className="mb-6 p-5" style={{ backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-primary)', textAlign: 'left' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-primary-hover)', marginBottom: '12px' }}>
          🧩 나의 미래 업무 분담 청사진 (12개 업무)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #ccfbf1' }}>
            <div style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: 'bold' }}>🤖 AI 주로 수행</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', marginTop: '2px' }}>{dist.counts.ai_auto}개 ({dist.percentages.ai_auto}%)</div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #ccfbf1' }}>
            <div style={{ fontSize: '12px', color: '#0f766e', fontWeight: 'bold' }}>🤝 인간과 AI 협업</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary-hover)', marginTop: '2px' }}>{dist.counts.collaboration}개 ({dist.percentages.collaboration}%)</div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #ccfbf1' }}>
            <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: 'bold' }}>👤 인간 최종 결정</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6d28d9', marginTop: '2px' }}>{dist.counts.human_lead}개 ({dist.percentages.human_lead}%)</div>
          </div>
        </div>
      </div>

      {/* 내가 선정한 공존 원칙 */}
      <div className="mb-8 p-5" style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', textAlign: 'left' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '10px', color: 'var(--color-secondary)' }}>
          📜 우리가 함께 지켜나갈 공존 서약
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8', fontSize: 'var(--font-size-sm)' }}>
          {selectedPrinciples.map((p, idx) => (
            <li key={idx} className="mb-1">
              ✅ <strong>{p}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          type="button"
          className="btn-outline" 
          onClick={onReset}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🔄 이 활동 다시 하기
        </button>
        <button 
          type="button"
          className="btn-primary" 
          onClick={onBackToActivities}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🏠 다른 실험 하러 가기
        </button>
      </div>
    </div>
  );
}
