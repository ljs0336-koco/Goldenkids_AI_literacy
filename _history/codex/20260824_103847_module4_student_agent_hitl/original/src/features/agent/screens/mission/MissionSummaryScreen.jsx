import React from 'react';
import { getMissionById } from '../../agentEngine';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';
import geumjjokDoctor from '../../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function MissionSummaryScreen({ missionId, decision, onReset, onBackToActivities }) {
  const mission = getMissionById(missionId);
  const checkpoint = mission.humanCheckpoint;
  const isAligned = decision === checkpoint.expectedDecision;
  const selectedOption = checkpoint.options.find(option => option.id === decision);

  return (
    <div className="card text-center agent-summary-card">
      <img
        src={isAligned ? geumjjokCelebration : geumjjokDoctor}
        alt={isAligned ? '판단을 정리한 금쪽이' : '근거를 다시 살펴보는 금쪽이'}
        className="agent-summary-character"
      />
      <h2 className="agent-page-title">에이전트 실행 판단 기록 완료</h2>
      <p className="agent-page-lead">
        {isAligned
          ? '실행 요청과 근거를 비교해 판단했습니다.'
          : '결정을 남겼습니다. 아래 근거와 권장 판단을 한 번 더 비교해 보세요.'}
      </p>

      <section className={`agent-result-card ${isAligned ? 'is-aligned' : 'needs-review'}`}>
        <div className="agent-result-heading">
          <strong>{mission.icon} {mission.title}</strong>
          <span>{decision === 'approve' ? '✅ 조건부 승인' : '⏸️ 실행 보류'}</span>
        </div>
        <p><strong>내 판단:</strong> {selectedOption?.label || '기록 없음'}</p>
        <p><strong>이 사례의 근거 기반 판단:</strong> {checkpoint.expectedDecision === 'approve' ? '조건부 승인 가능' : '실행 보류 후 수정·확인'}</p>
        <p><strong>배운 점:</strong> {mission.takeaway}</p>
      </section>

      <div className="agent-reflection-note">
        <strong>기억하기</strong>
        <span>사람이 승인 버튼을 눌렀다는 사실만으로 실행이 안전해지는 것은 아닙니다. 사람이 볼 수 있는 근거와 선택 가능한 보류 절차가 함께 있어야 합니다.</span>
      </div>

      <div className="flex justify-center gap-4 agent-summary-actions">
        <button type="button" className="btn-outline" onClick={onReset}>다른 미션 판단하기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>모듈 활동 고르기</button>
      </div>
    </div>
  );
}
