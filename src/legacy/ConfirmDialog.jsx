import React, { useEffect, useRef } from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    // Focus the first button on mount for accessibility
    const firstButton = dialogRef.current?.querySelector('button');
    if (firstButton) firstButton.focus();

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div ref={dialogRef} className="card" role="dialog" aria-modal="true" style={{ maxWidth: '400px', width: '90%' }}>
        <h3 style={{ color: 'var(--color-warning)' }}>주의</h3>
        <p>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onCancel}>취소</button>
          <button className="btn-primary" onClick={onConfirm} style={{ backgroundColor: 'var(--color-warning)' }}>확인</button>
        </div>
      </div>
    </div>
  );
}
