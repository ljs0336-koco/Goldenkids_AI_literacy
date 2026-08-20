import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function TeacherTools({ onReset, onPrint, isPresentation, setIsPresentation }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    setShowConfirm(false);
    if (onReset) onReset();
  };

  return (
    <div className="teacher-tools" style={{ display: 'flex', gap: '8px' }}>
      <button className="btn-secondary" onClick={() => setIsPresentation(!isPresentation)}>
        발표 모드 {isPresentation ? '끄기' : '켜기'}
      </button>
      <button className="btn-secondary" onClick={toggleFullscreen}>전체화면</button>
      <button className="btn-secondary" onClick={handleReset}>다시 시작</button>
      <button className="btn-secondary" onClick={onPrint}>인쇄 활동지</button>

      {showConfirm && (
        <ConfirmDialog 
          message="현재 진행 중인 내용이 모두 지워집니다. 처음부터 다시 시작하시겠습니까?"
          onConfirm={confirmReset}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
