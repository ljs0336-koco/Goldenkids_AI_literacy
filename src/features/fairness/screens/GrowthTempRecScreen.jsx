import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions
} from '../fairnessData';
import { getTopActivityRecommendation } from '../fairnessEngine';
import AiExchangePanel from '../components/AiExchangePanel';
import { growthQuestions } from '../fairnessLearningData';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function GrowthTempRecScreen({ questionId, onQuestion, onNext, onPrev }) {
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);

  return (
    <div className="card fair-story-page">
      <div className="text-center">
        <img src={geumjjokDoctor} alt="박사 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <span className="fair-eyebrow">AI가 처음 떠올린 직업</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '5px 0 8px' }}>{firstRecommendation.name}</h2>
        <p className="fair-one-line-help">AI는 아래 세 가지 기록을 보고 이렇게 생각했어요.</p>
      </div>

      <ul className="fair-evidence-list" aria-label="AI가 소프트웨어 개발자를 떠올린 근거">
        <li><strong>정보 92점</strong><span>성적표에서 가장 높은 과목이에요.</span></li>
        <li><strong>코딩 과제 8번 모두 제출</strong><span>오류를 고쳐 가며 끝까지 완성했어요.</span></li>
        <li><strong>규칙 찾기 문제 해결</strong><span>틀린 답을 다시 보고 다른 방법을 시도했어요.</span></li>
      </ul>

      <p className="fair-story-conclusion">하지만 성적표와 과제 기록만으로는 <strong>하늘이가 어떤 삶을 꿈꾸는지</strong> 알 수 없어요.</p>

      <AiExchangePanel
        questions={growthQuestions}
        selectedId={questionId}
        onSelect={onQuestion}
        title="AI 금쪽이에게 하나만 더 물어보세요"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={!questionId} style={{ minHeight: '52px' }}>
          {questionId ? '성적표에 없는 하늘이의 모습 보기 →' : '물어볼 질문 하나를 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
