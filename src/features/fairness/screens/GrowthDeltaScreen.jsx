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

export default function GrowthDeltaScreen({ selectedCareerIds = [], onToggleCareer, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const allRecords = [...activityRecommendationInitialRecords, ...activityRecommendationSupplementRecords];
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);
  const suggestions = rankActivityRecommendations(allRecords, activityRecommendationOptions);
  const option = pageIndex > 0 ? suggestions[pageIndex - 1] : null;
  const isSelected = option ? selectedCareerIds.includes(option.key) : false;
  const selectionFull = selectedCareerIds.length >= 2 && !isSelected;
  const ready = selectedCareerIds.length === 2 && pageIndex === suggestions.length;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokTouched} alt="생각을 넓힌 금쪽이" className="fair-scene-character" />
        <span className="fair-eyebrow">처음 생각과 넓어진 가능성</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>
          {pageIndex === 0 ? '처음에는 직업 하나만 보였어요' : '하늘이가 더 알아볼 꿈 두 가지를 골라요'}
        </h2>
        <p className="fair-one-line-help">
          {pageIndex === 0 ? 'AI가 알고 있던 자료가 적었기 때문이에요.' : '네 가지 가능성을 끝까지 넘겨 보고 두 장을 선택하세요.'}
        </p>
      </div>

      {pageIndex === 0 ? (
        <section className="fair-before-card" aria-labelledby="before-career-title">
          <span>성적표와 온라인 기록만 보았을 때</span>
          <h3 id="before-career-title">{firstRecommendation.name}</h3>
          <p>{firstRecommendation.why}</p>
          <strong>AI의 첫 제안은 탐색의 시작일 뿐이에요.</strong>
        </section>
      ) : (
        <button
          type="button"
          className={`fair-career-page ${isSelected ? 'is-selected' : ''}`}
          onClick={() => onToggleCareer?.(option.key)}
          disabled={selectionFull}
          aria-pressed={isSelected}
        >
          <span>꿈 후보 {pageIndex}</span>
          <strong>{option.name}</strong>
          <p>{option.desc}</p>
          <small>{option.why}</small>
          <em>{isSelected ? '더 알아볼 꿈으로 골랐어요' : selectionFull ? '이미 두 가지를 골랐어요' : '이 꿈을 더 알아보기'}</em>
        </button>
      )}

      <PageTurnNav
        current={pageIndex}
        total={suggestions.length + 1}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(suggestions.length, index + 1))}
        prevLabel="이전 가능성"
        nextLabel="다음 가능성"
      />

      {pageIndex > 0 && (
        <p className="fair-selection-count" role="status">더 알아볼 꿈 {selectedCareerIds.length} / 2개 선택</p>
      )}

      {ready && (
        <ConceptBridge>
          하늘이의 경험과 관심, 직접 한 말을 더하니 직업 하나가 정답처럼 남지 않았어요. AI의 제안은 하늘이가 가능성을 비교하도록 도와주는 출발점이에요.
        </ConceptBridge>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 하늘이 이야기</button>
        <button className="btn-primary" onClick={onNext} disabled={!ready} style={{ minHeight: '52px' }}>
          {ready ? '두 가지 꿈을 더 알아볼 방법 정하기 →' : '네 가지를 보고 꿈 두 가지를 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
