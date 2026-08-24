import React from 'react';
import { aiPersonas, roleScenarios } from '../../roleData';
import RoleChoiceFork from '../../components/RoleChoiceFork';
import RolePageCue from '../../components/RolePageCue';
import RolePageNav from '../../components/RolePageNav';

export default function PersonaCompareScreen({ scenarioId, userChoice, onChoosePersona, onNext, onPrev }) {
  const scenario = roleScenarios.find(item => item.id === scenarioId) || roleScenarios[0];
  const personaById = Object.fromEntries(aiPersonas.map(persona => [persona.id, persona]));
  const first = personaById[scenario.primaryRole];
  const second = personaById[scenario.secondaryRole];
  const alternative = personaById[scenario.alternativeRole];

  const options = [
    { id: first.id, label: `A. ${first.name}`, note: scenario.responses[first.id] },
    { id: second.id, label: `B. ${second.name}`, note: scenario.responses[second.id] }
  ];
  const third = { id: alternative.id, label: `C. ${alternative.name}`, note: scenario.responses[alternative.id] };

  return (
    <section className="role-shell role-stage" aria-labelledby="persona-compare-title">
      <RolePageCue
        action="A와 B 답을 읽고, 지금 먼저 필요한 도움을 고르세요."
        reason="같은 AI도 ‘어떤 역할로 답해 줘’라고 부탁하면 답의 방향이 달라져요."
      />

      <header className="role-page-head">
        <span className="role-eyebrow">{scenario.category}</span>
        <h1 id="persona-compare-title">같은 부탁, 다른 답</h1>
        <p>{scenario.everydayHook}</p>
      </header>

      <div className="role-dialogue">
        <div className="role-dialogue-row is-student">
          <span>나</span>
          <p>{scenario.userPrompt}</p>
        </div>
        <div className="role-dialogue-row is-generic">
          <span>그냥 답한 AI</span>
          <p>{scenario.genericResponse}</p>
        </div>
      </div>

      <RoleChoiceFork
        key={scenario.id}
        options={options}
        alternative={third}
        value={userChoice}
        onChange={personaId => onChoosePersona(scenario.id, personaId)}
        prompt="어떤 답이 지금 더 도움이 될까요?"
      />

      <aside className={`role-result-strip ${userChoice ? '' : 'is-empty'}`} aria-live="polite" aria-hidden={!userChoice}>
        {userChoice ? (
          <>
            <strong>내 선택 · {personaById[userChoice].name}</strong>
            <span>{personaById[userChoice].role}</span>
          </>
        ) : <span>선택 결과 자리</span>}
      </aside>

      <RolePageNav
        onPrev={onPrev}
        onNext={onNext}
        prevLabel="상황 다시 고르기"
        nextLabel="두 역할 이어 쓰기"
        disabled={!userChoice}
      />
    </section>
  );
}
