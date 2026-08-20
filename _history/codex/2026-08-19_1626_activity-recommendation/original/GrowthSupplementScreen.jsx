import React from 'react';
import { growthAwardCandidates } from '../fairnessData';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

export default function GrowthSupplementScreen({ viewedStudentIds = [], onStudentViewed, onNext, onPrev }) {
  const allViewed = growthAwardCandidates.every(s => viewedStudentIds.includes(s.id));

  const handleCardClick = (id) => {
    if (onStudentViewed) {
      onStudentViewed(id);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokIdea} 
          alt="아이디어 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          누락되었던 3월 시작 기록을 찾았어요!
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          학생 6명의 <strong>3월 시작 기록</strong>과 <strong>12월 마지막 기록</strong>을 모두 확인해 주세요.
        </p>
      </div>

      {/* 동일 기준 측정 안내 배너 */}
      <div 
        style={{
          backgroundColor: '#f0fdfa',
          border: '1.5px solid var(--color-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
          color: 'var(--color-primary-hover)',
          fontSize: 'var(--font-size-sm)',
          lineHeight: '1.6'
        }}
      >
        📏 <strong>측정 기준 안내:</strong> 3월과 12월의 모든 점수는 동일한 평가 기준과 같은 <strong>100점 척도</strong>로 측정된 신뢰할 수 있는 기록입니다.
      </div>

      {/* 6명 학생 기록 카드 */}
      <div className="flex flex-col gap-3 mb-6">
        {growthAwardCandidates.map(student => {
          const isViewed = viewedStudentIds.includes(student.id);

          return (
            <div
              key={student.id}
              onClick={() => handleCardClick(student.id)}
              className="card interactive-card"
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                border: isViewed ? '1.5px solid var(--color-primary)' : '1.5px dashed var(--color-border)',
                backgroundColor: isViewed ? '#f0fdfa' : 'white',
                marginBottom: 0,
                cursor: 'pointer'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(student.id); }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)' }}>
                    👤 {student.name} 학생의 1년 기록
                  </span>
                </div>
                <span 
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    backgroundColor: isViewed ? '#ccfbf1' : '#f1f5f9',
                    color: isViewed ? 'var(--color-primary-hover)' : 'var(--color-text-muted)'
                  }}
                >
                  {isViewed ? '✅ 확인 완료' : '확인하기 (클릭)'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: 'var(--font-size-sm)' }}>
                <div style={{ backgroundColor: 'white', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#64748b', fontWeight: 'bold', marginBottom: '4px' }}>🌱 3월 시작 기록</div>
                  <div>• 디지털 도구: {student.march.digitalToolUse}점</div>
                  <div>• 문제해결: {student.march.problemSolving}점</div>
                  <div>• 의사소통·협력: {student.march.communicationCollaboration}점</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#0f766e', fontWeight: 'bold', marginBottom: '4px' }}>📅 12월 마지막 기록</div>
                  <div>• 디지털 도구: {student.december.digitalToolUse}점</div>
                  <div>• 문제해결: {student.december.problemSolving}점</div>
                  <div>• 의사소통·협력: {student.december.communicationCollaboration}점</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: allViewed ? 'var(--color-primary)' : 'var(--color-warning)' }}>
        기록 확인 현황: {viewedStudentIds.length} / {growthAwardCandidates.length}명
      </div>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!allViewed}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {allViewed ? "📈 1년간 변화 계산하기 →" : "6명의 기록을 모두 확인해 주세요"}
        </button>
      </div>
    </div>
  );
}
