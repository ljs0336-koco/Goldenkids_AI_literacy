import React from 'react';
import { projectTeamCandidates, projectTeamPresets } from '../fairnessData';
import { calculateTeamCandidateScore, evaluateTeamCandidates } from '../fairnessEngine';
import { appealConsequences } from '../fairnessLearningData';
import ConceptBridge from '../components/ConceptBridge';
import geumjjokTouched from '../../../assets/geumjjok/금쪽이_표정_감동.png';

export default function AppealResultScreen({ appealChoice = 2, criteriaWeights, onNext, onPrev }) {
  const activeWeights = criteriaWeights || projectTeamPresets[1].weights;
  const beforeResults = evaluateTeamCandidates(projectTeamCandidates, activeWeights);
  const hangyeolBefore = projectTeamCandidates.find(candidate => candidate.id === 'hangyeol');
  const hangyeolCorrected = { ...hangyeolBefore, communicationCollaboration: 92 };
  const correctedCandidates = projectTeamCandidates.map(candidate => candidate.id === 'hangyeol' ? hangyeolCorrected : candidate);
  const correctedResults = evaluateTeamCandidates(correctedCandidates, activeWeights);
  const hangyeolScoreBefore = calculateTeamCandidateScore(hangyeolBefore, activeWeights);
  const hangyeolScoreAfter = calculateTeamCandidateScore(hangyeolCorrected, activeWeights);
  const consequence = appealConsequences[appealChoice] || appealConsequences[2];

  let shownResults = beforeResults;
  if (appealChoice === 2) shownResults = correctedResults;
  if (appealChoice === 3 && !beforeResults.some(candidate => candidate.id === 'hangyeol')) {
    shownResults = [...beforeResults.slice(0, 3), { ...hangyeolBefore, score: hangyeolScoreBefore, forcedException: true }];
  }

  const title = appealChoice === 2
    ? '기록을 바로잡고 다시 계산한 결과예요'
    : appealChoice === 1
      ? '결과를 그대로 두면 무엇이 남을까요?'
      : '한 사람만 예외로 넣으면 무엇이 달라질까요?';

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img src={geumjjokTouched} alt="생각을 정리하는 금쪽이" style={{ width: '64px', height: 'auto', marginBottom: '8px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>{title}</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          내가 고른 대응이 데이터, 규칙, 대표팀 명단에 어떤 영향을 남기는지 함께 살펴봐요.
        </p>
      </div>

      <div className={`fair-consequence ${consequence.tone}`}>
        <h3>{consequence.title}</h3>
        <p>{consequence.summary}</p>
        <p><strong>판단의 단서:</strong> {consequence.lesson}</p>
      </div>

      <section style={{ backgroundColor: '#f4f1e9', padding: '18px 20px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0, fontSize: 'var(--font-size-lg)' }}>한결 학생의 기록은 어떻게 되었나요?</h3>
        {appealChoice === 2 ? (
          <>
            <p><strong>의사소통·협력: 70점 ➔ 92점</strong>으로 기록을 정정했어요.</p>
            <p style={{ marginBottom: 0 }}>선택한 기준의 계산 점수도 <strong>{hangyeolScoreBefore}점 ➔ {hangyeolScoreAfter}점</strong>으로 달라졌어요.</p>
          </>
        ) : (
          <p style={{ marginBottom: 0 }}><strong>의사소통·협력 70점이 그대로 남아 있어요.</strong> 실제로 확인된 92점과 데이터가 아직 일치하지 않아요.</p>
        )}
      </section>

      <section style={{ marginBottom: '22px' }} aria-labelledby="appeal-result-team-title">
        <h3 id="appeal-result-team-title" style={{ fontSize: 'var(--font-size-lg)' }}>이 선택 뒤 화면에 보이는 대표팀</h3>
        <div className="flex flex-col gap-2">
          {shownResults.map(candidate => (
            <div key={candidate.id} style={{ padding: '12px 15px', backgroundColor: candidate.id === 'hangyeol' ? '#e9f0ec' : 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <span><strong>{candidate.name}</strong>{candidate.forcedException ? ' · 예외로 포함' : ''}</span>
              <span>{candidate.score}점</span>
            </div>
          ))}
        </div>
      </section>

      <ConceptBridge>
        공정성은 “마음에 드는 명단이 나왔는가”만으로 판단하지 않아요. 사실에 맞는 데이터, 모두에게 설명 가능한 기준, 오류를 다시 검토하는 절차를 함께 살펴야 해요.
      </ConceptBridge>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 선택 바꾸기</button>
        <button className="btn-primary" onClick={onNext} style={{ minHeight: '52px' }}>내가 지킬 운영 원칙 정하기 →</button>
      </div>
    </div>
  );
}
