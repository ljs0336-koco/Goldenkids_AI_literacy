import React from 'react';

export default function RolePageNav({ onPrev, onNext, prevLabel = '이전', nextLabel = '다음', disabled = false }) {
  return (
    <nav className="role-page-nav" aria-label="페이지 이동">
      {onPrev ? <button type="button" className="btn-outline" onClick={onPrev}>← {prevLabel}</button> : <span />}
      {onNext && (
        <button type="button" className="btn-primary" onClick={onNext} disabled={disabled}>
          {nextLabel} →
        </button>
      )}
    </nav>
  );
}
