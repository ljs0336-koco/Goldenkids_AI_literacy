import React from 'react';
import { safetyGuardrails } from '../../agentData';
import { evaluateGuardrailReadiness } from '../../agentEngine';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function GuardrailSetupScreen({ guardrailChoices = {}, onSelectGuardrail, onNext, onPrev }) {
  const evaluation = evaluateGuardrailReadiness(guardrailChoices);

  return (
    <div className="agent-content-width">
      <div className="text-center mb-5">
        <img src={geumjjokDoctor} alt="통제 설정을 점검하는 금쪽이" className="agent-screen-character" />
        <h2 className="agent-page-title">네 가지 안전 통제 층 설정하기 🛡️</h2>
        <p className="agent-page-lead">한 장치가 모든 위험을 막지는 못합니다. 권한, 한도, 사람 확인, 중단·복구를 겹쳐 설계해 보세요.</p>
      </div>

      <section className={`agent-readiness-banner ${evaluation.hasRecommendedBaseline ? 'is-ready' : ''}`} aria-live="polite">
        <div>
          <span>권장 설정 점검도 · 안전 확률이 아닙니다</span>
          <strong>{evaluation.readinessScore}% · {evaluation.readinessLevel}</strong>
        </div>
        <p>{evaluation.configuredCount}/4개 설정 완료
          {evaluation.hasRecommendedBaseline && ' · 기본 통제 뒤에도 모니터링과 사후 확인은 계속 필요합니다.'}
        </p>
      </section>

      <div className="agent-guardrail-grid">
        {safetyGuardrails.map(guard => {
          const currentOptionId = guardrailChoices[guard.id] || null;
          return (
            <fieldset key={guard.id} className="agent-guardrail-card">
              <legend><span aria-hidden="true">{guard.icon}</span> {guard.title}</legend>
              <p>{guard.desc}</p>
              <div className="agent-guardrail-options">
                {guard.options.map(option => {
                  const isSelected = currentOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onSelectGuardrail?.(guard.id, option.id)}
                      aria-pressed={isSelected}
                      className={`agent-option-button ${isSelected ? 'is-selected' : ''} ${option.recommended ? 'is-recommended' : 'is-risky'}`}
                    >
                      <span>{option.label}</span>
                      <small>{option.recommended ? '위험을 줄이는 설정' : '위험 범위가 커지는 설정'}</small>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 활동 고르기</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={!evaluation.isConfigured}>
          {evaluation.isConfigured ? '이상 행동 대응 실험으로 가기 →' : `4개 항목을 모두 설정하세요 (${evaluation.configuredCount}/4)`}
        </button>
      </div>
    </div>
  );
}
