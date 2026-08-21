import React, { useState } from 'react';
import { activityRecommendationOptions } from '../fairnessData';
import { growthFinalChoices } from '../fairnessLearningData';
import PageTurnNav from '../components/PageTurnNav';
import ConceptBridge from '../components/ConceptBridge';

export default function GrowthHumanCheckScreen({ selectedCareerIds = [], finalChoice, onFinalChoice, onNext, onPrev }) {
  const selectedChoiceIndex = Math.max(0, growthFinalChoices.findIndex(item => item.id === finalChoice));
  const [pageOverride, setPageOverride] = useState(null);
  const pageIndex = pageOverride ?? selectedChoiceIndex;
  const choice = growthFinalChoices[pageIndex];
  const selectedCareers = selectedCareerIds
    .map(id => activityRecommendationOptions.find(option => option.key === id))
    .filter(Boolean);
  const isSelected = finalChoice === choice.id;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <div className="fair-scene-emoji" aria-hidden="true">🧭</div>
        <span className="fair-eyebrow">직업을 정하는 대신 탐색을 시작해요</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>하늘이가 다음에 해 볼 일을 골라요</h2>
        <p className="fair-one-line-help">AI의 제안을 실제 경험과 정보로 확인할 방법을 한 가지 선택하세요.</p>
      </div>

      <section className="fair-selected-careers" aria-label="하늘이가 더 알아볼 꿈">
        <small>하늘이가 더 알아볼 꿈</small>
        <div>
          {selectedCareers.map(career => <strong key={career.key}>{career.name}</strong>)}
        </div>
      </section>

      <button
        type="button"
        className={`fair-question-page fair-next-action ${isSelected ? 'is-selected' : ''}`}
        onClick={() => onFinalChoice(choice.id)}
        aria-pressed={isSelected}
      >
        <span>다음 행동 {pageIndex + 1}</span>
        <strong>{choice.title}</strong>
        <small>{choice.note}</small>
        <em>{isSelected ? '하늘이의 다음 행동으로 골랐어요' : '이 행동 선택하기'}</em>
      </button>

      <PageTurnNav
        current={pageIndex}
        total={growthFinalChoices.length}
        onPrev={() => setPageOverride(Math.max(0, pageIndex - 1))}
        onNext={() => setPageOverride(Math.min(growthFinalChoices.length - 1, pageIndex + 1))}
        prevLabel="이전 행동"
        nextLabel="다음 행동"
      />

      <ConceptBridge>
        AI가 직업 이름을 제안해도 마지막 선택은 하늘이의 몫이에요. 사람의 마음을 묻고, 실제 정보를 찾고, 직접 경험해 보며 가능성을 좁혀 가요.
      </ConceptBridge>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 꿈 후보 다시 보기</button>
        <button className="btn-primary" onClick={onNext} disabled={!finalChoice} style={{ minHeight: '52px' }}>
          {finalChoice ? '하늘이의 탐색 계획 완성하기 →' : '다음 행동 하나를 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
