import React from 'react';
import geumjjokCelebration from '../../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

export default function CharterSummaryScreen({ onReset, onBackToActivities }) {
  return (
    <div className="card text-center agent-summary-card">
      <img src={geumjjokCelebration} alt="AI 감독관 배지를 받은 금쪽이" className="agent-summary-character" />
      <div className="agent-badge-label">AI 감독관 배지</div>
      <h2 className="agent-page-title">실행 전 확인하고, 실행 뒤에도 책임 있게 살펴보기</h2>
      <p className="agent-page-lead">에이전트의 편리함을 활용하면서도 도구 권한과 실제 영향을 사람이 점검하는 네 가지 원칙을 정리했습니다.</p>

      <section className="agent-principles-card">
        <h3>AI 에이전트 안전 운영 4원칙</h3>
        <ol>
          <li><span>1</span><p><strong>필요한 만큼만 허용하기</strong>도구·대상·시간 권한을 미션 범위로 제한합니다.</p></li>
          <li><span>2</span><p><strong>횟수·시간·금액에 한도 두기</strong>반복 오류가 커지기 전에 새 실행을 막습니다.</p></li>
          <li><span>3</span><p><strong>영향이 큰 실행은 근거로 확인하기</strong>외부 발송·결제·물리 제어는 내용과 조건을 보고 사람이 결정합니다.</p></li>
          <li><span>4</span><p><strong>중단 뒤 권한 회수와 복구까지 하기</strong>이미 일어난 결과를 확인하고 알림·기록·복구 절차를 이어갑니다.</p></li>
        </ol>
      </section>

      <div className="agent-reflection-note">
        <strong>마지막 질문</strong>
        <span>내가 사용하는 AI가 어떤 도구와 정보에 접근하며, 실행 결과를 누가 확인하고 책임지는지 설명할 수 있나요?</span>
      </div>

      <div className="flex justify-center gap-4 agent-summary-actions">
        <button type="button" className="btn-outline" onClick={onReset}>안전 운영 다시 설계하기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities}>모듈 활동 고르기</button>
      </div>
    </div>
  );
}
