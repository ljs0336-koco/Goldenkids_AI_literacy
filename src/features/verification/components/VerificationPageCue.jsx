import React from 'react';

export default function VerificationPageCue({ purpose }) {
  if (!purpose) return null;

  return (
    <aside className="verification-page-cue" aria-label="현재 활동 안내">
      <span aria-hidden="true">☝</span>
      <div>
        <small>지금 할 일</small>
        <strong>{purpose.action}</strong>
      </div>
      <details>
        <summary aria-label="이 활동이 중요한 이유 보기">?</summary>
        <p>{purpose.reason}</p>
      </details>
    </aside>
  );
}
