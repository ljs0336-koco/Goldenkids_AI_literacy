import React from 'react';
import geumjjokCelebration from '../../../assets/geumjjok/금쪽이_표정_꽃화관.png';
import { growthFinalChoices, growthQuestions, teamQuestions } from '../fairnessLearningData';

const speakerLabels = {
  speaker: '금쪽이 챗봇과 직접 대화함',
  sample: '준비된 응답으로 실험함'
};

export default function CompletionScreen({ mode, state = {}, onOpenRecord, onReset, onBackToActivities }) {
  const isGrowth = mode === 'growth';
  const growthQuestion = growthQuestions.find(item => item.id === state.growthQuestionId)?.label || '첫 추천에 질문함';
  const finalChoice = growthFinalChoices.find(item => item.id === state.growthFinalChoice)?.title || '추천을 확인한 뒤 직접 선택함';
  const teamQuestion = teamQuestions.find(item => item.id === state.teamQuestionId)?.label || '대표팀 추천에 설명을 요구함';
  const appealLabels = {
    1: '결과를 그대로 두었을 때 남는 문제를 확인함',
    2: '기록을 정정하고 같은 기준으로 다시 계산함',
    3: '한 사람만 예외로 두었을 때 생기는 문제를 확인함'
  };

  return (
    <div className="card text-center" style={{ maxWidth: '760px', margin: '0 auto' }}>
      <img src={geumjjokCelebration} alt="축하하는 금쪽이" style={{ width: '84px', height: 'auto', marginBottom: '12px' }} />
      <span className="fair-badge">{isGrowth ? '데이터 탐험가' : '공정성 감시자'}</span>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', margin: '0 0 8px' }}>
        {isGrowth ? 'AI 추천을 검토하는 나만의 방법을 만들었어요' : 'AI 선발을 다시 살피는 나만의 기준을 만들었어요'}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', marginBottom: '24px' }}>
        내가 실제로 한 행동을 확인하고, 다음 AI 사용에서도 그대로 꺼내 써 보세요.
      </p>

      <section className="fair-learning-receipt" aria-labelledby="learning-receipt-title">
        <h3 id="learning-receipt-title">나의 AI 리터러시 탐구 기록</h3>
        {isGrowth ? (
          <dl>
            <dt>AI와 시작한 방법</dt><dd>{speakerLabels[state.growthSpeakerPath] || '금쪽이 응답을 살펴봄'}</dd>
            <dt>내가 던진 질문</dt><dd>{growthQuestion}</dd>
            <dt>내가 확인한 것</dt><dd>온라인 기록과 빠져 있던 오프라인·관심 기록을 비교함</dd>
            <dt>나의 최종 행동</dt><dd>{finalChoice}</dd>
            <dt>다음에도 쓸 방법</dt><dd>“AI가 무엇을 보았고 무엇을 놓쳤지?”라고 먼저 확인하기</dd>
          </dl>
        ) : (
          <dl>
            <dt>AI와 시작한 방법</dt><dd>{speakerLabels[state.teamSpeakerPath] || '금쪽이 응답을 살펴봄'}</dd>
            <dt>내가 던진 질문</dt><dd>{teamQuestion}</dd>
            <dt>내가 바꾼 것</dt><dd>팀에 필요한 가치와 기준을 직접 선택함</dd>
            <dt>나의 재검토</dt><dd>{appealLabels[state.teamAppealChoice] || '잘못된 기록의 영향을 살펴봄'}</dd>
            <dt>내가 고른 원칙</dt><dd>{state.teamSelectedPrinciples?.join(' · ') || '설명, 이의제기, 기록 정정의 필요성을 확인함'}</dd>
          </dl>
        )}
      </section>

      <div className="p-4 mb-6" style={{ backgroundColor: '#f5efe3', borderRadius: 'var(--radius-md)', border: '1px solid #d7c19c', textAlign: 'left' }}>
        <strong>오프라인으로 이어가기</strong>
        <p style={{ margin: '6px 0 0' }}>
          짝과 서로 다른 선택을 비교하고 “어떤 정보나 기준 때문에 결과가 달라졌는지” 한 문장으로 말해 보세요. 금쪽이 스피커가 있다면 그 문장을 다시 들려주고 다른 관점도 요청해 보세요.
        </p>
      </div>

      <div className="flex justify-center gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
        <button type="button" className="btn-outline" onClick={onOpenRecord} style={{ minHeight: '48px' }}>내 탐구 기록 보기</button>
        <button type="button" className="btn-outline" onClick={onReset} style={{ minHeight: '48px' }}>이 실험 다시 해 보기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities} style={{ minHeight: '48px' }}>다른 실험 고르기</button>
      </div>
    </div>
  );
}
