import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

const activities = [
  {
    id: 'persona',
    badge: '부탁하는 방법',
    image: geumjjokIdea,
    title: 'AI에게 어떻게 부탁할까?',
    description: '같은 질문도 부탁한 역할에 따라 답이 달라져요. 두 답을 비교하고 내 부탁을 고쳐 봐요.',
    examples: ['마음 정리', '아이디어 시작', '쉬운 설명', '발표 점검'],
    action: '두 답 비교하기'
  },
  {
    id: 'task',
    badge: '맡기는 범위',
    image: geumjjokDoctor,
    title: 'AI에게 어디까지 맡길까?',
    description: '학교 축제를 준비하며 자동화, AI의 도움, 사람의 결정을 구별해 봐요.',
    examples: ['명단 정리', '문구 초안', '번역 확인', '최종 결정'],
    action: '일 나누기'
  }
];

export default function RoleModeSelectScreen({ onSelectMode }) {
  return (
    <section className="role-shell role-mode-select" aria-labelledby="role-mode-title">
      <header className="role-hero">
        <img src={geumjjokMain} alt="AI 금쪽이" />
        <div>
          <span className="role-eyebrow">AI와 함께 일하는 첫 연습</span>
          <h1 id="role-mode-title">AI에게 무엇을 맡길까?</h1>
          <p>AI를 많이 써 보지 않아도 괜찮아요. 생활 속 작은 부탁부터 직접 비교해 봐요.</p>
        </div>
      </header>

      <section className="role-everyday-intro" aria-labelledby="role-everyday-title">
        <div>
          <span className="role-number">먼저 알아보기</span>
          <h2 id="role-everyday-title">AI는 이런 때 도울 수 있어요</h2>
        </div>
        <div className="role-use-flow" aria-label="AI를 활용하는 간단한 과정">
          <span><strong>1</strong> 내가 부탁해요</span>
          <span aria-hidden="true">→</span>
          <span><strong>2</strong> AI가 초안을 줘요</span>
          <span aria-hidden="true">→</span>
          <span><strong>3</strong> 내가 확인하고 고쳐요</span>
        </div>
      </section>

      <div className="role-mode-grid">
        {activities.map(activity => (
          <button key={activity.id} type="button" className="role-mode-card" onClick={() => onSelectMode(activity.id)}>
            <div className="role-mode-card-head">
              <img src={activity.image} alt="" aria-hidden="true" />
              <span>{activity.badge}</span>
            </div>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <ul aria-label="체험 예시">{activity.examples.map(example => <li key={example}>{example}</li>)}</ul>
            <strong className="role-mode-action">{activity.action} →</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
