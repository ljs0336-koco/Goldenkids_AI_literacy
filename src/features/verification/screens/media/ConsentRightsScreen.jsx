import React from 'react';

export default function ConsentRightsScreen({ mediaCase, selectedRightIds, onToggleRight, onNext, onPrev }) {
  return (
    <section className="card verification-screen" aria-labelledby="consent-rights-title">
      <span className="verification-kicker">④ 동의와 권리 판단</span>
      <h2 id="consent-rights-title">게시 전에 어떤 조건을 확인해야 할까요?</h2>
      <p>법률 퀴즈처럼 유죄·무죄를 고르는 대신, 피해를 줄이기 위한 구체적인 행동을 선택해요.</p>

      <div className="verification-rights-tags" aria-label="영향을 받을 수 있는 권리와 가치">
        {mediaCase.affectedRights.map(item => <span key={item}>🛡️ {item}</span>)}
      </div>

      <fieldset className="verification-fieldset">
        <legend>필요하다고 생각하는 확인·수정 행동</legend>
        <div className="verification-right-choice-list">
          {mediaCase.rightsChoices.map(choice => {
            const selected = selectedRightIds.includes(choice.id);
            return (
              <label key={choice.id} className={selected ? 'is-selected' : ''}>
                <input type="checkbox" checked={selected} onChange={() => onToggleRight(choice.id)} />
                <span>{choice.text}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="verification-info-banner">
        <strong>생각할 질문</strong>
        <p>누구에게 동의를 받아야 하나요? 무엇을 표시해야 하나요? 어디에, 얼마나 오래 공개해도 될까요?</p>
      </div>

      <div className="bottom-nav-bar">
        <button type="button" className="btn-outline" onClick={onPrev}>← 제작 이력</button>
        <button type="button" className="btn-primary" onClick={onNext} disabled={selectedRightIds.length === 0}>최종 사용 판단 →</button>
      </div>
    </section>
  );
}
