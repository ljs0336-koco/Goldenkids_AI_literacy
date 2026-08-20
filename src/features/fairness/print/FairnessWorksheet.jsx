import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent,
  activityRecommendationSupplementRecords,
  projectTeamCandidates
} from '../fairnessData';
import { getTopActivityRecommendation } from '../fairnessEngine';

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
  const updatedRecommendation = getTopActivityRecommendation(
    allRecommendationRecords,
    activityRecommendationOptions
  );

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

      {/* AI 금쪽이 활동 추천 활동지 */}
      {isGrowth && (
        <div>
          <h2 style={{ borderBottom: '2px solid black', paddingBottom: '8px' }}>
            [AI 금쪽이 활동 추천 활동지] 학습 데이터 탐구
          </h2>
          <p style={{ textAlign: 'right', fontSize: '11px', margin: '0 0 10px 0' }}>
            권장 활용 주제: 학습 데이터의 누락과 AI 추천
          </p>

          <p><strong>상황:</strong> AI 금쪽이가 가상의 학생 {activityRecommendationStudent.name}에게 체험 활동 하나를 추천합니다.</p>

          <h3>1. AI에게 제공된 활동 기록</h3>
          <table>
            <thead>
              <tr>
                <th>처음 포함 여부</th>
                <th>데이터 출처</th>
                <th>기록 내용</th>
                {activityRecommendationOptions.map(option => (
                  <th key={option.key}>{option.shortName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allRecommendationRecords.map(record => {
                const wasInitiallyIncluded = activityRecommendationInitialRecords.some(item => item.id === record.id);
                return (
                  <tr key={record.id}>
                    <td><strong>{wasInitiallyIncluded ? '포함' : '누락'}</strong></td>
                    <td>{record.source}</td>
                    <td style={{ textAlign: 'left' }}>{record.title}</td>
                    {activityRecommendationOptions.map(option => (
                      <td key={option.key}>{record.signals[option.key] || 0}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>2. AI 금쪽이의 추천 비교</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
              <strong>처음 추천 (온라인 기록 {activityRecommendationInitialRecords.length}개)</strong>
              <p style={{ margin: '6px 0 0 0' }}>• 추천 활동: {firstRecommendation?.name} ({firstRecommendation?.score}점)</p>
            </div>
            <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
              <strong>다시 추천 (전체 기록 {allRecommendationRecords.length}개)</strong>
              <p style={{ margin: '6px 0 0 0' }}>• 추천 활동: {updatedRecommendation?.name} ({updatedRecommendation?.score}점)</p>
            </div>
          </div>

          <h3>3. 나의 생각 정리하기</h3>
          <p>Q. 같은 추천 규칙을 사용했는데도 AI 금쪽이의 추천 활동이 달라진 이유는 무엇일까요?</p>
          <p style={{ borderBottom: '1px solid black', height: '24px' }}></p>
          <p style={{ borderBottom: '1px solid black', height: '24px' }}></p>

          <h3>4. 사람이 최종 선택하기</h3>
          <p>• AI 추천에서 참고할 점: _________________________________________________</p>
          <p>• AI가 알지 못하는 정보: _________________________________________________</p>
          <p>• 학생과 교사가 선택한 활동과 이유: ______________________________________</p>
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
