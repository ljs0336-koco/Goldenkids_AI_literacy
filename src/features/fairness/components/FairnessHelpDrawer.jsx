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
              <li>{mode === 'growth' ? '하늘이의 고민을 듣고 AI가 받은 자료를 확인해요.' : '프로젝트의 목표와 AI가 먼저 만든 팀을 확인해요.'}</li>
              <li>{mode === 'growth' ? 'AI에게 이유를 묻고 성적표에 없는 하늘이의 이야기를 알려 줘요.' : '팀의 기준을 바꾸어 결과와 역할을 비교해요.'}</li>
              <li>{mode === 'growth' ? '서로 다른 꿈을 비교해 먼저 알아볼 하나와 다음 행동을 골라요.' : '잘못된 기록에 대응하고 가장 먼저 지킬 약속을 골라요.'}</li>
            </ol>
            <p><strong>기억할 점</strong><br />이 앱의 AI 답변과 추천은 학습용 시뮬레이션이에요. {mode === 'growth' ? 'AI는 꿈을 대신 정해 주는 사람이 아니라, 가능성을 함께 찾아보는 도구예요.' : '중요한 것은 정답을 빨리 고르는 것이 아니라, AI가 본 데이터와 기준을 확인하는 과정이에요.'}</p>
          </>
        ) : (
          <p>하늘이의 꿈 이야기와 프로젝트 팀 이야기 중 하나를 골라 보세요. AI의 첫 답에 이유를 묻고, 빠진 정보와 다시 살필 방법을 찾아가요.</p>
        )}
      </aside>
    </div>
  );
}
