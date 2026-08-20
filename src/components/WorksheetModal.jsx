import React, { useEffect, useId, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export default function WorksheetModal({ isOpen, onClose, onPrint, title = '활동지 미리보기', children }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)];
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="worksheet-modal-overlay no-print"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="worksheet-modal-container"
      >
        <header className="worksheet-modal-header">
          <div className="worksheet-modal-heading">
            <span className="worksheet-modal-paper-mark" aria-hidden="true">A4</span>
            <div>
              <h2 id={titleId}>{title}</h2>
              <p id={descriptionId}>현재 학습 기록이 반영된 활동지를 미리 확인할 수 있습니다.</p>
            </div>
          </div>
          <div className="worksheet-modal-actions">
            <button type="button" className="btn-primary" onClick={onPrint} aria-label="현재 활동지를 A4로 인쇄하기">
              A4 인쇄
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              className="btn-outline"
              onClick={onClose}
              aria-label="활동지 미리보기 닫기"
            >
              닫기
            </button>
          </div>
        </header>

        <div className="worksheet-modal-body">
          <div className="worksheet-modal-preview">{children}</div>
        </div>
      </div>
    </div>
  );
}
