import React from 'react';
import { taskZoneOptions, workTasks } from '../../roleData';
import RoleChoiceFork from '../../components/RoleChoiceFork';
import RolePageCue from '../../components/RolePageCue';
import RolePageNav from '../../components/RolePageNav';

export default function TaskClassifyScreen({
  introSeen,
  currentTaskIndex,
  taskClassifications = {},
  onStart,
  onClassifyTask,
  onNextTask,
  onPrevTask,
  onFinish,
  onPrev
}) {
  if (!introSeen) {
    return (
      <section className="role-shell role-stage" aria-labelledby="task-intro-title">
        <RolePageCue
          action="생활 속 예시를 읽고 ‘학교 축제 일 나누기’를 누르세요."
          reason="AI를 많이 써 보지 않았어도, 어떤 일을 맡길 수 있는지 먼저 떠올릴 수 있어요."
        />
        <header className="role-page-head">
          <span className="role-eyebrow">맡기는 범위 · 먼저 알아보기</span>
          <h1 id="task-intro-title">우리도 이미 ‘도구와 일 나누기’를 해요</h1>
          <p>계산기는 계산을 하고, 번역 앱은 첫 번역을 만들어요. 하지만 무엇을 믿고 쓸지는 사람이 확인해요.</p>
        </header>

        <div className="role-everyday-cards">
          <article><span>규칙</span><strong>이름 순서로 정리</strong><p>정해진 방법대로 반복하는 일은 간단한 프로그램도 할 수 있어요.</p></article>
          <article><span>AI 도움</span><strong>문구나 번역 초안</strong><p>AI는 여러 표현을 빠르게 만들지만 틀리거나 상황에 안 맞을 수 있어요.</p></article>
          <article><span>사람 결정</span><strong>무엇을 선택할지 판단</strong><p>사람에게 미치는 영향과 책임을 생각해 마지막 선택을 해요.</p></article>
        </div>

        <aside className="role-fact-note">
          <strong>잠깐, 자동화가 모두 AI는 아니에요.</strong>
          <p>가나다순 정리처럼 정해진 규칙만 따르는 기능은 ‘자동화’일 수 있어요. AI는 글이나 분류 결과처럼 새 답을 만들거나 예측하는 데 쓰일 수 있어요.</p>
        </aside>

        <RolePageNav onPrev={onPrev} onNext={onStart} prevLabel="활동 고르기" nextLabel="학교 축제 일 나누기" />
      </section>
    );
  }

  const task = workTasks[currentTaskIndex] || workTasks[0];
  const selectedZone = taskClassifications[task.id];
  const selectedOption = taskZoneOptions.find(option => option.id === selectedZone);
  const recommendedOption = taskZoneOptions.find(option => option.id === task.recommendedZone);
  const isLast = currentTaskIndex === workTasks.length - 1;

  return (
    <section className="role-shell role-stage" aria-labelledby="task-title">
      <RolePageCue
        action="A와 B 중 하나를 고르고, 나타난 역할 구분을 확인하세요."
        reason="일 전체를 AI에게 넘기지 않고, 작은 일로 나누면 무엇을 맡길지 판단하기 쉬워요."
      />

      <header className="role-page-head role-task-head">
        <div>
          <span className="role-eyebrow">학교 축제 준비 · {currentTaskIndex + 1} / {workTasks.length}</span>
          <h1 id="task-title">{task.title}</h1>
          <p>{task.description}</p>
        </div>
        <span className="role-task-keyword">{task.category}</span>
      </header>

      <RoleChoiceFork
        key={task.id}
        options={taskZoneOptions.slice(0, 2)}
        alternative={taskZoneOptions[2]}
        value={selectedZone}
        onChange={zone => onClassifyTask(task.id, zone)}
        prompt="이 일은 누가 맡는 것이 좋을까요?"
      />

      <section className={`role-task-result ${selectedZone ? '' : 'is-empty'}`} aria-live="polite" aria-hidden={!selectedZone}>
        {selectedZone ? (
          <>
          <div className="role-task-result-head">
            <span>내 선택</span>
            <strong>{selectedOption.shortLabel}</strong>
          </div>
          <p className="role-task-guidance"><strong>살펴볼 기준 · {recommendedOption.shortLabel}</strong><br />{task.rationale}</p>
          <div className="role-task-role-map">
            <article><small>도구가 할 일</small><p>{task.aiPart}</p></article>
            <span aria-hidden="true">→</span>
            <article><small>사람이 확인할 일</small><p>{task.humanPart}</p></article>
            <span aria-hidden="true">→</span>
            <article><small>책임</small><p>{task.responsibility}</p></article>
          </div>
          </>
        ) : <span>역할 결과 자리</span>}
      </section>

      <RolePageNav
        onPrev={currentTaskIndex === 0 ? onPrev : onPrevTask}
        onNext={isLast ? onFinish : onNextTask}
        prevLabel={currentTaskIndex === 0 ? '활동 고르기' : '이전 일'}
        nextLabel={isLast ? '완성한 역할 지도 보기' : '다음 일'}
        disabled={!selectedZone}
      />
    </section>
  );
}
