import React from 'react';
import { activityRecommendationStudent } from '../fairnessData';
import geumjjokCurious from '../../../assets/geumjjok/금쪽이_표정_궁금.png';

export default function GrowthInitialScreen({ onNext }) {
  return (
    <div className="card fair-story-page fair-opening-page">
      <div className="fair-opening-heading">
        <span className="fair-eyebrow">하늘이의 꿈 노트</span>
        <h2>하늘이를 소개해요</h2>
        <p>직업을 정답처럼 고르는 대신, 하늘이가 어떤 일을 해 보고 싶은지 함께 찾아볼 거예요.</p>
      </div>

      <section className="fair-person-intro" aria-labelledby="haneul-intro-title">
        <div className="fair-person-avatar" aria-hidden="true">하늘</div>
        <div>
          <small>{activityRecommendationStudent.grade}</small>
          <h3 id="haneul-intro-title">{activityRecommendationStudent.name}은 아직 꿈을 찾는 중이에요</h3>
          <p>{activityRecommendationStudent.introduction}</p>
        </div>
      </section>

      <blockquote className="fair-story-quote">
        <span>하늘이의 고민</span>
        “{activityRecommendationStudent.worry}”
      </blockquote>

      <section className="fair-ai-invitation">
        <img src={geumjjokCurious} alt="궁금한 금쪽이" />
        <div>
          <small>하늘이의 생각</small>
          <p>“AI 금쪽이에게 물어보면 내 꿈을 찾는 데 도움이 될까?”</p>
        </div>
      </section>

      <div className="bottom-nav-bar">
        <div />
        <button className="btn-primary" onClick={onNext} style={{ minHeight: '52px' }}>
          하늘이와 AI에게 물어보기 →
        </button>
      </div>
    </div>
  );
}
