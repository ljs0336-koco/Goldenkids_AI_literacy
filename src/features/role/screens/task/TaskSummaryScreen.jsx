import React from 'react';
import { rolePrinciples } from '../../roleData';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function TaskSummaryScreen({ selectedPrinciples = [], onOpenRecord, onReset, onBackToActivities }) {
  return (
    <section className="role-shell role-stage role-completion" aria-labelledby="task-summary-title">
      <img src={geumjjokCelebration} alt="기뻐하는 금쪽이" />
      <span className="role-eyebrow">역할 지도 완성</span>
      <h1 id="task-summary-title">AI에게 맡겨도, 확인은 사람이 해요</h1>
      <p>자동화, AI 도움, 사람 결정을 구별하고 마지막 책임까지 연결했어요.</p>

      <section className="role-completion-record">
        <small>내가 먼저 지킬 원칙</small>
        <strong>{selectedPrinciples[0] || rolePrinciples[0]}</strong>
        <p>AI·자동화 → 사람 확인 → 수정 → 사람 최종 결정</p>
      </section>

      <div className="role-completion-actions">
        <button type="button" className="btn-outline" onClick={onOpenRecord}>내 기록 보기</button>
        <button type="button" className="btn-outline" onClick={onReset}>다시 해보기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>다른 활동 고르기</button>
      </div>
    </section>
  );
}
