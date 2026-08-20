import React from 'react';
import { roleScenarios, aiPersonas } from '../../roleData';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function PersonaSummaryScreen({ userPersonaChoices = {}, onReset, onBackToActivities }) {
  const completedCount = Object.keys(userPersonaChoices).length;

  return (
    <div className="card text-center" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <img 
        src={geumjjokCelebration} 
        alt="축하하는 금쪽이" 
        style={{ width: '84px', height: 'auto', marginBottom: '12px' }} 
      />
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
        4색 AI 페르소나 매칭 탐구 완료!
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', marginBottom: '24px' }}>
        상황에 맞는 똑똑한 AI 역할 선택법을 성공적으로 마쳤어요.
      </p>

      {/* 탐구 기록 요약 */}
      <div className="mb-6 p-5" style={{ backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-primary)', textAlign: 'left' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-primary-hover)', marginBottom: '12px' }}>
          📊 나의 페르소나 매칭 현황 ({completedCount}개 상황 완료)
        </h3>

        <div className="flex flex-col gap-2">
          {Object.entries(userPersonaChoices).map(([sId, pId]) => {
            const scenario = roleScenarios.find(s => s.id === sId);
            const persona = aiPersonas.find(p => p.id === pId);
            if (!scenario || !persona) return null;

            return (
              <div 
                key={sId} 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '10px 14px', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid #ccfbf1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                <div>
                  <span>{scenario.icon} <strong>{scenario.situationTitle}</strong></span>
                </div>
                <span style={{ fontWeight: 'bold', color: persona.color }}>
                  {persona.icon} {persona.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 핵심 정리 */}
      <div className="mb-8 p-5" style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', textAlign: 'left' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '10px', color: 'var(--color-secondary)' }}>
          💡 꼭 기억해야 할 4색 AI 활용 원칙
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8', fontSize: 'var(--font-size-sm)' }}>
          <li>💙 <strong>친구형:</strong> 감정이 상하거나 마음의 지지가 필요할 때 따뜻한 위로를 받아요.</li>
          <li>🏃 <strong>코치형:</strong> 숙제나 창작 과제를 할 때 스스로 생각하는 힘을 기를 수 있어요.</li>
          <li>🎓 <strong>박사형:</strong> 과학 개념, 역사적 사실 등 객관적이고 체계적인 지식이 필요할 때 써요.</li>
          <li>🔍 <strong>비판자형:</strong> 토론이나 발표 준비 시 내 주장의 허점과 반대 의견을 대비할 때 최고예요.</li>
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          type="button"
          className="btn-outline" 
          onClick={onReset}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🔄 다른 상황 다시 해보기
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
