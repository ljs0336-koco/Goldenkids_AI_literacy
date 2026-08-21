import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent,
  activityRecommendationSupplementRecords,
  projectTeamCandidates,
  projectTeamPresets
} from '../fairnessData';
import { getTopActivityRecommendation, rankActivityRecommendations } from '../fairnessEngine';
import { growthFinalChoices, growthQuestions } from '../fairnessLearningData';

export default function FairnessWorksheet({ state }) {
  const isGrowth = state?.mode === 'growth';
  const isTeam = state?.mode === 'team';
  const allRecommendationRecords = [
    ...activityRecommendationInitialRecords,
    ...activityRecommendationSupplementRecords
  ];
  const firstRecommendation = getTopActivityRecommendation(
    activityRecommendationInitialRecords,
    activityRecommendationOptions
  );
  const expandedSuggestions = rankActivityRecommendations(
    allRecommendationRecords,
    activityRecommendationOptions
  ).filter(option => option.key !== firstRecommendation?.key).slice(0, 3);
  const growthQuestion = growthQuestions.find(item => item.id === state?.growthQuestionId)?.label;
  const growthChoice = growthFinalChoices.find(item => item.id === state?.growthFinalChoice)?.title;
  const selectedCareers = (state?.growthCareerChoices || [])
    .map(id => activityRecommendationOptions.find(option => option.key === id))
    .filter(Boolean);
  const selectedTeamPreset = projectTeamPresets.find(preset => state?.teamCriteriaWeights
    && Object.keys(preset.weights).every(key => preset.weights[key] === state.teamCriteriaWeights[key]));
  const appealSummary = {
    1: '결과를 그대로 두었을 때 잘못된 데이터가 남는 문제를 확인함',
    2: '한결의 기록을 70점에서 92점으로 정정하고 같은 기준으로 다시 계산함',
    3: '기록은 그대로 둔 채 한결만 예외로 포함할 때 생기는 문제를 확인함'
  }[state?.teamAppealChoice];

  return (
    <div className="fairness-worksheet" style={{ padding: '20px' }}>
      <style>
        {`
          @media print {
            .print-only { display: block !important; }
            .no-print { display: none !important; }
            @page { size: A4; margin: 1.5cm; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
            th, td { border: 1px solid black; padding: 6px 8px; text-align: center; font-size: 12px; }
            h2 { margin-top: 0; margin-bottom: 12px; text-align: center; }
            h3 { margin-top: 16px; margin-bottom: 8px; font-size: 14px; }
            p, li { font-size: 12px; line-height: 1.5; }
          }
        `}
      </style>

      {/* AI 금쪽이 꿈·진로 탐색 활동지 */}
      {isGrowth && (
        <div>
          <h2 style={{ borderBottom: '2px solid black', paddingBottom: '8px' }}>
            [AI 금쪽이와 함께하는 꿈·진로 탐색 기록]
          </h2>
          <p style={{ textAlign: 'right', fontSize: '12px', margin: '0 0 10px 0' }}>
            살펴볼 점: AI가 받은 자료에 따라 진로 제안이 어떻게 달라지는가
          </p>

          <p><strong>하늘이의 고민:</strong> {activityRecommendationStudent.worry}</p>
          <p><strong>상황:</strong> AI 금쪽이가 {activityRecommendationStudent.grade} {activityRecommendationStudent.name}의 성적표와 코딩 기록만 보고 어울리는 직업을 먼저 떠올립니다.</p>

          <h3>1. AI가 처음 받은 {activityRecommendationStudent.name}의 자료</h3>
          <table>
            <thead>
              <tr>
                {activityRecommendationStudent.reportCard.map(item => <th key={item.subject}>{item.subject}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>{activityRecommendationStudent.reportCard.map(item => <td key={item.subject}>{item.score}점</td>)}</tr>
            </tbody>
          </table>
          <p>• 온라인 과제 기록: {activityRecommendationStudent.codingRecord}</p>
          <p>• 온라인 문제 풀이: 규칙 찾기 문제를 여러 방법으로 해결했어요.</p>

          <h3>2. AI가 처음 떠올린 직업</h3>
          <p>• {firstRecommendation?.name}</p>
          <p>• AI가 말한 이유: {firstRecommendation?.why}</p>

          <h3>3. 성적표에는 없었던 {activityRecommendationStudent.name}의 이야기</h3>
          <table>
            <thead><tr><th>어디에서 알게 되었나요?</th><th>하늘이의 모습</th><th>새롭게 알게 된 점</th></tr></thead>
            <tbody>
              {activityRecommendationSupplementRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.source}</td>
                  <td style={{ textAlign: 'left' }}>{record.title}</td>
                  <td style={{ textAlign: 'left' }}>{record.reveals}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>4. 내가 더 알아보기로 한 꿈 후보</h3>
          <ul>
            {(selectedCareers.length > 0 ? selectedCareers : expandedSuggestions.slice(0, 2)).map(option => <li key={option.key}><strong>{option.name}</strong> — {option.why}</li>)}
          </ul>

          <h3>5. 내가 질문하고 선택한 다음 탐색</h3>
          <p>• 내가 AI에게 던진 질문: {growthQuestion || '____________________________________'}</p>
          <p>• 내가 고른 다음 행동: {growthChoice || '____________________________________'}</p>
          <p>Q. 성적표만 보았을 때와 하늘이의 이야기를 더 알게 되었을 때, 꿈 후보가 달라진 이유는 무엇일까요?</p>
          <p style={{ borderBottom: '1px solid black', height: '24px' }}></p>
          <p style={{ borderBottom: '1px solid black', height: '24px' }}></p>
          <p><strong>기억할 말:</strong> 꿈은 AI가 정해 주는 답이 아니라, 여러 경험과 나의 마음을 살피며 찾아가는 가능성이에요.</p>
        </div>
      )}

      {/* 프로젝트 팀 구성 활동지 */}
      {isTeam && (
        <div>
          <h2 style={{ borderBottom: '2px solid black', paddingBottom: '8px' }}>
            [AI가 고른 프로젝트 팀 다시 보기]
          </h2>
          <p style={{ textAlign: 'right', fontSize: '12px', margin: '0 0 10px 0' }}>
            살펴볼 점: AI의 선택에는 자료, 기준, 재검토 절차가 필요하다
          </p>

          <h3>1. AI가 받은 지원자 기록</h3>
          <table>
            <thead>
              <tr>
                <th>이름</th><th>문제 발견·기획</th><th>디지털 제작</th><th>의사소통·협력</th><th>발표·표현</th><th>주요 강점</th><th>이전 대회 참여</th>
              </tr>
            </thead>
            <tbody>
              {projectTeamCandidates.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.problemDiscovery}점</td>
                  <td>{c.digitalMaking}점</td>
                  <td>{c.communicationCollaboration}점</td>
                  <td>{c.presentation}점</td>
                  <td>{c.keyStrength}</td>
                  <td>{c.previousParticipationCount}회</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>2. 우리가 선택한 팀 구성 기준</h3>
          <p>• {selectedTeamPreset?.name || '________________________________________'}</p>
          <p>• 중요하게 본 것: {selectedTeamPreset?.focus?.join(' · ') || '________________________________________'}</p>

          <h3>3. 이의제기 및 데이터 정정</h3>
          <p>• 내가 살펴본 대응: {appealSummary || '________________________________________'}</p>
          <p>• 다시 생각한 점: 데이터 오류, 모두에게 적용되는 기준, 재검토 절차를 함께 확인해야 해요.</p>

          <h3>4. 다음 팀 구성에서 지킬 약속 (2가지)</h3>
          <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
            {state.teamSelectedPrinciples && state.teamSelectedPrinciples.length > 0 ? (
              state.teamSelectedPrinciples.map((p, idx) => <li key={idx}>[V] {p}</li>)
            ) : (
              <>
                <li>1. ____________________________________________________</li>
                <li>2. ____________________________________________________</li>
              </>
            )}
          </ul>
        </div>
      )}

      {!isGrowth && !isTeam && (
        <div>
          <h2>AI의 선택을 다시 본 나의 탐구 기록</h2>
          <p>이야기를 하나 선택해 진행한 뒤 기록을 열어 주세요.</p>
        </div>
      )}
    </div>
  );
}
