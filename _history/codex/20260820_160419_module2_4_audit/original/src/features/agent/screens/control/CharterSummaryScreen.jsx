import React from 'react';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function CharterSummaryScreen({ onReset, onBackToActivities }) {
  return (
    <div className="card text-center" style={{ maxWidth: '780px', margin: '0 auto', padding: '28px' }}>
      <img 
        src={geumjjokCelebration} 
        alt="축하하는 금쪽이" 
        style={{ width: '84px', height: 'auto', marginBottom: '10px' }} 
      />
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '6px' }}>
        AI 에이전트 안전 사령관 임명장 🎖️
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '24px' }}>
        축하합니다! 당신은 자율 AI 에이전트를 안전하고 책임감 있게 통제하는 최고 사령관으로 임명되었습니다.
      </p>

      {/* 헌장 내용 박스 */}
      <div 
        style={{
          backgroundColor: '#f0fdfa',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--color-primary)',
          padding: '20px 24px',
          textAlign: 'left',
          marginBottom: '24px'
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--color-primary-hover)', marginBottom: '12px', textAlign: 'center' }}>
          📜 우리가 지켜야 할 [AI 에이전트 4대 안전 헌장]
        </h3>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: '1.8', color: '#1e293b' }}>
          <li>🛡️ <strong>1. 최소 권한의 원칙:</strong> 에이전트에게 필요한 최소한의 도구와 권한만 부여한다.</li>
          <li>⏳ <strong>2. 자원 한도 설정:</strong> 무한 루프와 과도한 비용 낭비를 막기 위해 실행 한도를 설정한다.</li>
          <li>👤 <strong>3. 인간 개입의 필수화:</strong> 결제·외부 발송·물리 제어 등 위험한 행동은 인간의 승인을 거친다.</li>
          <li>🚨 <strong>4. 비상 정지권 보장:</strong> 오작동 시 언제든 시스템을 즉각 차단할 수 있는 킬스위치를 확보한다.</li>
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          type="button"
          className="btn-outline" 
          onClick={onReset}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🔄 안전 통제 다시 해보기
        </button>
        <button 
          type="button"
          className="btn-primary" 
          onClick={onBackToActivities}
          style={{ minHeight: '48px', fontSize: 'var(--font-size-base)' }}
        >
          🏠 메인 홈으로 가기
        </button>
      </div>
    </div>
  );
}
