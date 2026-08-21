import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent
} from '../fairnessData';
import { growthSpeakerPrompt } from '../fairnessLearningData';
import MiniSpeakerNote from '../components/MiniSpeakerNote';
import geumjjokCurious from '../../../assets/geumjjok/금쪽이_표정_궁금.png';

export default function GrowthInitialScreen({ onNext }) {
  return (
    <div className="card fair-story-page">
      <div className="text-center">
        <img src={geumjjokCurious} alt="궁금한 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>
          AI는 {activityRecommendationStudent.name}의 일부 기록만 보고 있어요
        </h2>
        <p className="fair-one-line-help">먼저 AI가 아는 것과 아직 모르는 것을 나누어 볼게요.</p>
      </div>

      <div className="fair-data-story">
        <section className="fair-data-scene is-known">
          <small>AI가 지금 아는 것</small>
          <h3>온라인 기록 {activityRecommendationInitialRecords.length}개</h3>
          <p>학습 사이트에서 어떤 활동을 했는지만 알고 있어요.</p>
        </section>
        <div className="fair-data-arrow" aria-hidden="true">→</div>
        <section className="fair-data-scene is-unknown">
          <small>AI가 아직 모르는 것</small>
          <h3>교실 활동과 하늘이의 마음</h3>
          <p>수업에서 무엇을 즐겼는지, 지금 무엇을 해 보고 싶은지는 몰라요.</p>
        </section>
      </div>

      <p className="fair-story-conclusion">
        그래서 지금 받을 답은 <strong>최종 결정이 아니라 첫 번째 임시 추천</strong>이에요.
      </p>

      <details className="fair-inline-details">
        <summary>이번에 비교할 체험 활동 4가지 보기</summary>
        <ul>
          {activityRecommendationOptions.map(option => <li key={option.key}>{option.name} — {option.desc}</li>)}
        </ul>
      </details>

      <MiniSpeakerNote prompt={growthSpeakerPrompt} />

      <div className="bottom-nav-bar">
        <div />
        <button className="btn-primary" onClick={onNext} style={{ minHeight: '52px' }}>
          AI의 첫 추천 받아 보기 →
        </button>
      </div>
    </div>
  );
}
