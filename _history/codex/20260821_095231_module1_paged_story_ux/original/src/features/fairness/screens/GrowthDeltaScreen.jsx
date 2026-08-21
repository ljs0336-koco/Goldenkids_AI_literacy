import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent,
  activityRecommendationSupplementRecords
} from '../fairnessData';
import { getTopActivityRecommendation, rankActivityRecommendations } from '../fairnessEngine';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';
import ConceptBridge from '../components/ConceptBridge';

export default function GrowthDeltaScreen({ onNext, onPrev }) {
  const allRecords = [...activityRecommendationInitialRecords, ...activityRecommendationSupplementRecords];
  const firstRanking = rankActivityRecommendations(activityRecommendationInitialRecords, activityRecommendationOptions);
  const fullRanking = rankActivityRecommendations(allRecords, activityRecommendationOptions);
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);
  const updatedRecommendation = getTopActivityRecommendation(allRecords, activityRecommendationOptions);

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokTouched} 
          alt="감동한 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          데이터 범위를 넓히자 추천이 달라졌어요!
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          추천 규칙은 그대로 두고, 처음에 빠졌던 기록을 추가해 {activityRecommendationStudent.name}의 활동 추천을 다시 계산했어요.
        </p>
      </div>

      {/* 처음 추천 vs 다시 추천 1:1 비교 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* 처음 추천 (온라인 기록만) */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: '#efede5', color: '#68706b', padding: '3px 8px', borderRadius: '10px' }}>
            처음 추천: 온라인 기록 {activityRecommendationInitialRecords.length}개만 사용
          </span>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', margin: '12px 0 6px 0' }}>
            {firstRecommendation.name}
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            관심 단서 점수: <strong>{firstRecommendation.score}점</strong> (1위)
          </p>
          <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', color: '#475569' }}>
            빠진 정보: <strong>오프라인 활동·학생 관심</strong>
          </div>
        </div>

        {/* 다시 추천 (누락 기록까지 함께 사용) */}
        <div style={{ backgroundColor: '#edf2ee', padding: '20px', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: '#e9f0ec', color: 'var(--color-primary-hover)', padding: '3px 8px', borderRadius: '10px' }}>
            🔄 다시 추천: 전체 기록 {allRecords.length}개 사용
          </span>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-primary-hover)', margin: '12px 0 6px 0' }}>
            {updatedRecommendation.name}
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            관심 단서 점수: <strong>{updatedRecommendation.score}점</strong> (1위)
          </p>
          <div style={{ padding: '8px', backgroundColor: '#dce9e3', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-hover)', fontWeight: 'bold' }}>
            추가한 정보: <strong>오프라인 활동·학생 관심</strong>
          </div>
        </div>
      </div>

      {/* 4개 활동의 추천 단서 점수 변화 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-secondary)' }}>
        📊 활동별 관심 단서 점수 비교
      </h3>
      <div className="flex flex-col gap-3 mb-6">
        {activityRecommendationOptions.map(option => {
          const first = firstRanking.find(item => item.key === option.key);
          const updated = fullRanking.find(item => item.key === option.key);
          const scoreDelta = updated.score - first.score;
          const isRecommended = option.key === updatedRecommendation.key;

          return (
            <div 
              key={option.key}
              style={{
              backgroundColor: isRecommended ? '#edf2ee' : 'white',
                border: isRecommended ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                padding: '16px',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', color: isRecommended ? 'var(--color-primary-hover)' : 'inherit' }}>
                    {option.name}
                  </span>
                  {isRecommended && (
                    <span style={{ fontSize: '14px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '2px 7px', borderRadius: '10px', fontWeight: 'bold' }}>
                      다시 추천
                    </span>
                  )}
                </div>
                <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)', color: isRecommended ? 'var(--color-primary-hover)' : '#0284c7' }}>
                  {first.score}점 → {updated.score}점 (+{scoreDelta})
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{option.desc}</p>
            </div>
          );
        })}
      </div>

      {/* 교육적 핵심 메시지 */}
      <div className="p-4 mb-6" style={{ backgroundColor: '#edf2ee', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-primary)', color: 'var(--color-primary-hover)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
        💡 <strong>핵심 발견:</strong> AI가 같은 추천 규칙을 사용해도 어떤 데이터가 기록되거나 누락되었는지에 따라 결과가 달라질 수 있어요. 더 많은 데이터를 넣었다고 새 추천이 정답이 되는 것은 아니므로 사람이 맥락과 학생의 선택을 함께 확인해야 해요.
      </div>

      <ConceptBridge>
        AI의 추천은 고정된 진실이 아니라, AI가 볼 수 있었던 데이터와 사람이 정한 계산 방식에서 나온 결과예요. 그래서 추천을 받을 때는 “무엇을 보았고 무엇이 빠졌지?”라고 확인해야 해요.
      </ConceptBridge>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          🔍 사람이 최종 선택을 확인하러 가기 →
        </button>
      </div>
    </div>
  );
}
