import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

const activities = [
  {
    id: 'persona',
    icon: '🎭',
    badge: '상황별 AI 역할 탐구 · 약 10분',
    eyebrow: '4색 AI 페르소나 매칭',
    image: geumjjokIdea,
    imageAlt: '페르소나 탐구 금쪽이',
    title: '나에게 맞는 AI 페르소나 매칭',
    description: '시험 고민, 아이디어 구상, 친구 갈등처럼 서로 다른 상황에서 네 가지 AI 응답을 비교하고 필요한 역할을 선택해요.',
    action: '페르소나 매칭 시작하기'
  },
  {
    id: 'task',
    icon: '↔',
    badge: 'AI와 인간의 역할 분담 · 약 15분',
    eyebrow: '미래 업무 3구역 분류소',
    image: geumjjokDoctor,
    imageAlt: '업무 분류 금쪽이',
    title: '미래 업무 3구역 분류소',
    description: '학교와 사회의 일을 AI 중심, 인간과 협력, 인간 최종 결정의 세 구역으로 나누고 그 이유를 생각해요.',
    action: '업무 분류 시작하기'
  }
];

export default function RoleModeSelectScreen({ onSelectMode }) {
  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto' }} aria-labelledby="role-mode-title">
      <header className="section-intro">
        <img src={geumjjokMain} alt="AI 금쪽이" />
        <h2 id="role-mode-title">AI 금쪽이와 함께하는 AI 역할 선택소</h2>
        <p>상황에 맞는 AI의 역할을 고르고, 사람과 AI가 일을 나눌 때 지켜야 할 기준을 탐구해요.</p>
      </header>

      <aside className="guide-note">
        <img src={geumjjokIdea} alt="" aria-hidden="true" />
        <p>
          <span className="guide-note-label">살펴볼 점</span><br />
          같은 질문도 역할에 따라 응답이 달라집니다. 어떤 역할이 필요한지, 최종 판단은 누가 맡아야 하는지 함께 생각해요.
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
