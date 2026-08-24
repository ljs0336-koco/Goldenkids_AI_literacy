import React from 'react';
import { clubInviteMission } from '../../agentData';
import AgentPageCue from '../../components/AgentPageCue';
import AgentPageNav from '../../components/AgentPageNav';
import geumjjokIdea from '../../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

export default function MissionSelectScreen({ onNext, onPrev }) {
  return (
    <section className="agent-shell agent-stage" aria-labelledby="mission-story-title">
      <AgentPageCue
        action="상황을 읽고, AI가 ‘답’이 아니라 어떤 ‘행동’을 하게 되는지 찾아보세요."
        reason="실제 행동은 여러 사람과 파일에 영향을 주기 때문에 실행 전에 확인할 지점이 필요해요."
      />

      <header className="agent-page-head">
        <span className="agent-eyebrow">{clubInviteMission.category}</span>
        <h1 id="mission-story-title">{clubInviteMission.title}</h1>
        <p>{clubInviteMission.hook}</p>
      </header>

      <div className="agent-story-card">
        <img src={geumjjokIdea} alt="" aria-hidden="true" />
        <div>
          <small>내 역할</small>
          <strong>{clubInviteMission.role}</strong>
        </div>
      </div>

      <div className="agent-request-card">
        <span>내가 AI에게 부탁한 말</span>
        <blockquote>“{clubInviteMission.request}”</blockquote>
      </div>

      <aside className="agent-question-strip">
        <strong>잠깐, AI는 어디까지 해도 될까요?</strong>
        <span>초대 문구를 만드는 것과 실제로 보내는 것 사이에는 사람의 확인이 필요합니다.</span>
      </aside>

      <AgentPageNav onPrev={onPrev} onNext={onNext} prevLabel="활동 고르기" nextLabel="AI의 행동 보기" />
    </section>
  );
}
