import React from 'react';
import {
  activityRecommendationOptions,
  activityRecommendationStudent,
  activityRecommendationSupplementRecords
} from '../fairnessData';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

export default function GrowthSupplementScreen({ viewedStudentIds = [], onStudentViewed, onNext, onPrev }) {
  const allViewed = activityRecommendationSupplementRecords.every(record => viewedStudentIds.includes(record.id));

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
          처음에는 빠져 있던 기록을 찾았어요!
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          {activityRecommendationStudent.name}의 <strong>오프라인 활동</strong>과 <strong>직접 표현한 관심</strong> 기록을 모두 확인해 주세요.
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
        🧠 <strong>추천 규칙은 그대로:</strong> AI는 각 기록에서 활동과 관련된 관심 단서를 찾아 합산해요. 이번에는 추천 규칙을 바꾸지 않고 <strong>데이터의 범위만 넓혀</strong> 다시 비교합니다.
      </div>

      {/* 누락되었던 기록 카드 */}
      <div className="flex flex-col gap-3 mb-6">
        {activityRecommendationSupplementRecords.map(record => {
          const isViewed = viewedStudentIds.includes(record.id);
          const relatedOptions = activityRecommendationOptions.filter(option => record.signals[option.key] > 0);

          return (
            <div
              key={record.id}
              onClick={() => handleCardClick(record.id)}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(record.id);
                }
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)' }}>
                    📌 {record.source}
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

              <div style={{ backgroundColor: 'white', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0', fontSize: 'var(--font-size-sm)' }}>
                <div style={{ color: '#0f766e', fontWeight: 'bold', marginBottom: '5px' }}>{record.title}</div>
                <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{record.desc}</div>
                <div className="flex gap-2 mt-3" style={{ flexWrap: 'wrap' }}>
                  {relatedOptions.map(option => (
                    <span key={option.key} style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '600' }}>
                      {option.shortName} 단서 +{record.signals[option.key]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: allViewed ? 'var(--color-primary)' : 'var(--color-warning)' }}>
        기록 확인 현황: {activityRecommendationSupplementRecords.filter(record => viewedStudentIds.includes(record.id)).length} / {activityRecommendationSupplementRecords.length}개
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
          {allViewed ? "📊 같은 규칙으로 추천 다시 계산하기 →" : "빠진 기록 3개를 모두 확인해 주세요"}
        </button>
      </div>
    </div>
  );
}
