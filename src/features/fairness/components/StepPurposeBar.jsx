import React from 'react';

export default function StepPurposeBar({ purpose }) {
  if (!purpose) return null;

  return (
    <aside className="fair-page-cue" aria-label="현재 활동 안내">
      <span className="fair-page-cue-hand" aria-hidden="true">☝</span>
      <div className="fair-page-cue-action">
        <small>이 화면에서는</small>
        <strong>{purpose.action}</strong>
      </div>
      <details>
        <summary aria-label="이 활동을 하는 이유 보기">? <span>왜 할까요</span></summary>
        <p>{purpose.reason}</p>
      </details>
    </aside>
  );
}
