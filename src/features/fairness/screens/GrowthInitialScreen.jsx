import React from 'react';
import { activityRecommendationStudent } from '../fairnessData';
import { growthSpeakerPrompt } from '../fairnessLearningData';
import MiniSpeakerNote from '../components/MiniSpeakerNote';
import geumjjokCurious from '../../../assets/geumjjok/금쪽이_표정_궁금.png';

export default function GrowthInitialScreen({ onNext }) {
  return (
    <div className="card fair-story-page">
      <div className="text-center">
        <img src={geumjjokCurious} alt="궁금한 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>
          AI는 지금 {activityRecommendationStudent.name}의 성적표와 코딩 기록만 보고 있어요
        </h2>
        <p className="fair-one-line-help">이 자료만 보고 하늘이에게 어울릴 직업을 떠올려 달라고 해 볼까요?</p>
      </div>

      <div className="fair-data-story">
        <section className="fair-data-scene is-known">
          <small>AI가 받은 자료</small>
          <h3>{activityRecommendationStudent.name}의 성적표</h3>
          <div className="fair-report-strip">
            {activityRecommendationStudent.reportCard.map(item => (
              <span key={item.subject}><strong>{item.subject}</strong> {item.score}점</span>
            ))}
          </div>
          <p>{activityRecommendationStudent.codingRecord}</p>
        </section>
        <div className="fair-data-arrow" aria-hidden="true">→</div>
        <section className="fair-data-scene is-unknown">
          <small>이 자료에는 없는 것</small>
          <h3>하늘이가 좋아하는 일과 꿈</h3>
          <p>어떤 활동을 즐기는지, 누구와 일하고 싶은지, 어떤 문제를 해결하고 싶은지는 알 수 없어요.</p>
        </section>
      </div>

      <p className="fair-story-conclusion">
        이 정도의 자료로 고른 직업은 <strong>정답이 아니라 AI의 첫 번째 추측</strong>이에요.
      </p>

      <MiniSpeakerNote prompt={growthSpeakerPrompt} />

      <div className="bottom-nav-bar">
        <div />
        <button className="btn-primary" onClick={onNext} style={{ minHeight: '52px' }}>
          AI가 떠올린 첫 직업 보기 →
        </button>
      </div>
    </div>
  );
}
