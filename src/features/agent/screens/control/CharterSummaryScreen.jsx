import React from 'react';
import { safeRerunResult } from '../../agentData';
import AgentPageCue from '../../components/AgentPageCue';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function CharterSummaryScreen({ onReset, onBackToActivities, onOpenRecord }) {
  return (
    <section className="agent-shell agent-stage agent-summary" aria-labelledby="control-summary-title">
      <AgentPageCue
        action="처음 실행과 다시 실행한 결과를 비교하고, 내가 지킬 네 문장을 읽어 보세요."
        reason="안전장치는 AI를 쓰지 않게 만드는 것이 아니라, 사람이 통제하며 더 안전하게 활용하도록 돕는 장치예요."
      />

      <header className="agent-summary-head">
        <img src={geumjjokCelebration} alt="" aria-hidden="true" />
        <div>
          <span className="agent-eyebrow">활동 B 완료</span>
          <h1 id="control-summary-title">{safeRerunResult.title}</h1>
          <p>원본을 지키고, 애매한 판단과 영향이 큰 행동은 사람에게 다시 물었어요.</p>
        </div>
      </header>

      <section className="agent-rerun-result" aria-label="안전하게 다시 실행한 결과">
        {safeRerunResult.items.map((item, index) => (
          <article key={item}>
            <span>{index + 1}</span>
            <strong>{item}</strong>
          </article>
        ))}
      </section>

      <section className="agent-principles-card" aria-labelledby="agent-principles-title">
        <h2 id="agent-principles-title">AI가 행동할 때 지킬 네 문장</h2>
        <ol>
          <li><strong>목표와 권한을 나눠요.</strong><span>정리를 부탁했다고 삭제까지 허락한 것은 아니에요.</span></li>
          <li><strong>원본과 돌아올 길을 남겨요.</strong><span>복사본에서 먼저 작업하고 기록을 남겨요.</span></li>
          <li><strong>영향이 큰 행동에는 HITL을 넣어요.</strong><span>사람이 정보를 보고 승인·보류한 뒤 실행해요.</span></li>
          <li><strong>멈춘 뒤 결과까지 확인해요.</strong><span>비상 정지 뒤에는 권한 회수와 복구가 이어져요.</span></li>
        </ol>
      </section>

      <aside className="agent-final-question">
        <strong>마지막으로 생각해 보기</strong>
        <span>내가 쓰는 AI가 실제로 무엇을 보고, 바꾸고, 다른 사람에게 보낼 수 있는지 설명할 수 있나요?</span>
      </aside>

      <div className="agent-summary-actions">
        <button type="button" className="btn-outline" onClick={onOpenRecord}>내 활동 기록 보기</button>
        <button type="button" className="btn-outline" onClick={onReset}>다시 해보기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>다른 활동 고르기</button>
      </div>
    </section>
  );
}
