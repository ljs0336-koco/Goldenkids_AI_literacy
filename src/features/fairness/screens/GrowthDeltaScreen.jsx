import React, { useState } from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationSupplementRecords
} from '../fairnessData';
import { getTopActivityRecommendation, rankActivityRecommendations } from '../fairnessEngine';
import PageTurnNav from '../components/PageTurnNav';
import FairChoiceFork from '../components/FairChoiceFork';
import ConceptBridge from '../components/ConceptBridge';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function GrowthDeltaScreen({ selectedCareerIds = [], onToggleCareer, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const allRecords = [...activityRecommendationInitialRecords, ...activityRecommendationSupplementRecords];
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);
  const suggestions = rankActivityRecommendations(allRecords, activityRecommendationOptions);
  const visibleSuggestions = suggestions.slice(0, 3);
  const selectedCareerId = selectedCareerIds.find(id => visibleSuggestions.some(option => option.key === id)) || '';
  const ready = pageIndex === 1 && Boolean(selectedCareerId);
  const choices = visibleSuggestions.map(option => ({
    id: option.key,
    title: option.name,
    note: option.desc,
    result: option.why
  }));

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokTouched} alt="생각을 넓힌 금쪽이" className="fair-scene-character" />
        <span className="fair-eyebrow">처음 생각과 넓어진 가능성</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>
          {pageIndex === 0 ? '처음에는 직업 하나만 보였어요' : '하늘이가 먼저 알아볼 꿈 하나를 골라요'}
        </h2>
        <p className="fair-one-line-help">
          {pageIndex === 0 ? 'AI가 알고 있던 자료가 적었기 때문이에요.' : '새로 알게 된 이야기까지 반영한 두 방향을 바로 비교하세요.'}
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
        <FairChoiceFork
          options={choices}
          selectedId={selectedCareerId}
          onSelect={onToggleCareer}
          prompt="A와 B는 새 정보에서 강하게 보인 서로 다른 진로 방향이에요. 먼저 탐색할 하나를 골라요."
          moreLabel="AI의 첫 제안도 계속 살펴보고 싶다면?"
          resultLabel="하늘이가 먼저 탐색할 꿈"
        />
      )}

      <PageTurnNav
        current={pageIndex}
        total={2}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(1, index + 1))}
        prevLabel="AI의 첫 제안"
        nextLabel="넓어진 꿈 보기"
      />

      {pageIndex > 0 && (
        <p className="fair-selection-count" role="status">먼저 알아볼 꿈 {ready ? '선택 완료' : '아직 선택하지 않음'}</p>
      )}

      {ready && (
        <ConceptBridge>
          하늘이의 경험과 관심, 직접 한 말을 더하니 직업 하나가 정답처럼 남지 않았어요. 지금 고른 꿈도 확정이 아니라 먼저 알아볼 출발점이에요.
        </ConceptBridge>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 하늘이 이야기</button>
        <button className="btn-primary" onClick={onNext} disabled={!ready} style={{ minHeight: '52px' }}>
          {ready ? '이 꿈을 실제로 알아볼 방법 정하기 →' : pageIndex === 0 ? '넓어진 꿈을 먼저 보세요' : 'A 또는 B를 먼저 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
