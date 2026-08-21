import React, { useEffect, useRef, useState } from 'react';

export default function AppHeader({
  title = 'AI 리터러시 실험실',
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
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header app-header-shell no-print">
      <div className="app-header-leading">
        {showBackButton && (
          <button
            type="button"
            className="btn-ghost app-header-button"
            onClick={onBackToActivities}
            aria-label="활동 고르기로 돌아가기"
          >
            ← <span className="app-header-button-label">활동 고르기</span>
          </button>
        )}

        <a href="#/" className="app-brand" title="메인 홈으로 이동하기">
          <span className="app-brand-mark" aria-hidden="true">G</span>
          <span className="app-brand-copy">
            <small>GEUMJJOK AI LITERACY</small>
            <strong>{title}</strong>
          </span>
        </a>
      </div>

      <div className="app-header-tools relative" ref={menuRef}>
        {onPrint && (
          <button
            type="button"
            className="btn-outline app-header-button"
            onClick={onPrint}
            aria-label="활동지 인쇄 또는 미리보기"
          >
            <span aria-hidden="true">▤</span>
            <span className="app-header-button-label">활동지</span>
          </button>
        )}

        <button
          type="button"
          className="btn-outline app-header-button"
          onClick={() => setMenuOpen(open => !open)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="교사 도구 열기"
        >
          <span aria-hidden="true">•••</span>
          <span className="app-header-button-label">교사 도구</span>
        </button>

        {menuOpen && (
          <div className="app-header-menu" role="menu">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsPresentation(!isPresentation);
                setMenuOpen(false);
              }}
            >
              {isPresentation ? '기본 화면으로 전환' : '발표 화면으로 전환'}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onPrint?.();
                setMenuOpen(false);
              }}
            >
              활동지 인쇄
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                if (window.confirm('정말 처음부터 다시 시작하시겠습니까? 진행 기록이 삭제됩니다.')) {
                  onReset?.();
                  setMenuOpen(false);
                }
              }}
            >
              처음부터 다시
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
