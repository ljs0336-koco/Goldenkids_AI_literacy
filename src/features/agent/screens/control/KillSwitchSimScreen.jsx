import React, { useEffect, useState } from 'react';
import { killSwitchAnomaly } from '../../agentData';
import geumjjokEmbarrassed from '../../../../assets/geumjjok/금쪽이_표정_당황.png';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function KillSwitchSimScreen({
  killSwitchTriggered,
  incidentResponseChecks = [],
  onTriggerKillSwitch,
  onToggleIncidentCheck,
  onNext,
  onPrev
}) {
  const [visibleLogCount, setVisibleLogCount] = useState(killSwitchTriggered ? killSwitchAnomaly.anomalyLog.length : 1);
  const allResponseChecksDone = killSwitchAnomaly.responseChecks.every(check => incidentResponseChecks.includes(check.id));

  useEffect(() => {
    if (killSwitchTriggered || visibleLogCount >= killSwitchAnomaly.anomalyLog.length) return undefined;
    const timer = window.setTimeout(() => setVisibleLogCount(count => count + 1), 650);
    return () => window.clearTimeout(timer);
  }, [killSwitchTriggered, visibleLogCount]);

  const shownLogs = killSwitchTriggered
    ? [...killSwitchAnomaly.anomalyLog, ...killSwitchAnomaly.containmentLog]
    : killSwitchAnomaly.anomalyLog.slice(0, visibleLogCount);

  let heading = '이상 징후 발견: 새 실행을 중단할까요?';
  if (killSwitchTriggered) heading = allResponseChecksDone ? '사고 대응 절차 점검 완료' : '새 실행 중단됨 · 후속 확인 필요';

  return (
    <div className="agent-screen-width">
      <div className="text-center mb-5">
        <h2 className={`agent-page-title ${killSwitchTriggered ? '' : 'agent-danger-title'}`}>{heading}</h2>
        <p className="agent-page-lead">
          {killSwitchTriggered
            ? '중단 버튼은 추가 실행을 막는 시작점입니다. 권한 회수와 이미 일어난 결과 확인까지 이어가세요.'
            : '로그에서 중복 요청의 단서를 찾고, 더 큰 영향이 생기기 전에 사람이 개입하세요.'}
        </p>
      </div>

      <section className={`agent-incident-card ${killSwitchTriggered ? 'is-contained' : ''}`}>
        <img src={killSwitchTriggered ? geumjjokDoctor : geumjjokEmbarrassed} alt="" aria-hidden="true" />
        <div>
          <strong>⚠️ {killSwitchAnomaly.title}</strong>
          <p>{killSwitchTriggered ? killSwitchAnomaly.containedMessage : killSwitchAnomaly.scenario}</p>
        </div>
      </section>

      <section className="agent-console" aria-label="가상 에이전트 실행 로그" aria-live="polite">
        <div className="agent-console-heading">수업용 가상 실행 로그 · 실제 결제는 발생하지 않습니다</div>
        {shownLogs.map((log, index) => (
          <div key={`${log.time}-${index}`} className={log.text.includes('확인 필요') ? 'needs-attention' : ''}>
            <span>[{log.time}]</span> {log.text}
          </div>
        ))}
        {killSwitchTriggered && <div className="is-stopped">[상태] 새 실행 중단 요청 적용 · 과거 실행 결과 확인 대기</div>}
      </section>

      <div className="agent-stop-action">
        <button
          type="button"
          onClick={() => onTriggerKillSwitch?.()}
          disabled={killSwitchTriggered}
          className="agent-stop-button"
        >
          {killSwitchTriggered ? '중단 요청 완료' : '새 실행 중단 + 임시 권한 회수'}
        </button>
      </div>

      {killSwitchTriggered && (
        <fieldset className="agent-response-panel">
          <legend>중단 뒤에 이어질 대응을 확인하세요</legend>
          {killSwitchAnomaly.responseChecks.map(check => {
            const checked = incidentResponseChecks.includes(check.id);
            return (
              <label key={check.id} className={checked ? 'is-checked' : ''}>
                <input type="checkbox" checked={checked} onChange={() => onToggleIncidentCheck?.(check.id)} />
                <span>{check.label}</span>
              </label>
            );
          })}
        </fieldset>
      )}

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 통제 설정 다시 보기</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!killSwitchTriggered || !allResponseChecksDone}>
          {allResponseChecksDone ? 'AI 감독관 원칙 정리하기 →' : '중단 후 세 가지 대응을 모두 확인하세요'}
        </button>
      </div>
    </div>
  );
}
