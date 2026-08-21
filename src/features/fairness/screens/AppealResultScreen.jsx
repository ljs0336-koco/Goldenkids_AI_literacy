import React, { useState } from 'react';
import { projectTeamCandidates, projectTeamPresets } from '../fairnessData';
import { evaluateTeamCandidates } from '../fairnessEngine';
import { appealConsequences } from '../fairnessLearningData';
import ConceptBridge from '../components/ConceptBridge';
import PageTurnNav from '../components/PageTurnNav';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function AppealResultScreen({ appealChoice = 2, criteriaWeights, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const activeWeights = criteriaWeights || projectTeamPresets[1].weights;
  const beforeResults = evaluateTeamCandidates(projectTeamCandidates, activeWeights);
  const hangyeolBefore = projectTeamCandidates.find(candidate => candidate.id === 'hangyeol');
  const correctedCandidates = projectTeamCandidates.map(candidate => candidate.id === 'hangyeol'
    ? { ...candidate, communicationCollaboration: 92 }
    : candidate);
  const correctedResults = evaluateTeamCandidates(correctedCandidates, activeWeights);
  const consequence = appealConsequences[appealChoice] || appealConsequences[2];

  let shownResults = beforeResults;
  if (appealChoice === 2) shownResults = correctedResults;
  if (appealChoice === 3 && !beforeResults.some(candidate => candidate.id === 'hangyeol')) {
    shownResults = [...beforeResults.slice(0, 3), { ...hangyeolBefore, forcedException: true }];
  }

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokTouched} alt="생각을 정리하는 금쪽이" className="fair-scene-character" />
        <span className="fair-eyebrow">내 선택 뒤에 생긴 일</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>
          {pageIndex === 0 ? '한결이의 기록은 바로잡혔을까요?' : pageIndex === 1 ? '프로젝트 팀에는 어떤 결과가 남았을까요?' : '공정한 재검토에는 세 가지가 함께 필요해요'}
        </h2>
      </div>

      {pageIndex === 0 && (
        <>
          <div className={`fair-consequence ${consequence.tone}`} role="status">
            <h3>{consequence.title}</h3>
            <p>{consequence.summary}</p>
          </div>
          <section className={`fair-record-change ${appealChoice === 2 ? 'is-corrected' : ''}`}>
            <small>한결이의 의사소통·협력 기록</small>
            {appealChoice === 2 ? (
              <div><del>70점</del><span aria-hidden="true">→</span><strong>92점</strong></div>
            ) : (
              <div><strong>70점 그대로</strong><span>확인된 실제 기록은 92점이에요.</span></div>
            )}
          </section>
        </>
      )}

      {pageIndex === 1 && (
        <section className="fair-final-team" aria-labelledby="appeal-team-title">
          <span className="fair-eyebrow">내 대응 뒤에 보이는 팀</span>
          <h3 id="appeal-team-title">네 명의 프로젝트 팀</h3>
          <ol>
            {shownResults.map(candidate => (
              <li key={candidate.id} className={candidate.id === 'hangyeol' ? 'is-highlighted' : ''}>
                <strong>{candidate.name}</strong>
                <span>{candidate.forcedException ? '기록은 고치지 않고 예외로 포함' : candidate.keyStrength}</span>
              </li>
            ))}
          </ol>
          <p>{appealChoice === 2
            ? '명단이 바뀌는지와 관계없이, 확인된 기록은 먼저 사실에 맞게 고쳐야 해요.'
            : '명단만 조정해도 잘못된 기록과 설명하기 어려운 절차는 그대로 남아요.'}</p>
        </section>
      )}

      {pageIndex === 2 && (
        <section className="fair-review-rules">
          <ol>
            <li><strong>기록</strong><span>빠지거나 틀린 자료를 확인하고 고쳐요.</span></li>
            <li><strong>기준</strong><span>누구에게나 설명할 수 있는 같은 기준을 사용해요.</span></li>
            <li><strong>절차</strong><span>결과에 질문하고 다시 살필 방법을 마련해요.</span></li>
          </ol>
          <ConceptBridge>
            공정성은 마음에 드는 명단이 나왔는지만 보는 일이 아니에요. 사실에 맞는 기록, 공개된 기준, 다시 검토할 절차를 함께 살펴야 해요.
          </ConceptBridge>
        </section>
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
        <button className="btn-outline" onClick={onPrev}>← 대응 다시 고르기</button>
        <button className="btn-primary" onClick={onNext} disabled={pageIndex !== 2} style={{ minHeight: '52px' }}>
          {pageIndex === 2 ? '다음 팀 구성에서 지킬 약속 정하기 →' : '재검토 과정을 끝까지 확인해 주세요'}
        </button>
      </div>
    </div>
  );
}
