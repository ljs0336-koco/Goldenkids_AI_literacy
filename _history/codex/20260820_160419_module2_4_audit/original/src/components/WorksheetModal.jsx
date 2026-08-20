import React, { useEffect } from 'react';

export default function WorksheetModal({ isOpen, onClose, onPrint, title = "활동지 미리보기", children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="worksheet-modal-overlay no-print"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        className="worksheet-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #cbd5e1'
        }}
      >
        {/* 모달 상단 헤더 바 */}
        <div 
          style={{
            padding: '16px 24px',
            backgroundColor: 'white',
            borderBottom: '1.5px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>📄</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
                {title}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                화면에서 작성된 내용이 활동지에 자동으로 반영되어 인쇄됩니다.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onPrint}
              style={{
                backgroundColor: '#0d9488',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(13, 148, 136, 0.3)',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🖨️</span> 바로 인쇄하기 (A4)
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ✕ 닫기
            </button>
          </div>
        </div>

        {/* 활동지 미리보기 본문 영역 */}
        <div 
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            backgroundColor: '#f1f5f9'
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
