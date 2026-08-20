import React, { useState, useRef, useEffect } from 'react';

export default function AppHeader({ 
  title = "AI 리터러시 실험실", 
  onBackToActivities, 
  showBackButton, 
  onReset, 
  onPrint, 
  isPresentation, 
  setIsPresentation 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header no-print flex justify-between items-center" style={{ position: 'relative', zIndex: 100, padding: '12px 20px', borderBottom: '1.5px solid var(--color-border)', backgroundColor: 'white' }}>
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button 
            className="btn-ghost" 
            onClick={onBackToActivities}
            style={{ padding: '6px 12px', fontSize: 'var(--font-size-sm)', minHeight: '36px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
            aria-label="활동 고르기로 돌아가기"
          >
            ← 활동 고르기
          </button>
        )}
        
        {/* 홈으로 이동 가능한 인터랙티브 타이틀 */}
        <a 
          href="#/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none', 
            color: 'inherit',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            transition: 'background-color 0.2s ease'
          }}
          title="메인 홈으로 이동하기"
        >
          <span style={{ fontSize: '20px' }} aria-hidden="true">🏠</span>
          <h1 style={{ color: 'var(--color-secondary)', fontSize: 'var(--font-size-xl)', margin: 0, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {title}
            <span 
              style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                color: 'var(--color-primary-hover)', 
                backgroundColor: '#f0fdfa', 
                border: '1px solid #99f6e4', 
                padding: '2px 8px', 
                borderRadius: '12px' 
              }}
            >
              홈으로 ↗
            </span>
          </h1>
        </a>
      </div>
      
      <div className="flex items-center gap-2" style={{ position: 'relative' }} ref={menuRef}>
        {onPrint && (
          <button 
            type="button"
            className="btn-outline" 
            onClick={onPrint}
            style={{ 
              minHeight: '38px', 
              padding: '0 14px', 
              fontSize: 'var(--font-size-sm)', 
              fontWeight: 'bold',
              color: 'var(--color-primary-hover)',
              borderColor: '#99f6e4',
              backgroundColor: '#f0fdfa'
            }}
          >
            📄 활동지 인쇄/보기
          </button>
        )}

        <button 
          className="btn-outline" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          style={{ minHeight: '38px', padding: '0 14px', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}
        >
          ⚙️ 교사 도구
        </button>

        {menuOpen && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
              zIndex: 9999,
              minWidth: '190px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <button 
              onClick={() => { setIsPresentation(!isPresentation); setMenuOpen(false); }}
              style={{ padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid var(--color-border)', minHeight: 'auto', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)' }}
            >
              {isPresentation ? '🖥️ 기본 화면으로' : '🖥️ 발표 화면으로'}
            </button>
            <button 
              onClick={() => { onPrint(); setMenuOpen(false); }}
              style={{ padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid var(--color-border)', minHeight: 'auto', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)' }}
            >
              🖨️ 활동지 인쇄
            </button>
            <button 
              onClick={() => {
                if (window.confirm("정말 처음부터 다시 시작하시겠습니까? (진행 기록이 삭제됩니다)")) {
                  onReset();
                  setMenuOpen(false);
                }
              }}
              style={{ padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-warning)', minHeight: 'auto', fontSize: 'var(--font-size-sm)' }}
            >
              🔄 처음부터 다시
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
