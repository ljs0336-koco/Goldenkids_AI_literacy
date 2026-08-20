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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(15, 23, 42, 0.68)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out'
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          overflow: 'hidden',
          border: '1px solid #cbd5e1',
          borderRadius: '16px',
          backgroundColor: '#f8fafc',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '16px 24px',
            borderBottom: '1.5px solid #e2e8f0',
            backgroundColor: '#fff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }} aria-hidden="true">📄</span>
            <div>
              <h2 id={titleId} style={{ margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: 800 }}>{title}</h2>
              <p id={descriptionId} style={{ margin: '2px 0 0', color: '#64748b', fontSize: '13px' }}>
                현재 학습 기록이 반영된 A4 활동지를 미리 확인할 수 있습니다.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onPrint}
              aria-label="현재 활동지를 A4로 인쇄하기"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#0d9488',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(13, 148, 136, 0.3)'
              }}
            >
              <span aria-hidden="true">🖨️</span> A4 인쇄
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="활동지 미리보기 닫기"
              style={{
                padding: '10px 16px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              ✕ 닫기
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: '#f1f5f9' }}>
          <div style={{ overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
