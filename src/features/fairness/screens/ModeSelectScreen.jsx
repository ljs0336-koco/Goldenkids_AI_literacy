import React from 'react';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

const activities = [
  {
    id: 'growth',
    icon: '🌱',
    badge: '꿈·진로 탐색 · 약 10분',
    eyebrow: '하늘이의 꿈 이야기',
    image: geumjjokDoctor,
    imageAlt: '하늘이의 꿈을 함께 살펴보는 AI 금쪽이',
    title: 'AI가 하늘이의 꿈을 골라 줘도 될까?',
    description: 'AI가 하늘이의 일부 기록만 보고 직업을 하나 골랐어요. 하늘이의 진짜 이야기를 더 알게 되면 답도 달라질까요?',
    action: '하늘이 만나기'
  },
  {
    id: 'team',
    icon: '👥',
    badge: 'AI 선택 다시 보기 · 약 15분',
    eyebrow: '학교 프로젝트 팀 구성',
    image: geumjjokMain,
    imageAlt: '학생들과 함께 있는 AI 금쪽이',
    title: '프로젝트 팀을 AI에게 맡겨도 될까?',
    description: 'AI가 네 명을 빠르게 골랐어요. 팀의 목표와 선택 기준, 잘못된 기록까지 확인하면 결과가 어떻게 달라질까요?',
    action: 'AI가 고른 팀 보기'
  }
];

export default function ModeSelectScreen({ onSelectMode }) {
  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto' }} aria-labelledby="fairness-mode-title">
      <header className="section-intro">
        <span className="fair-eyebrow">AI의 추천을 질문하는 두 가지 이야기</span>
        <h2 id="fairness-mode-title">AI의 선택, 그대로 믿어도 될까?</h2>
        <p>AI가 내놓은 답은 어떤 자료와 기준에서 시작했을까요? 이야기를 하나 골라 직접 확인해 봐요.</p>
      </header>

      <aside className="guide-note">
        <img src={geumjjokIdea} alt="" aria-hidden="true" />
        <p>
          <span className="guide-note-label">이곳에서 해 볼 일</span><br />
          AI의 첫 답을 바로 믿지 않고 이유를 묻고, 빠진 정보와 다시 살필 방법을 찾아요.
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
