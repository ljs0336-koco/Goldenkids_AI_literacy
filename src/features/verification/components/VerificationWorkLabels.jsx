import React from 'react';

const actorIcons = {
  ai: '🤖',
  human: '👤',
  together: '🤝'
};

const statusIcons = {
  pending: '○',
  working: '◐',
  complete: '✓',
  revise: '!'
};

export default function VerificationWorkLabels({
  actor = 'AI 초안',
  actorDetail,
  actorTone = 'ai',
  status = '확인 전',
  statusDetail,
  statusTone = 'pending',
  experience,
  emphasize = false
}) {
  return (
    <section className={`verification-work-labels ${emphasize ? 'is-emphasized' : ''}`} aria-label="작업 주체와 확인 상태">
      <div className={`verification-work-label verification-work-label--${actorTone}`}>
        <small>누가 만들었나요?</small>
        <strong><span aria-hidden="true">{actorIcons[actorTone]}</span>{actor}</strong>
        {actorDetail && <p>{actorDetail}</p>}
      </div>
      <div className={`verification-work-label verification-work-label--${statusTone}`}>
        <small>지금 상태</small>
        <strong><span aria-hidden="true">{statusIcons[statusTone]}</span>{status}</strong>
        {statusDetail && <p>{statusDetail}</p>}
      </div>
      {experience && (
        <p className="verification-experience-label">
          <strong>체험 방식 · 가상 체험</strong>
          <span>{experience}</span>
        </p>
      )}
    </section>
  );
}
