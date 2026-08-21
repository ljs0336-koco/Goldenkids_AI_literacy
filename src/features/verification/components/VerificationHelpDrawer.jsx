import React, { useEffect, useRef } from 'react';
import { verificationBriefs } from '../verificationLearningData';

export default function VerificationHelpDrawer({ isOpen, onClose, mode }) {
  const closeRef = useRef(null);
  const brief = verificationBriefs[mode];

  useEffect(() => {
    if (!isOpen) return undefined;
    closeRef.current?.focus();
    const onKeyDown = event => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="verification-help-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <aside className="verification-help-drawer" role="dialog" aria-modal="true" aria-labelledby="verification-help-title">
        <button ref={closeRef} type="button" className="verification-help-close" onClick={onClose} aria-label="도움말 닫기">×</button>
        <span className="verification-kicker">활동 도움말</span>
        <h2 id="verification-help-title">무엇을 하면 되나요?</h2>
        {brief ? (
          <>
            <p><strong>한 줄 목표</strong><br />{brief.title}</p>
            <ol>{brief.steps.map(step => <li key={step}>{step}</li>)}</ol>
            <p><strong>기억할 점</strong><br />{brief.note}</p>
          </>
        ) : (
          <p>학교신문 검증과 미디어 게시 전 확인 중 하나를 골라, 공개하기 전에 필요한 근거를 찾아보세요.</p>
        )}
      </aside>
    </div>
  );
}
