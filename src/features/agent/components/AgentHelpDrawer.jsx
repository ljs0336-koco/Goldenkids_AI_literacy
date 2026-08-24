import React, { useEffect, useRef } from 'react';

const help = {
  mission: {
    title: '공연 초대를 어떻게 확인하나요?',
    steps: [
      'AI가 실제로 보내기까지 어떤 도구를 쓰는지 살펴봅니다.',
      '받는 사람, 공연 정보, 첨부 파일, 연락처 공개 범위를 확인합니다.',
      '지금 보내기·멈추고 고치기 중 하나를 결정합니다.',
      '내가 경험한 사람 확인 과정에 HITL이라는 이름을 붙입니다.'
    ],
    remember: '좋은 문장을 만드는 것과 실제로 보내도 되는지는 다른 문제예요.'
  },
  control: {
    title: '견학 자료를 어떻게 지키나요?',
    steps: [
      'AI가 부탁하지 않은 행동까지 하는지 작업 기록에서 찾습니다.',
      '새 행동을 멈추고 이미 바뀐 파일을 복구합니다.',
      '원본 보호와 사람 확인 규칙을 넣어 다시 맡깁니다.'
    ],
    remember: '비상 정지는 앞으로의 행동을 멈춥니다. 이미 일어난 결과는 사람이 확인하고 복구해야 해요.'
  }
};

export default function AgentHelpDrawer({ isOpen, onClose, mode }) {
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
    <div className="agent-help-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <aside className="agent-help-drawer" role="dialog" aria-modal="true" aria-labelledby="agent-help-title">
        <button ref={closeRef} type="button" className="agent-help-close" onClick={onClose} aria-label="도움말 닫기">×</button>
        <span className="agent-eyebrow">활동 도움말</span>
        <h2 id="agent-help-title">{content?.title || '무엇을 하면 되나요?'}</h2>
        {content ? (
          <>
            <ol>{content.steps.map(step => <li key={step}>{step}</li>)}</ol>
            <p><strong>기억할 점</strong><br />{content.remember}</p>
          </>
        ) : <p>먼저 두 활동 중 궁금한 카드 하나를 골라 보세요.</p>}
      </aside>
    </div>
  );
}
