import React, { useState } from 'react';
import { activityRecommendationChecklist } from '../fairnessData';
import { growthFinalChoices } from '../fairnessLearningData';
import PageTurnNav from '../components/PageTurnNav';
import ConceptBridge from '../components/ConceptBridge';

export default function GrowthHumanCheckScreen({ checklist = [], onToggleCheck, finalChoice, onFinalChoice, onNext, onPrev }) {
  const firstUnchecked = activityRecommendationChecklist.findIndex(item => !checklist.includes(item.id));
  const [checkIndex, setCheckIndex] = useState(firstUnchecked >= 0 ? firstUnchecked : 0);
  const selectedChoiceIndex = Math.max(0, growthFinalChoices.findIndex(item => item.id === finalChoice));
  const [choicePageOverride, setChoicePageOverride] = useState(null);
  const choiceIndex = choicePageOverride ?? selectedChoiceIndex;
  const isAllChecked = activityRecommendationChecklist.every(item => checklist.includes(item.id));
  const checkItem = activityRecommendationChecklist[checkIndex];
  const isCurrentChecked = checklist.includes(checkItem.id);
  const choice = growthFinalChoices[choiceIndex];

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <div style={{ fontSize: '38px' }}>{isAllChecked ? '🧭' : '🔍'}</div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>
          {isAllChecked ? '이제 내가 다음 행동을 정해요' : '추천 전에 확인할 것을 한 장씩 살펴봐요'}
        </h2>
        <p className="fair-one-line-help">
          {isAllChecked ? '선택지를 넘겨 보고 가장 필요한 다음 행동을 골라 보세요.' : '내용을 읽고 확인했다면 버튼을 눌러 다음 장으로 가세요.'}
        </p>
      </div>

      {!isAllChecked ? (
        <>
          <article className={`fair-record-page ${isCurrentChecked ? 'is-viewed' : ''}`} style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
            <span className="fair-eyebrow">확인할 점 {checkIndex + 1}</span>
            <h3 style={{ maxWidth: '620px' }}>{checkItem.text}</h3>
            <button
              type="button"
              className={isCurrentChecked ? 'btn-outline fair-record-confirm' : 'btn-primary fair-record-confirm'}
              onClick={() => onToggleCheck(checkItem.id)}
            >
              {isCurrentChecked ? '확인했어요' : '☝ 확인했어요'}
            </button>
          </article>
          <PageTurnNav
            current={checkIndex}
            total={activityRecommendationChecklist.length}
            onPrev={() => setCheckIndex(index => Math.max(0, index - 1))}
            onNext={() => setCheckIndex(index => Math.min(activityRecommendationChecklist.length - 1, index + 1))}
            disableNext={!isCurrentChecked}
            prevLabel="이전 확인"
            nextLabel="다음 확인"
          />
        </>
      ) : (
        <>
          <button
            type="button"
            className={`fair-question-page ${finalChoice === choice.id ? 'is-selected' : ''}`}
            onClick={() => onFinalChoice(choice.id)}
            aria-pressed={finalChoice === choice.id}
          >
            <span>내가 할 수 있는 다음 행동</span>
            <strong>{choice.title}</strong>
            <small>{choice.note}</small>
          </button>
          <PageTurnNav
            current={choiceIndex}
            total={growthFinalChoices.length}
            onPrev={() => setChoicePageOverride(Math.max(0, choiceIndex - 1))}
            onNext={() => setChoicePageOverride(Math.min(growthFinalChoices.length - 1, choiceIndex + 1))}
            prevLabel="이전 선택"
            nextLabel="다음 선택"
          />
          <ConceptBridge>
            AI에게 추천을 받는 것만큼, 근거를 확인하고 당사자의 목소리를 들어 다음 행동을 정하는 것도 AI 리터러시예요.
          </ConceptBridge>
        </>
      )}

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={!isAllChecked || !finalChoice} style={{ minHeight: '52px' }}>
          {isAllChecked && finalChoice ? '내 선택으로 탐구 마치기 →' : '확인한 뒤 나의 행동을 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
