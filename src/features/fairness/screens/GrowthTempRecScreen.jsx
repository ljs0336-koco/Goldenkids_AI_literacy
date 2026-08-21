import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent
} from '../fairnessData';
import { getTopActivityRecommendation, rankActivityRecommendations } from '../fairnessEngine';
import AiExchangePanel from '../components/AiExchangePanel';
import { growthQuestions } from '../fairnessLearningData';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function GrowthTempRecScreen({ questionId, onQuestion, onNext, onPrev }) {
  const ranking = rankActivityRecommendations(activityRecommendationInitialRecords, activityRecommendationOptions);
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);

  return (
    <div className="card fair-story-page">
      <div className="text-center">
        <img src={geumjjokDoctor} alt="박사 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <span className="fair-eyebrow">온라인 기록 3개만 본 첫 답</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '5px 0 8px' }}>{firstRecommendation.name}</h2>
        <p className="fair-one-line-help">
          “온라인 기록에서는 코딩 관련 단서가 가장 많이 보여요.”
        </p>
      </div>

      <p className="fair-story-conclusion">
        하지만 AI는 <strong>교실 활동과 {activityRecommendationStudent.name}의 직접 선택</strong>을 아직 보지 못했어요.
      </p>

      <details className="fair-inline-details">
        <summary>AI가 계산한 단서 점수 보기</summary>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          {ranking.map(option => (
            <span key={option.key} style={{ padding: '7px 11px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)' }}>
              {option.shortName} {option.score}점
            </span>
          ))}
        </div>
      </details>

      <AiExchangePanel
        questions={growthQuestions}
        selectedId={questionId}
        onSelect={onQuestion}
        title="첫 추천에 한 가지를 되물어 보세요"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={!questionId} style={{ minHeight: '52px' }}>
          {questionId ? 'AI가 놓친 기록 찾아보기 →' : '질문 하나를 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
