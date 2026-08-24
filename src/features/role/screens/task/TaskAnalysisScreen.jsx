import React from 'react';
import { rolePrinciples, taskZoneOptions, workTasks } from '../../roleData';
import RoleChoiceFork from '../../components/RoleChoiceFork';
import RolePageCue from '../../components/RolePageCue';
import RolePageNav from '../../components/RolePageNav';

export default function TaskAnalysisScreen({ page, taskClassifications = {}, selectedPrinciples = [], onSelectPrinciple, onNextPage, onPrevPage, onComplete }) {
  if (page === 0) {
    return (
      <section className="role-shell role-stage" aria-labelledby="role-map-title">
        <RolePageCue action="네 가지 일의 역할 지도를 위에서 아래로 읽으세요." reason="누가 더 똑똑한지가 아니라, 도구와 사람이 어떤 순서로 일하는지 보는 활동이에요." />
        <header className="role-page-head">
          <span className="role-eyebrow">완성한 역할 지도</span>
          <h1 id="role-map-title">도구가 시작하고, 사람이 끝내요</h1>
          <p>일마다 알맞은 방법은 다르지만 확인과 책임은 빠지지 않아요.</p>
        </header>

        <div className="role-map-list">
          {workTasks.map(task => {
            const chosen = taskZoneOptions.find(option => option.id === taskClassifications[task.id]);
            return (
              <article key={task.id}>
                <span>{task.title}</span>
                <strong>{chosen?.shortLabel || '선택 없음'}</strong>
                <p>{task.aiPart} <b>→</b> {task.humanPart}</p>
              </article>
            );
          })}
        </div>

        <div className="role-keyword-formula is-wide">
          <span>AI·자동화</span><b>→</b><span>사람 확인</span><b>→</b><span>수정</span><b>→</b><span>사람 최종 결정</span>
        </div>
        <RolePageNav onPrev={onPrevPage} onNext={onNextPage} prevLabel="마지막 일 다시 보기" nextLabel="맡기기 전 질문 보기" />
      </section>
    );
  }

  if (page === 1) {
    return (
      <section className="role-shell role-stage" aria-labelledby="role-check-title">
        <RolePageCue action="세 단어를 소리 내어 읽고, 각 질문을 한 번 생각해 보세요." reason="AI가 할 수 있는지만 묻지 않고 상황과 영향을 함께 보면 더 안전하게 맡길 수 있어요." />
        <header className="role-page-head">
          <span className="role-eyebrow">맡기기 전 확인</span>
          <h1 id="role-check-title">세 가지만 먼저 물어요</h1>
          <p>정답을 외우기보다 어떤 일을 맡길 때마다 다시 써 보는 질문이에요.</p>
        </header>
        <div className="role-check-grid">
          <article><span>사람</span><h2>누가 영향을 받을까?</h2><p>학생, 방문객처럼 결과를 직접 보거나 사용하는 사람을 떠올려요.</p></article>
          <article><span>상황</span><h2>AI가 모르는 맥락은?</h2><p>우리 학교의 분위기, 실제 일정, 말의 느낌처럼 빠진 정보를 찾아요.</p></article>
          <article><span>책임</span><h2>누가 마지막으로 확인할까?</h2><p>오류가 생겼을 때 설명하고 고칠 사람을 정해요.</p></article>
        </div>
        <RolePageNav onPrev={onPrevPage} onNext={onNextPage} prevLabel="역할 지도" nextLabel="내 원칙 고르기" />
      </section>
    );
  }

  const options = rolePrinciples.slice(0, 2).map((principle, index) => ({
    id: principle,
    label: `${index === 0 ? 'A' : 'B'}. ${principle}`
  }));
  const alternative = { id: rolePrinciples[2], label: `C. ${rolePrinciples[2]}` };
  const selected = selectedPrinciples[0];

  return (
    <section className="role-shell role-stage" aria-labelledby="role-principle-title">
      <RolePageCue action="가장 먼저 지키고 싶은 원칙 하나를 고르세요." reason="모든 문장을 고르는 것보다, 다음 AI 활용에서 바로 실천할 한 가지를 정하는 것이 중요해요." />
      <header className="role-page-head">
        <span className="role-eyebrow">내 활용 원칙</span>
        <h1 id="role-principle-title">다음에는 이것부터 확인할래요</h1>
        <p>내가 실제로 지킬 수 있는 약속 하나면 충분해요.</p>
      </header>
      <RoleChoiceFork
        options={options}
        alternative={alternative}
        value={selected}
        onChange={principle => onSelectPrinciple(principle)}
        prompt="가장 먼저 지킬 약속은 무엇인가요?"
      />
      <RolePageNav onPrev={onPrevPage} onNext={onComplete} prevLabel="확인 질문" nextLabel="활동 마치기" disabled={!selected} />
    </section>
  );
}
