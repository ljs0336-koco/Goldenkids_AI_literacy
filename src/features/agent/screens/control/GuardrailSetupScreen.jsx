import React, { useState } from 'react';
import { safetyGuardrails } from '../../agentData';
import { evaluateSafetySetup } from '../../agentEngine';
import AgentChoiceFork from '../../components/AgentChoiceFork';
import AgentPageCue from '../../components/AgentPageCue';
import AgentPageNav from '../../components/AgentPageNav';

export default function GuardrailSetupScreen({ guardrailChoices = {}, onSelectGuardrail, onNext, onPrev }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const guard = safetyGuardrails[currentIndex];
  const selectedId = guardrailChoices[guard.id] || null;
  const selected = guard.options.find(option => option.id === selectedId);
  const evaluation = evaluateSafetySetup(guardrailChoices);
  const isLast = currentIndex === safetyGuardrails.length - 1;

  const handleNext = () => {
    if (!selected?.recommended) return;
    if (isLast) onNext?.();
    else setCurrentIndex(index => index + 1);
  };

  return (
    <section className="agent-shell agent-stage" aria-labelledby="guardrail-title">
      <AgentPageCue
        action="A와 B 중 원본과 사람의 결정권을 더 잘 지키는 설정을 고르세요."
        reason="AI에게 일을 다시 맡길 때는 좋은 의도보다 접근 권한과 실행 조건을 구체적으로 정해야 해요."
      />

      <header className="agent-page-head">
        <span className="agent-eyebrow">안전 설정 {currentIndex + 1} / {safetyGuardrails.length}</span>
        <h1 id="guardrail-title">이번에는 어디까지 맡길까?</h1>
        <p>한 번에 하나씩 정해서 박물관 견학 자료를 다시 정리해 봐요.</p>
      </header>

      <div className="agent-guard-progress" aria-label={`안전 설정 ${currentIndex + 1} / ${safetyGuardrails.length}`}>
        {safetyGuardrails.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`${guardrailChoices[item.id] ? 'is-chosen' : ''} ${index === currentIndex ? 'is-current' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}. ${item.title}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <article className="agent-guard-card">
        <span className="agent-guard-icon">{guard.icon}</span>
        <h2>{guard.title}</h2>
        <p>{guard.desc}</p>
      </article>

      <AgentChoiceFork
        options={guard.options}
        value={selectedId}
        onChange={optionId => onSelectGuardrail(guard.id, optionId)}
        prompt="어떤 설정으로 다시 맡길까요?"
      />

      <aside className={`agent-choice-result ${selected ? '' : 'is-empty'} ${selected && !selected.recommended ? 'needs-review' : ''}`} aria-live="polite">
        {selected ? (
          <>
            <strong>{selected.recommended ? '이 설정으로 위험을 줄일 수 있어요' : '행동 범위가 너무 넓어요'}</strong>
            <span>{evaluation.analysisItems[currentIndex].feedback}</span>
          </>
        ) : <span>설정을 고르면 바로 영향을 알려 드려요.</span>}
      </aside>

      {guard.id === 'guard_preview' && selected?.recommended && (
        <aside className="agent-hitl-inline">
          <strong>여기에 HITL이 들어갔어요</strong>
          <span>AI가 목록을 준비하고, 사람이 승인하거나 보류한 다음에만 파일을 바꿉니다.</span>
        </aside>
      )}

      <AgentPageNav
        onPrev={currentIndex === 0 ? onPrev : () => setCurrentIndex(index => index - 1)}
        onNext={handleNext}
        prevLabel={currentIndex === 0 ? '복구 결과 보기' : '이전 설정'}
        nextLabel={isLast ? '안전하게 다시 실행하기' : '다음 설정'}
        disabled={!selected?.recommended}
      />
    </section>
  );
}
