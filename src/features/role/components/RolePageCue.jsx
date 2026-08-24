import React from 'react';

export default function RolePageCue({ action, reason }) {
  return (
    <aside className="role-page-cue" aria-label="현재 활동 안내">
      <span className="role-page-cue-mark" aria-hidden="true">☝</span>
      <div>
        <small>지금 할 일</small>
        <strong>{action}</strong>
      </div>
      <details>
        <summary>? <span>왜 할까요</span></summary>
        <p>{reason}</p>
      </details>
    </aside>
  );
}
