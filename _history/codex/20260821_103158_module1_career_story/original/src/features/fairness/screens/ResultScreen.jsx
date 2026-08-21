import React, { useState } from 'react';
import { getRecommendationDiff, evaluateTeamRoleBalance } from '../fairnessEngine';
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

function TeamList({ title, team, highlightedIds = [] }) {
  return (
    <section className="fair-record-page">
      <span className="fair-eyebrow">대표팀 명단</span>
      <h3>{title}</h3>
      <div className="flex flex-col gap-2" style={{ marginTop: '16px' }}>
        {team.map(candidate => (
          <div key={candidate.id} style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', gap: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: highlightedIds.includes(candidate.id) ? '#edf2ee' : 'white' }}>
            <span><strong>{candidate.name}</strong> · {candidate.keyStrength}</span>
            <span>{candidate.score}점{highlightedIds.includes(candidate.id) ? ' · 새로 포함' : ''}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ResultScreen({ oldResults = [], newResults = [], questionId, onQuestion, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const diff = getRecommendationDiff(oldResults, newResults);
  const roleBalance = evaluateTeamRoleBalance(newResults);

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>
          {pageIndex === 0 ? '기존 기준의 추천부터 봐요' : pageIndex === 1 ? '내가 고른 기준의 추천이에요' : '명단보다 중요한 것을 확인해요'}
        </h2>
        <p className="fair-one-line-help">
          {pageIndex < 2 ? '장을 넘기며 어떤 친구가 달라졌는지 살펴보세요.' : '팀에 필요한 역할과 AI의 설명을 확인하세요.'}
        </p>
      </div>

      {pageIndex === 0 && <TeamList title="기존 기준으로 구성한 대표팀" team={oldResults} />}
      {pageIndex === 1 && <TeamList title="우리 기준으로 구성한 대표팀" team={newResults} highlightedIds={diff.newlyAddedIds} />}
      {pageIndex === 2 && (
        <>
          <section className="fair-record-page">
            <span className="fair-eyebrow">팀 역할 확인</span>
            <h3>네 역할이 모두 있나요?</h3>
            <div className="flex flex-col gap-2" style={{ marginTop: '14px' }}>
              {roleLabels.map(([key, label]) => (
                <div key={key} style={{ padding: '11px 13px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)' }}>
                  <span>{label}</span>
                  <strong>{roleBalance[key] ? '담당 있음' : '더 살펴보기'}</strong>
                </div>
              ))}
            </div>
          </section>
          <AiExchangePanel
            questions={teamQuestions}
            selectedId={questionId}
            onSelect={onQuestion}
            title="AI의 대표팀 추천에 한 가지를 물어보세요"
          />
          <ConceptBridge>
            공정한 AI는 결과만 보여 주는 것으로 충분하지 않아요. 어떤 기준으로 골랐는지 질문하고 다시 검토할 수 있어야 해요.
          </ConceptBridge>
        </>
      )}

      <PageTurnNav
        current={pageIndex}
        total={3}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(2, index + 1))}
        prevLabel="이전 결과"
        nextLabel="다음 결과"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 기준 바꾸기</button>
        <button className="btn-primary" onClick={onNext} disabled={pageIndex !== 2 || !questionId} style={{ minHeight: '52px' }}>
          {pageIndex !== 2 ? '마지막 장까지 확인해 주세요' : questionId ? '이의제기 상황 보기 →' : 'AI에게 질문을 하나 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
