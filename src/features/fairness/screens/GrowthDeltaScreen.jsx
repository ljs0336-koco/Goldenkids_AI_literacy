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
  const expandedSuggestions = rankActivityRecommendations(allRecords, activityRecommendationOptions)
    .filter(option => option.key !== firstRecommendation.key)
    .slice(0, 3);
  const isBefore = pageIndex === 0;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokTouched} alt="생각하는 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <span className="fair-eyebrow">처음 생각과 넓어진 가능성</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '5px 0 8px' }}>
          {isBefore ? '성적표만 보고 떠올린 직업' : '하늘이를 더 알고 나니 꿈 후보가 넓어졌어요'}
        </h2>
      </div>

      {isBefore ? (
        <section className="fair-record-page" style={{ textAlign: 'center' }}>
          <small>AI가 받은 자료: 성적표와 코딩 기록</small>
          <h3 style={{ fontSize: '30px' }}>{firstRecommendation.name}</h3>
          <p>{firstRecommendation.why}</p>
          <p className="fair-story-conclusion" style={{ marginTop: '18px' }}>이때 AI는 하늘이의 관심과 직접 한 말을 알지 못했어요.</p>
        </section>
      ) : (
        <section className="fair-career-options" aria-label="새롭게 떠오른 꿈 후보 세 가지">
          {expandedSuggestions.map(option => (
            <article key={option.key}>
              <h3>{option.name}</h3>
              <p>{option.desc}</p>
              <small>{option.why}</small>
            </article>
          ))}
        </section>
      )}

      <PageTurnNav
        current={pageIndex}
        total={2}
        onPrev={() => setPageIndex(0)}
        onNext={() => setPageIndex(1)}
        prevLabel="처음 생각"
        nextLabel="넓어진 꿈"
      />

      {!isBefore && (
        <>
          <ConceptBridge>
            성적표는 하늘이의 일부 모습만 보여 줘요. 경험과 관심, 하늘이의 말을 함께 보니 하나의 직업이 아니라 여러 꿈의 가능성이 보였어요.
          </ConceptBridge>
        </>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={isBefore} style={{ minHeight: '52px' }}>
          {isBefore ? '넓어진 꿈 후보를 먼저 확인해 주세요' : '하늘이의 다음 탐색 정하기 →'}
        </button>
      </div>
    </div>
  );
}
