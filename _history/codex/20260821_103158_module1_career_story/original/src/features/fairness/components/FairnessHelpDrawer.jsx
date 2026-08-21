import React, { useEffect, useRef } from 'react';
import { fairnessLearningBriefs } from '../fairnessLearningData';

export default function FairnessHelpDrawer({ isOpen, onClose, mode }) {
  const closeRef = useRef(null);
  const brief = fairnessLearningBriefs[mode] || null;

  useEffect(() => {
    if (!isOpen) return undefined;
    closeRef.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fair-help-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <aside className="fair-help-drawer" role="dialog" aria-modal="true" aria-labelledby="fair-help-title">
        <button ref={closeRef} type="button" className="fair-help-close" onClick={onClose} aria-label="도움말 닫기">×</button>
        <span className="fair-eyebrow">활동 도움말</span>
        <h2 id="fair-help-title">무엇을 하면 되나요?</h2>
        {brief ? (
          <>
            <p><strong>한 줄 목표</strong><br />{brief.title}</p>
            <ol>
              <li>화면의 기록과 AI의 준비된 응답을 읽어요.</li>
              <li>AI에게 질문하거나 기준을 바꾸어 결과를 비교해요.</li>
              <li>마지막에는 내가 확인한 근거로 선택해요.</li>
            </ol>
            <p><strong>기억할 점</strong><br />이 앱의 AI 답변과 추천은 학습용 시뮬레이션이에요. 중요한 것은 정답을 빨리 고르는 것이 아니라, AI가 본 데이터와 기준을 확인하는 과정이에요.</p>
          </>
        ) : (
          <p>두 활동 중 궁금한 주제를 하나 골라 보세요. 활동 안에서 무엇을 하고 배우는지 차근차근 안내해 드려요.</p>
        )}
      </aside>
    </div>
  );
}
