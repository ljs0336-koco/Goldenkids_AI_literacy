import React from 'react';
import { clubInviteMission } from '../../agentData';
import AgentPageCue from '../../components/AgentPageCue';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';
import speakerThumb from '../../../../assets/geumjjok/스피커 썸네일.png';

export default function MissionSummaryScreen({ decision, onReset, onBackToActivities, onOpenRecord }) {
  const selected = clubInviteMission.humanCheckpoint.options.find(option => option.id === decision);
  const corrected = clubInviteMission.correctedAction;

  return (
    <section className="agent-shell agent-stage agent-summary" aria-labelledby="mission-summary-title">
      <AgentPageCue
        action="고친 전송 요청과 HITL의 뜻을 읽고, 내가 확인한 지점을 연결해 보세요."
        reason="용어를 외우는 것보다 AI 행동 사이에 사람이 어디서 판단하는지 설명할 수 있는 것이 중요해요."
      />

      <header className="agent-summary-head">
        <img src={geumjjokCelebration} alt="" aria-hidden="true" />
        <div>
          <span className="agent-eyebrow">활동 A 완료</span>
          <h1 id="mission-summary-title">보내기 전에 사람이 한 번 더</h1>
          <p>내 선택은 ‘{selected?.label.replace(/^[ABC]\.\s*/, '') || '기록 없음'}’이었어요.</p>
        </div>
      </header>

      <section className="agent-corrected-card" aria-labelledby="agent-corrected-title">
        <h2 id="agent-corrected-title">AI가 고쳐서 다시 보여 준 내용</h2>
        <dl>
          <div><dt>받는 사람</dt><dd>{corrected.recipients}</dd></div>
          <div><dt>공연 정보</dt><dd>{corrected.schedule}</dd></div>
          <div><dt>첨부 파일</dt><dd>{corrected.attachment}</dd></div>
          <div><dt>연락처 보호</dt><dd>{corrected.privacy}</dd></div>
        </dl>
        <blockquote>“{corrected.request}”</blockquote>
      </section>

      <section className="agent-hitl-card" aria-labelledby="agent-hitl-title">
        <span className="agent-hitl-label">이 경험의 이름</span>
        <h2 id="agent-hitl-title">HITL · Human-in-the-Loop</h2>
        <p><strong>AI의 행동 과정에 사람이 들어가 확인하고 결정하는 구조</strong>를 뜻해요.</p>
        <div className="agent-hitl-flow" aria-label="HITL의 과정">
          <span>AI가 준비</span><b>→</b><span>사람이 확인·결정</span><b>→</b><span>AI가 실행</span><b>→</b><span>사람이 결과 확인</span>
        </div>
        <small>사람이 버튼을 눌렀다는 사실만으로 안전해지는 것은 아니에요. 필요한 정보가 보이고, 멈추거나 고칠 수 있어야 합니다.</small>
      </section>

      <aside className="agent-speaker-note">
        <img src={speakerThumb} alt="" aria-hidden="true" />
        <p><strong>금쪽이 스피커와 이어 보기</strong><br />“AI가 메시지를 보내기 전에 무엇을 확인해야 해?”라고 물어보고, 내가 찾은 네 가지와 비교해 봐도 좋아요.</p>
      </aside>

      <div className="agent-summary-actions">
        <button type="button" className="btn-outline" onClick={onOpenRecord}>내 활동 기록 보기</button>
        <button type="button" className="btn-outline" onClick={onReset}>다시 해보기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>다른 활동 고르기</button>
      </div>
    </section>
  );
}
