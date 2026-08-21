import React, { useEffect, useRef, useState } from 'react';
import { goToLearningHome, resetAllLearningProgress } from '../utils/learningProgress';

export default function AppHeader({
  title = 'AI 리터러시 실험실',
  onBackToActivities,
  showBackButton,
  onReset,
  onPrint,
  isPresentation,
  setIsPresentation,
  studentMode = false,
  onHelp
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!resetDialogOpen) return undefined;
    const handleKeyDown = event => {
      if (event.key === 'Escape') setResetDialogOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [resetDialogOpen]);

  const handleResetAll = () => {
    resetAllLearningProgress();
    onReset?.();
    setResetDialogOpen(false);
    goToLearningHome();
  };

  return (
    <>
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
          <button
            type="button"
            className="btn-outline app-header-button"
            onClick={() => goToLearningHome()}
            aria-label="전체 홈으로 돌아가기"
          >
            <span aria-hidden="true">⌂</span>
            <span className="app-header-button-label">홈</span>
          </button>

          <button
            type="button"
            className="btn-outline app-header-button app-header-reset-button"
            onClick={() => setResetDialogOpen(true)}
            aria-label="모든 활동 기록 초기화"
          >
            <span aria-hidden="true">↺</span>
            <span className="app-header-button-label">전체 초기화</span>
          </button>

        {studentMode && onHelp && (
          <button
            type="button"
            className="btn-outline app-header-button"
            onClick={onHelp}
            aria-label="현재 활동 도움말 열기"
          >
            <span aria-hidden="true">?</span>
            <span className="app-header-button-label">도움말</span>
          </button>
        )}

        {!studentMode && onPrint && (
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

        {!studentMode && (
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
        )}

          {!studentMode && menuOpen && (
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
              현재 활동만 다시
            </button>
          </div>
        )}
        </div>
      </header>

      {resetDialogOpen && (
        <div className="app-reset-dialog-backdrop no-print" role="presentation" onMouseDown={() => setResetDialogOpen(false)}>
          <section
            className="app-reset-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-reset-dialog-title"
            onMouseDown={event => event.stopPropagation()}
          >
            <span className="app-reset-dialog-icon" aria-hidden="true">↺</span>
            <h2 id="app-reset-dialog-title">모든 활동을 처음부터 다시 할까요?</h2>
            <p>모듈 1~4에서 저장된 선택과 완료 기록이 지워지고 전체 홈으로 돌아가요.</p>
            <div className="app-reset-dialog-actions">
              <button type="button" className="btn-outline" onClick={() => setResetDialogOpen(false)}>취소</button>
              <button type="button" className="btn-primary" onClick={handleResetAll}>전체 기록 지우기</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
