import React from 'react';
import { roleScenarios } from '../../roleData';
import RolePageCue from '../../components/RolePageCue';
import RolePageNav from '../../components/RolePageNav';

export default function PersonaScenarioScreen({ userPersonaChoices = {}, onSelectScenario, onPrev }) {
  return (
    <section className="role-shell role-stage" aria-labelledby="persona-scenario-title">
      <RolePageCue
        action="내가 해 보고 싶은 상황 카드 하나를 누르세요."
        reason="익숙한 상황에서 시작하면 AI에게 어떤 도움을 부탁할 수 있는지 더 쉽게 알 수 있어요."
      />

      <header className="role-page-head">
        <span className="role-eyebrow">부탁하는 방법 · 상황 고르기</span>
        <h1 id="persona-scenario-title">AI에게 이런 부탁도 할 수 있어요</h1>
        <p>AI에게 정답만 묻지 않아도 돼요. 마음 정리, 아이디어, 설명, 점검도 부탁할 수 있어요.</p>
      </header>

      <div className="role-scenario-grid">
        {roleScenarios.map((scenario, index) => {
          const completed = Boolean(userPersonaChoices[scenario.id]);
          return (
            <button key={scenario.id} type="button" className="role-scenario-card" onClick={() => onSelectScenario(scenario.id)}>
              <span className="role-scenario-number">{index + 1}</span>
              <span className="role-scenario-category">{scenario.category}</span>
              <strong>{scenario.situationTitle}</strong>
              <p>{scenario.everydayHook}</p>
              <span className="role-scenario-use">AI 활용 · {scenario.everydayUse}</span>
              <span className="role-scenario-action">{completed ? '다시 해보기' : '이 상황 해보기'} →</span>
            </button>
          );
        })}
      </div>

      <RolePageNav onPrev={onPrev} prevLabel="활동 고르기" />
    </section>
  );
}
