import React from 'react';
import { growthAwardCandidates, projectTeamCandidates } from '../fairnessData';
import { calculateGrowthDeltas, calculateDecemberAvg } from '../fairnessEngine';

export default function FairnessWorksheet({ state }) {
  const isGrowth = state?.mode === 'growth';
  const isTeam = state?.mode === 'team';

  return (
    <div className="print-only" style={{ display: 'none', padding: '20px' }}>
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

      {/* AI 금쪽이 성장상 활동지 */}
      {isGrowth && (
        <div>
          <h2 style={{ borderBottom: '2px solid black', paddingBottom: '8px' }}>
            [AI 금쪽이 성장상 활동지] 학습 데이터 탐구
          </h2>
          <p style={{ textAlign: 'right', fontSize: '11px', margin: '0 0 10px 0' }}>
            권장 활용 주제: 학습 데이터와 AI의 판단
          </p>

          <h3>1. 학생 6명의 3월 시작 vs 12월 마지막 역량 기록</h3>
          <table>
            <thead>
              <tr>
                <th rowSpan="2">이름</th>
                <th colSpan="3">🌱 3월 시작 기록</th>
                <th colSpan="3">📅 12월 마지막 기록</th>
                <th rowSpan="2">1년 평균 변화량</th>
              </tr>
              <tr>
                <th>디지털</th><th>문제해결</th><th>협업</th>
                <th>디지털</th><th>문제해결</th><th>협업</th>
              </tr>
            </thead>
            <tbody>
              {growthAwardCandidates.map(s => {
                const deltas = calculateGrowthDeltas(s);
                return (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.march.digitalToolUse}점</td>
                    <td>{s.march.problemSolving}점</td>
                    <td>{s.march.communicationCollaboration}점</td>
                    <td>{s.december.digitalToolUse}점</td>
                    <td>{s.december.problemSolving}점</td>
                    <td>{s.december.communicationCollaboration}점</td>
                    <td><strong>+{deltas.avgDelta}점</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>2. AI 금쪽이의 추천 비교</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
              <strong>처음 추천 (12월 현재 기록만 사용)</strong>
              <p style={{ margin: '6px 0 0 0' }}>• 추천 학생: 서준 (12월 평균 92.3점 / 1년 성장 +7.3점)</p>
            </div>
            <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
              <strong>다시 추천 (3월과 12월 기록 함께 사용)</strong>
              <p style={{ margin: '6px 0 0 0' }}>• 추천 학생: 온유 (12월 평균 82.0점 / 1년 성장 +31.0점)</p>
            </div>
          </div>

          <h3>3. 나의 생각 정리하기</h3>
          <p>Q. 12월 현재 점수가 가장 높은 학생과 1년 동안 가장 많이 성장한 학생이 다른 이유는 무엇일까요?</p>
          <p style={{ borderBottom: '1px solid black', height: '24px' }}></p>
          <p style={{ borderBottom: '1px solid black', height: '24px' }}></p>
        </div>
      )}

      {/* 프로젝트 대표팀 구성 활동지 */}
      {isTeam && (
        <div>
          <h2 style={{ borderBottom: '2px solid black', paddingBottom: '8px' }}>
            [프로젝트 대표팀 구성 활동지] AI 공정성 탐구
          </h2>
          <p style={{ textAlign: 'right', fontSize: '11px', margin: '0 0 10px 0' }}>
            권장 활용 주제: AI 공정성과 책임 있는 의사결정
          </p>

          <h3>1. 지원자 8명의 역량 및 이전 대회 참여 경험</h3>
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
          <p>
            • 기획: {state.teamCriteriaWeights?.problemDiscovery ?? '___'}% / 
            제작: {state.teamCriteriaWeights?.digitalMaking ?? '___'}% / 
            협업: {state.teamCriteriaWeights?.communicationCollaboration ?? '___'}% / 
            발표: {state.teamCriteriaWeights?.presentation ?? '___'}% / 
            참여 기회: {state.teamCriteriaWeights?.opportunity ?? '0'}%
          </p>

          <h3>3. 이의제기 및 데이터 정정</h3>
          <p>• 한결 학생의 의사소통·협력 점수 정정: 70점 ➔ 92점 (전산 오류 확인 및 바로잡음)</p>
          <p>• 원칙: 대표팀 명단 변화와 관계없이 잘못된 데이터는 반드시 사실대로 바로잡아야 해요.</p>

          <h3>4. 우리가 선정한 공정한 AI 운영 원칙 (3가지)</h3>
          <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
            {state.teamSelectedPrinciples && state.teamSelectedPrinciples.length > 0 ? (
              state.teamSelectedPrinciples.map((p, idx) => <li key={idx}>[V] {p}</li>)
            ) : (
              <>
                <li>1. ____________________________________________________</li>
                <li>2. ____________________________________________________</li>
                <li>3. ____________________________________________________</li>
              </>
            )}
          </ul>
        </div>
      )}

      {!isGrowth && !isTeam && (
        <div>
          <h2>공정한 AI 실험실 활동지</h2>
          <p>실험을 선택하여 진행한 후 인쇄해 주세요.</p>
        </div>
      )}
    </div>
  );
}
