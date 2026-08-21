import React, { useState } from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationSupplementRecords
} from '../fairnessData';
import { getTopActivityRecommendation, rankActivityRecommendations } from '../fairnessEngine';
import PageTurnNav from '../components/PageTurnNav';
import ConceptBridge from '../components/ConceptBridge';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function GrowthDeltaScreen({ onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const allRecords = [...activityRecommendationInitialRecords, ...activityRecommendationSupplementRecords];
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);
  const updatedRecommendation = getTopActivityRecommendation(allRecords, activityRecommendationOptions);
  const firstRanking = rankActivityRecommendations(activityRecommendationInitialRecords, activityRecommendationOptions);
  const fullRanking = rankActivityRecommendations(allRecords, activityRecommendationOptions);
  const isBefore = pageIndex === 0;
  const recommendation = isBefore ? firstRecommendation : updatedRecommendation;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokTouched} alt="생각하는 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <span className="fair-eyebrow">추천 전후 비교</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '5px 0 8px' }}>
          {isBefore ? '처음 받은 추천' : '빠진 기록을 더한 뒤의 추천'}
        </h2>
      </div>

      <section className={`fair-record-page ${isBefore ? '' : 'is-viewed'}`} style={{ textAlign: 'center' }}>
        <small>{isBefore ? '온라인 기록 3개만 사용' : '온라인·오프라인·관심 기록 6개 사용'}</small>
        <h3 style={{ fontSize: '30px' }}>{recommendation.name}</h3>
        <p>관심 단서 {recommendation.score}점 · 현재 1위</p>
        <p className="fair-story-conclusion" style={{ marginTop: '18px' }}>
          {isBefore
            ? 'AI가 본 정보가 적을 때는 코딩 단서가 가장 크게 보였어요.'
            : '교실 활동과 직접 표현한 관심을 더하자 과학 단서가 가장 크게 보였어요.'}
        </p>
      </section>

      <PageTurnNav
        current={pageIndex}
        total={2}
        onPrev={() => setPageIndex(0)}
        onNext={() => setPageIndex(1)}
        prevLabel="처음 추천"
        nextLabel="다시 추천"
      />

      {!isBefore && (
        <>
          <details className="fair-inline-details">
            <summary>네 활동의 점수가 어떻게 달라졌는지 보기</summary>
            <div className="flex flex-col gap-2">
              {activityRecommendationOptions.map(option => {
                const first = firstRanking.find(item => item.key === option.key);
                const updated = fullRanking.find(item => item.key === option.key);
                return <span key={option.key}>{option.shortName}: {first.score}점 → {updated.score}점</span>;
              })}
            </div>
          </details>
          <ConceptBridge>
            AI의 추천은 고정된 정답이 아니에요. AI가 볼 수 있었던 데이터가 달라지면 같은 계산 방식도 다른 답을 만들 수 있어요.
          </ConceptBridge>
        </>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={isBefore} style={{ minHeight: '52px' }}>
          {isBefore ? '다시 추천 장을 먼저 확인해 주세요' : '내가 마지막으로 판단하기 →'}
        </button>
      </div>
    </div>
  );
}
