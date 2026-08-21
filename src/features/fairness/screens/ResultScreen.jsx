import React, { useState } from 'react';
import { evaluateTeamRoleBalance, getRecommendationDiff } from '../fairnessEngine';
import { teamQuestions } from '../fairnessLearningData';
import AiExchangePanel from '../components/AiExchangePanel';
import PageTurnNav from '../components/PageTurnNav';
import ConceptBridge from '../components/ConceptBridge';

const roleLabels = [
  ['problemDiscovery', '문제 발견·기획'],
  ['digitalMaking', '디지털 제작'],
  ['communicationCollaboration', '의사소통·협력'],
  ['presentation', '발표·표현']
];

function NameStrip({ label, team, changedIds = [] }) {
  return (
    <div className="fair-team-strip">
      <small>{label}</small>
      <div>
        {team.map(candidate => (
          <strong key={candidate.id} className={changedIds.includes(candidate.id) ? 'is-changed' : ''}>
            {candidate.name}{changedIds.includes(candidate.id) ? ' · 새로 포함' : ''}
          </strong>
        ))}
      </div>
    </div>
  );
}

export default function ResultScreen({ oldResults = [], newResults = [], questionId, onQuestion, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const diff = getRecommendationDiff(oldResults, newResults);
  const roleBalance = evaluateTeamRoleBalance(newResults);
  const hasChanges = diff.newlyAdded.length > 0 || diff.excluded.length > 0;

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <span className="fair-eyebrow">기준이 결과에 남긴 흔적</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>
          {pageIndex === 0 ? '기준을 바꾸면 팀도 달라질까요?' : pageIndex === 1 ? '누구의 기회가 달라졌을까요?' : '명단이 프로젝트의 목표와 맞는지 확인해요'}
        </h2>
        <p className="fair-one-line-help">
          {pageIndex < 2 ? '이름만 비교하지 말고 어떤 기준 때문에 달라졌는지 생각해 보세요.' : '필요한 역할과 AI의 설명을 마지막으로 확인하세요.'}
        </p>
      </div>

      {pageIndex === 0 && (
        <section className="fair-team-comparison" aria-label="기준 변경 전후 팀 비교">
          <NameStrip label="AI의 처음 기준" team={oldResults} />
          <div className="fair-comparison-arrow" aria-hidden="true">↓</div>
          <NameStrip label="내가 고른 기준" team={newResults} changedIds={diff.newlyAddedIds} />
          <p>{hasChanges ? '기준을 바꾸자 새로 기회를 얻은 학생과 명단에서 빠진 학생이 생겼어요.' : '이번에는 명단이 같지만, 무엇을 중요하게 보았는지는 달라졌어요.'}</p>
        </section>
      )}

      {pageIndex === 1 && (
        <section className="fair-opportunity-comparison">
          {hasChanges ? (
            <>
              <article>
                <small>새로 포함된 학생</small>
                {diff.newlyAdded.map(candidate => (
                  <div key={candidate.id}><strong>{candidate.name}</strong><span>{candidate.keyStrength}</span></div>
                ))}
              </article>
              <article>
                <small>이번 명단에서 빠진 학생</small>
                {diff.excluded.map(candidate => (
                  <div key={candidate.id}><strong>{candidate.name}</strong><span>{candidate.keyStrength}</span></div>
                ))}
              </article>
            </>
          ) : (
            <article className="is-full">
              <small>명단이 같아도 확인할 것</small>
              <h3>같은 네 명이 나왔다고 기준이 중요하지 않은 것은 아니에요</h3>
              <p>팀의 목표가 바뀌거나 기록이 수정되면 결과가 달라질 수 있어요. 어떤 기준을 썼는지 남겨야 다음 결과도 설명할 수 있어요.</p>
            </article>
          )}
        </section>
      )}

      {pageIndex === 2 && (
        <>
          <section className="fair-record-page">
            <span className="fair-eyebrow">프로젝트 역할 확인</span>
            <h3>네 역할이 모두 보이나요?</h3>
            <div className="fair-role-checks">
              {roleLabels.map(([key, label]) => (
                <div key={key}>
                  <span>{label}</span>
                  <strong>{roleBalance[key] ? '맡을 사람이 보여요' : '한 번 더 살펴봐요'}</strong>
                </div>
              ))}
            </div>
          </section>
          <AiExchangePanel
            questions={teamQuestions}
            selectedId={questionId}
            onSelect={onQuestion}
            title="AI의 팀 추천에 한 가지를 물어보세요"
          />
          <ConceptBridge>
            공정한 추천은 명단만 보여 주는 것으로 끝나지 않아요. 목표와 기준을 설명하고, 빠진 역할이나 달라진 기회를 다시 살펴볼 수 있어야 해요.
          </ConceptBridge>
        </>
      )}

      <PageTurnNav
        current={pageIndex}
        total={3}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(2, index + 1))}
        prevLabel="이전 비교"
        nextLabel="다음 비교"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 기준 바꾸기</button>
        <button className="btn-primary" onClick={onNext} disabled={pageIndex !== 2 || !questionId} style={{ minHeight: '52px' }}>
          {pageIndex !== 2 ? '역할 확인 장면까지 넘겨 보세요' : questionId ? '잘못된 기록이 발견된 장면 보기 →' : 'AI에게 물어볼 질문을 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
