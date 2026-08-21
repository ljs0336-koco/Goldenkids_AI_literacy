import React, { useState } from 'react';
import {
  projectTeamCandidates,
  projectTeamMission,
  projectTeamPresets,
  projectTeamRoles
} from '../fairnessData';
import { evaluateTeamCandidates } from '../fairnessEngine';
import { teamSpeakerPrompt } from '../fairnessLearningData';
import MiniSpeakerNote from '../components/MiniSpeakerNote';
import PageTurnNav from '../components/PageTurnNav';

export default function CandidateScreen({ onViewAll, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const firstTeam = evaluateTeamCandidates(projectTeamCandidates, projectTeamPresets[0].weights);

  const goNextScene = () => {
    setPageIndex(1);
    onViewAll?.();
  };

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <span className="fair-eyebrow">{projectTeamMission.eyebrow}</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>
          {pageIndex === 0 ? '프로젝트 팀을 꾸려야 해요' : 'AI는 네 명을 아주 빠르게 골랐어요'}
        </h2>
        <p className="fair-one-line-help">
          {pageIndex === 0 ? projectTeamMission.description : '명단이 그럴듯해 보여도, 먼저 무엇을 중요하게 보았는지 확인해요.'}
        </p>
      </div>

      {pageIndex === 0 ? (
        <section className="fair-mission-card" aria-labelledby="team-mission-title">
          <span>오늘의 미션</span>
          <h3 id="team-mission-title">{projectTeamMission.title}</h3>
          <div className="fair-role-strip" aria-label="프로젝트에 필요한 역할">
            {projectTeamRoles.map(role => <strong key={role.key}>{role.label}</strong>)}
          </div>
          <blockquote>“{projectTeamMission.aiRequest}”</blockquote>
        </section>
      ) : (
        <>
          <section className="fair-first-team" aria-labelledby="first-team-title">
            <div className="fair-first-team-heading">
              <span>AI의 첫 명단</span>
              <h3 id="first-team-title">현재 기록이 높은 학생을 먼저 본 결과</h3>
            </div>
            <ol>
              {firstTeam.map(candidate => (
                <li key={candidate.id}>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.keyStrength}</span>
                </li>
              ))}
            </ol>
            <p>AI는 지원자마다 기록된 네 가지 수행과 이전 참여 횟수만 받았어요.</p>
          </section>

          <details className="fair-inline-details fair-dossier">
            <summary>지원자 8명의 기록이 궁금하다면 열어 보기</summary>
            <ul>
              {projectTeamCandidates.map(candidate => (
                <li key={candidate.id}>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.keyStrength} · 이전 참여 {candidate.previousParticipationCount}회</span>
                </li>
              ))}
            </ul>
          </details>

          <MiniSpeakerNote prompt={teamSpeakerPrompt} />
        </>
      )}

      <PageTurnNav
        current={pageIndex}
        total={2}
        onPrev={() => setPageIndex(0)}
        onNext={goNextScene}
        prevLabel="프로젝트 목표"
        nextLabel="AI의 첫 팀"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <button className="btn-primary" onClick={onNext} disabled={pageIndex !== 1} style={{ minHeight: '52px' }}>
          {pageIndex === 1 ? 'AI가 사용한 기준 살펴보기 →' : 'AI의 첫 팀을 먼저 확인해 주세요'}
        </button>
      </div>
    </div>
  );
}
