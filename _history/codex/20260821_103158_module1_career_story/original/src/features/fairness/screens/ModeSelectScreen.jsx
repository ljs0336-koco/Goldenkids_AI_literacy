import React from 'react';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

const activities = [
  {
    id: 'growth',
    icon: '🌱',
    badge: '학습 데이터 탐구 · 약 10분',
    eyebrow: '맞춤 활동 추천',
    image: geumjjokDoctor,
    imageAlt: '활동 기록을 살펴보는 AI 금쪽이',
    title: 'AI 금쪽이의 활동 추천, 그대로 따라도 될까?',
    description: '온라인 기록만 볼 때와 빠진 오프라인 활동·관심 기록을 함께 볼 때, AI 금쪽이의 추천이 어떻게 달라지는지 비교해요.',
    action: '활동 추천 실험 시작하기'
  },
  {
    id: 'team',
    icon: '👥',
    badge: 'AI 공정성 탐구 · 약 15분',
    eyebrow: '프로젝트 대표팀 구성',
    image: geumjjokMain,
    imageAlt: '학생들과 함께 있는 AI 금쪽이',
    title: '우리 학교 프로젝트 대표팀을 만들어라!',
    description: '지원자 8명의 서로 다른 강점을 살펴보고, 프로젝트 대회에 참가할 대표팀 4명을 공정하게 구성해요.',
    action: '대표팀 구성 시작하기'
  }
];

export default function ModeSelectScreen({ onSelectMode }) {
  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto' }} aria-labelledby="fairness-mode-title">
      <header className="section-intro">
        <h2 id="fairness-mode-title">AI 금쪽이와 함께하는 공정한 AI 실험실</h2>
        <p>AI가 본 데이터와 적용한 기준을 차근차근 바꾸어 보며, 추천 결과가 왜 달라지는지 살펴봐요.</p>
      </header>

      <aside className="guide-note">
        <img src={geumjjokIdea} alt="" aria-hidden="true" />
        <p>
          <span className="guide-note-label">살펴볼 점</span><br />
          데이터의 범위와 판단 기준을 바꾸어 비교하고, 마지막에는 사람이 놓친 정보가 없는지 확인해요.
        </p>
      </aside>

      <div className="mode-grid">
        {activities.map(activity => (
          <button
            key={activity.id}
            type="button"
            className="card interactive-card mode-card"
            onClick={() => onSelectMode(activity.id)}
          >
            <div className="mode-card-top">
              <span className="mode-icon-circle" aria-hidden="true">{activity.icon}</span>
              <span className="mode-badge">{activity.badge}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="mode-card-eyebrow">
                <img src={activity.image} alt={activity.imageAlt} />
                <span>{activity.eyebrow}</span>
              </div>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
            <span className="mode-card-action">{activity.action} <span aria-hidden="true">→</span></span>
          </button>
        ))}
      </div>
    </section>
  );
}
