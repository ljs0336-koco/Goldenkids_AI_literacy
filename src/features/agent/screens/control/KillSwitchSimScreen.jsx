import React, { useState } from 'react';
import { museumIncident } from '../../agentData';
import AgentChoiceFork from '../../components/AgentChoiceFork';
import AgentPageCue from '../../components/AgentPageCue';
import AgentPageNav from '../../components/AgentPageNav';
import geumjjokEmbarrassed from '../../../../assets/geumjjok/금쪽이_표정_당황.png';

export default function KillSwitchSimScreen({
  killSwitchTriggered,
  onTriggerKillSwitch,
  onNext,
  onPrev
}) {
  const [recordIndex, setRecordIndex] = useState(0);
  const [phase, setPhase] = useState(killSwitchTriggered ? 'decision' : 'records');
  const [selectedClue, setSelectedClue] = useState(null);
  const selected = museumIncident.clueOptions.find(option => option.id === selectedClue);
  const canStop = Boolean(selected?.suspicious);
  const log = museumIncident.anomalyLog[recordIndex];
  const isLastRecord = recordIndex === museumIncident.anomalyLog.length - 1;

  if (phase === 'records') {
    return (
      <section className="agent-shell agent-stage" aria-labelledby="kill-switch-record-title">
        <AgentPageCue
          action="‘다음 기록’을 눌러 AI가 부탁한 범위를 벗어나는 순간을 찾아보세요."
          reason="넓은 권한을 주면 AI가 목표를 넓게 해석해 부탁하지 않은 행동까지 할 수 있어요. 사람은 작업 기록을 보고 개입할 수 있어야 해요."
        />

        <header className="agent-page-head agent-incident-head">
          <img src={geumjjokEmbarrassed} alt="" aria-hidden="true" />
          <div>
            <span className="agent-eyebrow">박물관 견학 보고서 준비</span>
            <h1 id="kill-switch-record-title">{museumIncident.title}</h1>
            <p>{museumIncident.hook}</p>
          </div>
        </header>

        <div className="agent-request-card is-compact">
          <span>내가 부탁한 말</span>
          <blockquote>“{museumIncident.request}”</blockquote>
        </div>

        <div className="agent-record-progress" aria-label={`작업 기록 ${recordIndex + 1} / ${museumIncident.anomalyLog.length}`}>
          {museumIncident.anomalyLog.map((item, index) => (
            <span key={item.label} className={index <= recordIndex ? 'is-seen' : ''} />
          ))}
        </div>

        <article className={`agent-incident-record is-${log.tone}`} aria-live="polite">
          <small>작업 기록 {recordIndex + 1} / {museumIncident.anomalyLog.length}</small>
          <h2>{log.label}</h2>
          <p>{log.text}</p>
        </article>

        <div className="agent-record-history">
          <small>지금까지 본 기록</small>
          <strong>{museumIncident.anomalyLog.slice(0, recordIndex + 1).map(item => item.label).join(' → ')}</strong>
        </div>

        <AgentPageNav
          onPrev={recordIndex === 0 ? onPrev : () => setRecordIndex(index => index - 1)}
          onNext={isLastRecord ? () => setPhase('decision') : () => setRecordIndex(index => index + 1)}
          prevLabel={recordIndex === 0 ? '활동 고르기' : '이전 기록'}
          nextLabel={isLastRecord ? '이상 행동 고르기' : '다음 기록'}
        />
      </section>
    );
  }

  return (
    <section className="agent-shell agent-stage" aria-labelledby="kill-switch-decision-title">
      <AgentPageCue
        action={killSwitchTriggered
          ? '멈춘 일과 자동으로 되돌아가지 않은 일을 구별한 뒤 다음 장으로 넘기세요.'
          : '부탁하지 않은 행동을 고른 뒤, 필요하면 ‘지금 멈추기’를 누르세요.'}
        reason="비상 정지는 앞으로의 행동을 막는 장치예요. 이미 바뀐 결과는 다음 단계에서 따로 복구해야 해요."
      />

      <header className="agent-page-head">
        <span className="agent-eyebrow">부탁과 작업 기록 비교하기</span>
        <h1 id="kill-switch-decision-title">{killSwitchTriggered ? '새 행동은 멈췄어요' : '어느 행동에서 멈춰야 할까?'}</h1>
        <p>AI는 자료 분류를 시작한 뒤, 사진 이동과 영상 삭제까지 행동 범위를 넓혔습니다.</p>
      </header>

      {!killSwitchTriggered ? (
        <div className="agent-decision-stage">
          <AgentChoiceFork
            options={museumIncident.clueOptions.slice(0, 2)}
            alternative={museumIncident.clueOptions[2]}
            value={selectedClue}
            onChange={setSelectedClue}
            prompt="가장 먼저 멈춰야 할 행동은 무엇일까요?"
          />
          <aside className={`agent-choice-result ${selected ? '' : 'is-empty'}`} aria-live="polite">
            {selected ? (
              <>
                <strong>{selected.suspicious ? '멈춰야 할 단서를 찾았어요' : '부탁한 범위 안의 행동이에요'}</strong>
                <span>{selected.feedback}</span>
              </>
            ) : <span>행동 하나를 고르면 판단 결과가 보여요.</span>}
          </aside>
          <button type="button" className="agent-stop-button" onClick={onTriggerKillSwitch} disabled={!canStop}>
            지금 멈추기
          </button>
        </div>
      ) : (
        <section className="agent-stop-result" aria-live="polite">
          <div className="is-stopped">
            <small>멈춘 일</small>
            <strong>{museumIncident.stopResult.stopped}</strong>
          </div>
          <div className="needs-recovery">
            <small>자동으로 되돌아가지 않은 일</small>
            <strong>{museumIncident.stopResult.notReversed}</strong>
          </div>
          <p>{museumIncident.stopResult.meaning}</p>
        </section>
      )}

      <AgentPageNav
        onPrev={() => setPhase('records')}
        onNext={onNext}
        prevLabel="작업 기록 다시 보기"
        nextLabel="멈춘 뒤 복구하기"
        disabled={!killSwitchTriggered}
      />
    </section>
  );
}
