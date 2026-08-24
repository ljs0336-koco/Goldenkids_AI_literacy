import React, { useEffect, useRef } from 'react';

const help = {
  persona: {
    title: 'AI에게 어떻게 부탁할까요?',
    steps: ['내 생활과 가까운 상황 하나를 고릅니다.', '같은 부탁에 대한 A와 B 답을 비교합니다.', '두 역할을 이어 붙여 더 좋은 부탁 문장을 만듭니다.'],
    remember: 'AI의 말투와 역할은 내가 정할 수 있어요. 마지막 생각과 결정은 내가 합니다.'
  },
  task: {
    title: 'AI에게 어디까지 맡길까요?',
    steps: ['학교 축제에서 AI나 프로그램이 도울 일을 살펴봅니다.', '각 일을 자동 정리, 사람 결정, AI 도움 중 하나로 나눕니다.', 'AI가 한 일과 사람이 확인할 일을 한 줄로 연결합니다.'],
    remember: '정해진 규칙으로 처리하는 자동화가 모두 AI인 것은 아니에요. 중요한 결정의 책임은 사람에게 있습니다.'
  }
};

export default function RoleHelpDrawer({ isOpen, onClose, mode }) {
  const closeRef = useRef(null);
  const content = help[mode];

  useEffect(() => {
    if (!isOpen) return undefined;
    closeRef.current?.focus();
    const handleKeyDown = event => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="role-help-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <aside className="role-help-drawer" role="dialog" aria-modal="true" aria-labelledby="role-help-title">
        <button ref={closeRef} type="button" className="role-help-close" onClick={onClose} aria-label="도움말 닫기">×</button>
        <span className="role-eyebrow">활동 도움말</span>
        <h2 id="role-help-title">{content?.title || '무엇을 하면 되나요?'}</h2>
        {content ? (
          <>
            <ol>{content.steps.map(step => <li key={step}>{step}</li>)}</ol>
            <p><strong>기억할 점</strong><br />{content.remember}</p>
          </>
        ) : <p>먼저 두 활동 중 궁금한 하나를 골라 보세요.</p>}
      </aside>
    </div>
  );
}
