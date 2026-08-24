import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

const activities = [
  {
    id: 'mission',
    label: '활동 A · 밖으로 보내기',
    image: geumjjokIdea,
    title: '공연 초대를 보내도 될까?',
    description: 'AI가 연계학교 친구들에게 초대 메일과 메시지를 보내기 전, 무엇을 확인해야 하는지 결정해요.',
    tags: ['받는 사람', '공연 정보', '최종 포스터', '사람 확인'],
    action: '전송 전 확인하기'
  },
  {
    id: 'control',
    label: '활동 B · 파일을 바꾸기',
    image: geumjjokDoctor,
    title: '사라지는 견학 사진을 멈춰라',
    description: 'AI가 박물관 견학 자료를 정리하다 부탁하지 않은 행동을 할 때, 멈추고 복구하는 방법을 찾아요.',
    tags: ['작업 기록', '비상 정지', '원본 복구', '권한 제한'],
    action: '사진 지키기'
  }
];

export default function AgentModeSelectScreen({ onSelectMode }) {
  return (
    <section className="agent-shell agent-mode-select" aria-labelledby="agent-mode-title">
      <header className="agent-hero">
        <img src={geumjjokMain} alt="AI 금쪽이" />
        <div>
          <span className="agent-eyebrow">AI가 말에서 행동으로 넘어갈 때</span>
          <h1 id="agent-mode-title">AI가 대신 움직인다면?</h1>
          <p>AI가 실제로 메시지를 보내거나 파일을 바꾼다면, 우리는 어디에서 확인하고 멈춰야 할까요?</p>
        </div>
      </header>

      <section className="agent-action-contrast" aria-labelledby="agent-action-contrast-title">
        <h2 id="agent-action-contrast-title">답을 주는 것과 행동하는 것은 달라요</h2>
        <div>
          <article>
            <span>답하는 AI</span>
            <strong>“공연 초대 문구를 써 줘.”</strong>
            <p>화면에 초안을 보여 줘요.</p>
          </article>
          <span aria-hidden="true">→</span>
          <article className="is-action">
            <span>행동하는 AI</span>
            <strong>“그 문구를 친구들에게 보내 줘.”</strong>
            <p>도구를 사용해 밖으로 영향을 만들어요.</p>
          </article>
        </div>
      </section>

      <div className="agent-mode-grid">
        {activities.map(activity => (
          <button key={activity.id} type="button" className="agent-mode-card" onClick={() => onSelectMode(activity.id)}>
            <div className="agent-mode-card-head">
              <img src={activity.image} alt="" aria-hidden="true" />
              <span>{activity.label}</span>
            </div>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <ul aria-label="체험 내용">{activity.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <strong className="agent-mode-action">{activity.action} →</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
