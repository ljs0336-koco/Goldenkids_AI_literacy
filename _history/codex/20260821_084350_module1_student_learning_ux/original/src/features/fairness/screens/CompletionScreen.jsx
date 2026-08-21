import React from 'react';
import geumjjokCelebration from '../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function CompletionScreen({ mode, onReset, onBackToActivities }) {
  const isGrowth = mode === 'growth';

  return (
    <div className="card text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <img 
        src={geumjjokCelebration} 
        alt="축하하는 금쪽이" 
        style={{ width: '84px', height: 'auto', marginBottom: '12px' }} 
      />
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
        {isGrowth 
          ? "AI 금쪽이 활동 추천 데이터 탐구 완료" 
          : "프로젝트 대표팀 공정성 탐구 완료"}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', marginBottom: '24px' }}>
        AI와 함께 실험하며 배운 핵심 내용을 기억해 보세요.
      </p>
      
      <div className="mb-8 p-6" style={{ backgroundColor: '#f0fdfa', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-primary)' }}>
        <h3 style={{ color: 'var(--color-primary-hover)', fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '16px' }}>
          💡 우리가 배운 점
        </h3>
        {isGrowth ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', lineHeight: '1.8', fontSize: 'var(--font-size-base)' }}>
            <li className="mb-2">✅ <strong>AI는 기록된 데이터에서 찾은 패턴을 바탕으로 활동을 추천해요.</strong></li>
            <li className="mb-2">✅ <strong>온라인·오프라인 기록과 학생 관심의 누락 여부에 따라 추천 결과가 달라질 수 있어요.</strong></li>
            <li>✅ <strong>AI 추천은 선택을 돕는 참고 자료이며 학생과 교사가 맥락을 확인하고 최종 선택해요.</strong></li>
          </ul>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', lineHeight: '1.8', fontSize: 'var(--font-size-base)' }}>
            <li className="mb-2">✅ <strong>개인의 특정 점수뿐 아니라 팀에 필요한 다양한 역할의 균형을 고려해야 해요.</strong></li>
            <li className="mb-2">✅ <strong>어떤 가치와 기준을 설정하느냐에 따라 AI의 대표팀 추천 구성이 달라져요.</strong></li>
            <li>✅ <strong>데이터 오류가 발생했을 때는 명단 변화와 관계없이 사실대로 바로잡는 절차가 필수적이에요.</strong></li>
          </ul>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6" style={{ flexWrap: 'wrap' }}>
        <button 
          type="button"
          className="btn-outline" 
          onClick={onReset}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🔄 이 실험 처음부터 다시
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
