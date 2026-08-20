import React, { useState } from 'react';
import { getMissionById, getToolById } from '../../agentEngine';
import geumjjokIdea from '../../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

const stepMeta = {
  plan_summary: { label: '계획 요약', icon: '🧭', color: '#4338ca', background: '#eef2ff' },
  tool_request: { label: '도구 요청', icon: '🧰', color: '#0369a1', background: '#f0f9ff' },
  observation: { label: '관찰 결과', icon: '🔎', color: '#0f766e', background: '#f0fdfa' },
  approval_needed: { label: '사람 확인 필요', icon: '✋', color: '#b91c1c', background: '#fef2f2' }
};

export default function MissionPlanScreen({ missionId, onNext, onPrev }) {
  const mission = getMissionById(missionId);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const handleNextStep = () => {
    if (currentStepIndex < mission.steps.length) setCurrentStepIndex(previous => previous + 1);
    else onNext?.();
  };

  return (
    <div className="agent-screen-width">
      <div className="text-center mb-5">
        <div className="agent-screen-icon" aria-hidden="true">{mission.icon}</div>
        <h2 className="agent-page-title">{mission.title}</h2>
        <p className="agent-page-lead">숨겨진 생각을 보여 주는 화면이 아니라, 실행 전에 공유할 수 있는 계획·도구 요청·관찰 기록을 단계별로 살펴보는 화면입니다.</p>
      </div>

      <section className="agent-timeline" aria-label="에이전트 실행 기록">
        <div className="agent-timeline-heading">
          <img src={geumjjokIdea} alt="" aria-hidden="true" />
          <strong>실행 기록 {currentStepIndex} / {mission.steps.length}</strong>
        </div>
        <div className="agent-timeline-list">
          {mission.steps.slice(0, currentStepIndex).map(step => {
            const meta = stepMeta[step.type];
            const tool = step.toolId ? getToolById(step.toolId) : null;
            return (
              <article key={step.stepIndex} className="agent-timeline-item" style={{ borderColor: meta.color, backgroundColor: meta.background }}>
                <div className="agent-timeline-label" style={{ color: meta.color }}>
                  <span aria-hidden="true">{meta.icon}</span> {step.stepIndex}. {meta.label}
                  {tool && <span className="agent-tool-chip">{tool.icon} {tool.name} · {tool.riskLabel}</span>}
                </div>
                <p>{step.text}</p>
                {step.warningMessage && <div className="agent-warning-note">{step.warningMessage}</div>}
              </article>
            );
          })}
        </div>
      </section>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 미션 다시 고르기</button>
        <button type="button" className="btn-primary" onClick={handleNextStep}>
          {currentStepIndex < mission.steps.length
            ? `다음 기록 보기 (${currentStepIndex}/${mission.steps.length}) →`
            : '근거 확인 지점으로 이동하기 →'}
        </button>
      </div>
    </div>
  );
}
