import React from 'react';
import { getMissionById } from '../../agentEngine';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function MissionSummaryScreen({ missionId, decision, onReset, onBackToActivities }) {
  const mission = getMissionById(missionId);

  return (
    <div className="card text-center" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <img 
        src={geumjjokCelebration} 
        alt="축하하는 금쪽이" 
        style={{ width: '84px', height: 'auto', marginBottom: '10px' }} 
      />
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px' }}>
        에이전트 미션 실행 완료! 🤖🎉
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '20px' }}>
        인간의 올바른 통제와 승인 하에 미션이 안전하게 마무리되었습니다.
      </p>

      {/* 미션 결과 요약 카드 */}
      <div 
        style={{
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-border)',
          padding: '16px 20px',
          textAlign: 'left',
          marginBottom: '20px'
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <strong>미션: {mission.title}</strong>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: decision === 'approve' ? '#059669' : '#dc2626' }}>
            {decision === 'approve' ? '✅ 사람 승인 후 실행됨' : '❌ 사람 반려로 안전 중단됨'}
          </span>
        </div>
        <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
          🎓 <strong>배운 점:</strong> {mission.takeaway}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          type="button"
          className="btn-outline" 
          onClick={onReset}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🔄 다른 미션 실행해보기
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
