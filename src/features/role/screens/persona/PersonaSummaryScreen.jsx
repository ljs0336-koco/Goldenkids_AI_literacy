import React from 'react';
import { roleScenarios } from '../../roleData';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function PersonaSummaryScreen({ currentScenarioId, personaRecipeChoices = {}, onTryScenario, onOpenRecord, onBackToActivities }) {
  const completedScenario = roleScenarios.find(scenario => scenario.id === currentScenarioId) || roleScenarios[0];
  const recipeId = personaRecipeChoices[completedScenario.id];
  const recipe = completedScenario.recipes.find(item => item.id === recipeId);
  const otherScenarios = roleScenarios.filter(scenario => scenario.id !== completedScenario.id);

  return (
    <section className="role-shell role-stage role-completion" aria-labelledby="persona-summary-title">
      <img src={geumjjokCelebration} alt="기뻐하는 금쪽이" />
      <span className="role-eyebrow">활용법 하나 완성</span>
      <h1 id="persona-summary-title">AI의 역할은 내가 정해요</h1>
      <p>상황에 맞는 역할을 고르고, 역할 두 개를 순서대로 이어 썼어요.</p>

      <section className="role-completion-record">
        <small>{completedScenario.situationTitle}</small>
        <strong>{recipe?.title}</strong>
        <p>{recipe?.prompt}</p>
      </section>

      <section className="role-next-scenarios" aria-labelledby="try-another-title">
        <h2 id="try-another-title">다른 상황도 해 볼까요?</h2>
        <p>하나만 해도 활동은 끝났어요. 궁금하면 다른 상황을 골라 비교해 보세요.</p>
        <div>
          {otherScenarios.map(scenario => (
            <button key={scenario.id} type="button" onClick={() => onTryScenario(scenario.id)}>
              <span>{scenario.category}</span>
              <strong>{scenario.situationTitle}</strong>
            </button>
          ))}
        </div>
      </section>

      <div className="role-completion-actions">
        <button type="button" className="btn-outline" onClick={onOpenRecord}>내 기록 보기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>다른 활동 고르기</button>
      </div>
    </section>
  );
}
