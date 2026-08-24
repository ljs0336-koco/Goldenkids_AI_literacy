import React from 'react';
import { aiPersonas, roleScenarios } from '../../roleData';
import RoleChoiceFork from '../../components/RoleChoiceFork';
import RolePageCue from '../../components/RolePageCue';
import RolePageNav from '../../components/RolePageNav';
import RoleSpeakerNote from '../../components/RoleSpeakerNote';

export default function PersonaFeedbackScreen({ scenarioId, userChoice, recipeChoice, onChooseRecipe, onComplete, onPrev }) {
  const scenario = roleScenarios.find(item => item.id === scenarioId) || roleScenarios[0];
  const chosenPersona = aiPersonas.find(persona => persona.id === userChoice);
  const recipeOptions = scenario.recipes.map((recipe, index) => ({
    id: recipe.id,
    label: `${index === 0 ? 'A' : 'B'}. ${recipe.title}`,
    note: recipe.prompt
  }));
  const selectedRecipe = scenario.recipes.find(recipe => recipe.id === recipeChoice);

  return (
    <section className="role-shell role-stage" aria-labelledby="persona-feedback-title">
      <RolePageCue
        action="두 부탁 문장 중 하나를 골라 역할의 순서를 정하세요."
        reason="AI에게 역할, 할 일, 답하는 순서를 함께 말하면 필요한 도움을 더 또렷하게 받을 수 있어요."
      />

      <header className="role-page-head">
        <span className="role-eyebrow">부탁 고쳐 쓰기</span>
        <h1 id="persona-feedback-title">한 역할보다, 필요한 순서대로</h1>
        <p>{scenario.roleGuidance}</p>
      </header>

      <section className="role-choice-review">
        <img src={chosenPersona?.avatar} alt="" aria-hidden="true" />
        <div>
          <small>내가 먼저 고른 역할</small>
          <h2>{chosenPersona?.name}</h2>
          <p>{chosenPersona?.caution}</p>
        </div>
      </section>

      <RoleChoiceFork
        key={scenario.id}
        options={recipeOptions}
        value={recipeChoice}
        onChange={recipeId => onChooseRecipe(scenario.id, recipeId)}
        prompt="어떤 순서로 부탁해 볼까요?"
      />

      <section className={`role-prompt-result ${selectedRecipe ? '' : 'is-empty'}`} aria-live="polite" aria-hidden={!selectedRecipe}>
        {selectedRecipe ? (
          <>
          <span>내가 완성한 부탁</span>
          <blockquote>{selectedRecipe.prompt}</blockquote>
          <p><strong>달라지는 점</strong> · {selectedRecipe.result}</p>
          <div className="role-keyword-formula">
            <span>역할</span><b>+</b><span>할 일</span><b>+</b><span>조건과 순서</span>
          </div>
          <small>이처럼 AI에게 원하는 일을 또렷하게 적은 부탁 문장을 ‘프롬프트’라고 해요.</small>
          </>
        ) : <span>완성한 부탁 자리</span>}
      </section>

      <RoleSpeakerNote />

      <RolePageNav
        onPrev={onPrev}
        onNext={onComplete}
        prevLabel="답 다시 비교하기"
        nextLabel="내 활용법 확인하기"
        disabled={!recipeChoice}
      />
    </section>
  );
}
