import React, { useState } from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent
} from '../fairnessData';
import { getTopActivityRecommendation } from '../fairnessEngine';
import { growthQuestions, growthSpeakerPrompt } from '../fairnessLearningData';
import AiExchangePanel from '../components/AiExchangePanel';
import MiniSpeakerNote from '../components/MiniSpeakerNote';
import PageTurnNav from '../components/PageTurnNav';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

const headings = [
  ['AI는 하늘이의 모든 모습을 알고 있을까요?', 'AI에게 전달된 자료부터 확인해요.'],
  ['박사 금쪽이 AI가 처음 떠올린 직업', '이 답은 지금 받은 자료만으로 만든 첫 번째 생각이에요.'],
  ['첫 답에서 멈추지 말고 하나 더 물어봐요', '궁금한 질문을 고르면 AI의 설명을 들을 수 있어요.']
];

export default function GrowthTempRecScreen({ questionId, onQuestion, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);
  const [title, help] = headings[pageIndex];

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokDoctor} alt="박사 금쪽이" className="fair-scene-character" />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '2px 0 8px' }}>{title}</h2>
        <p className="fair-one-line-help">{help}</p>
      </div>

      {pageIndex === 0 && (
        <section className="fair-record-page" aria-labelledby="ai-records-title">
          <span className="fair-eyebrow">AI가 실제로 받은 자료</span>
          <h3 id="ai-records-title">성적표와 온라인 학습 기록 세 가지</h3>
          <ul className="fair-plain-record-list">
            {activityRecommendationInitialRecords.map(record => (
              <li key={record.id}>
                <small>{record.source}</small>
                <strong>{record.title}</strong>
              </li>
            ))}
          </ul>
          <p className="fair-record-reveal">
            <strong>아직 모르는 것</strong>
            <span>{activityRecommendationStudent.name}이 무엇을 좋아하고, 누구와 일하고 싶고, 어떤 문제를 해결하고 싶은지는 이 자료에 없어요.</span>
          </p>
        </section>
      )}

      {pageIndex === 1 && (
        <section className="fair-first-answer" aria-labelledby="first-career-title">
          <span>AI의 첫 번째 생각</span>
          <h3 id="first-career-title">{firstRecommendation.name}</h3>
          <p>{firstRecommendation.why}</p>
          <div className="fair-first-answer-reason">
            <strong>AI가 연결한 기록</strong>
            <span>정보 성적 · 코딩 과제 · 규칙 찾기 문제</span>
          </div>
          <p className="fair-story-conclusion">
            그럴듯한 이유가 있어도 이 직업이 <strong>하늘이의 정답인 것은 아니에요.</strong>
          </p>
        </section>
      )}

      {pageIndex === 2 && (
        <>
          <AiExchangePanel
            questions={growthQuestions}
            selectedId={questionId}
            onSelect={onQuestion}
            title="AI 금쪽이에게 하나만 더 물어보세요"
          />
          <MiniSpeakerNote prompt={growthSpeakerPrompt} />
        </>
      )}

      <PageTurnNav
        current={pageIndex}
        total={3}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(2, index + 1))}
        prevLabel="이전 장면"
        nextLabel="다음 장면"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 하늘이 소개</button>
        <button className="btn-primary" onClick={onNext} disabled={pageIndex !== 2 || !questionId} style={{ minHeight: '52px' }}>
          {pageIndex !== 2
            ? '질문 장면까지 넘겨 보세요'
            : questionId
              ? 'AI가 몰랐던 하늘이의 이야기 보기 →'
              : '물어볼 질문 하나를 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
