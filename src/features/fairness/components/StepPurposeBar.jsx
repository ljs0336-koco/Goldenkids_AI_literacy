import React from 'react';

export default function StepPurposeBar({ purpose }) {
  if (!purpose) return null;

  return (
    <aside className="fair-step-purpose" aria-label="현재 활동 안내">
      <div><strong>지금 할 일</strong><span>{purpose.action}</span></div>
      <div><strong>왜 할까요?</strong><span>{purpose.reason}</span></div>
    </aside>
  );
}
