import React from 'react';
import { activityRecommendationOptions } from '../fairnessData';
import { growthFinalChoices } from '../fairnessLearningData';
import FairChoiceFork from '../components/FairChoiceFork';
import ConceptBridge from '../components/ConceptBridge';

export default function GrowthHumanCheckScreen({ selectedCareerIds = [], finalChoice, onFinalChoice, onNext, onPrev }) {
  const selectedCareers = selectedCareerIds
    .map(id => activityRecommendationOptions.find(option => option.key === id))
    .filter(Boolean);
  const choices = growthFinalChoices.map(choice => ({
    id: choice.id,
    title: choice.title,
    note: choice.note,
    result: '이 행동으로 AI의 제안을 실제 경험과 정보에 연결해 볼 수 있어요.'
  }));

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

      <FairChoiceFork
        options={choices}
        selectedId={finalChoice}
        onSelect={onFinalChoice}
        prompt="A는 먼저 묻고 찾아보는 방법, B는 직접 해 보는 방법이에요."
        moreLabel="조금 더 경험한 뒤 정하고 싶다면?"
        resultLabel="하늘이의 다음 행동"
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
