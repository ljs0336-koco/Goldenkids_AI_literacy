import React from 'react';
import { activityRecommendationOptions, projectTeamPresets } from '../fairnessData';
import { growthFinalChoices, growthQuestions } from '../fairnessLearningData';
import geumjjokCelebration from '../../../assets/geumjjok/금쪽이_표정_꽃화관.png';

function findPreset(weights) {
  if (!weights) return null;
  return projectTeamPresets.find(preset => Object.keys(preset.weights).every(key => preset.weights[key] === weights[key])) || null;
}

export default function CompletionScreen({ mode, state = {}, onOpenRecord, onReset, onBackToActivities }) {
  const isGrowth = mode === 'growth';
  const growthQuestion = growthQuestions.find(item => item.id === state.growthQuestionId)?.label || 'AI가 직업을 떠올린 이유를 질문함';
  const finalChoice = growthFinalChoices.find(item => item.id === state.growthFinalChoice)?.title || '꿈을 더 알아볼 다음 행동을 선택함';
  const selectedCareers = (state.growthCareerChoices || [])
    .map(id => activityRecommendationOptions.find(option => option.key === id)?.shortName)
    .filter(Boolean);
  const selectedPreset = findPreset(state.teamCriteriaWeights);
  const correctedRecord = state.teamAppealChoice === 2;

  return (
    <div className="card fair-completion-page">
      <header className="text-center">
        <img src={geumjjokCelebration} alt="축하하는 금쪽이" style={{ width: '84px', height: 'auto', marginBottom: '8px' }} />
        <span className="fair-badge">{isGrowth ? '하늘이의 꿈 탐색 완료' : '프로젝트 팀 재검토 완료'}</span>
        <h2>{isGrowth ? 'AI의 첫 답을 하늘이의 탐색 계획으로 바꿨어요' : 'AI의 첫 명단을 설명할 수 있는 결정으로 바꿨어요'}</h2>
        <p>{isGrowth ? '직업 하나를 정답으로 고르지 않고, 더 알아볼 가능성과 다음 행동을 남겼어요.' : '기준을 고르고 기록 오류에 대응하며 팀을 다시 살펴봤어요.'}</p>
      </header>

      <section className="fair-before-after" aria-label="활동 전후 비교">
        <article>
          <small>처음</small>
          <h3>{isGrowth ? 'AI가 고른 직업 하나' : 'AI가 빠르게 만든 네 명의 명단'}</h3>
          <p>{isGrowth ? '소프트웨어 개발자가 어울린다는 첫 제안을 받았어요.' : '현재 기록이 높은 학생을 중심으로 결과가 먼저 나왔어요.'}</p>
        </article>
        <div aria-hidden="true">→</div>
        <article className="is-after">
          <small>내가 확인한 뒤</small>
          <h3>{isGrowth ? '두 가지 꿈과 다음 탐색' : '기준과 재검토가 있는 팀 구성'}</h3>
          <p>{isGrowth
            ? `${selectedCareers.join(' · ') || '여러 꿈 후보'}를 더 알아보기로 했어요.`
            : `${selectedPreset?.name || '직접 고른 기준'}으로 다시 보고, ${correctedRecord ? '잘못된 기록도 바로잡았어요.' : '선택 뒤에 남은 문제도 확인했어요.'}`}</p>
        </article>
      </section>

      <section className="fair-learning-receipt" aria-labelledby="learning-receipt-title">
        <h3 id="learning-receipt-title">내가 남긴 결정</h3>
        {isGrowth ? (
          <dl>
            <dt>AI에게 물어본 말</dt><dd>{growthQuestion}</dd>
            <dt>하늘이의 다음 행동</dt><dd>{finalChoice}</dd>
            <dt>다음에도 쓸 질문</dt><dd>“AI는 무엇을 보았고, 이 사람의 어떤 이야기를 아직 모르지?”</dd>
          </dl>
        ) : (
          <dl>
            <dt>내가 고른 기준</dt><dd>{selectedPreset?.name || '프로젝트 목표에 맞는 기준'}</dd>
            <dt>기록 오류 대응</dt><dd>{correctedRecord ? '기록을 사실에 맞게 고친 뒤 같은 기준으로 다시 살핌' : '선택으로 인해 기록과 절차에 남은 문제를 확인함'}</dd>
            <dt>다음에 지킬 약속</dt><dd>{state.teamSelectedPrinciples?.join(' · ') || '기준 공개와 재검토 방법 마련'}</dd>
          </dl>
        )}
      </section>

      <p className="fair-closing-sentence">
        {isGrowth
          ? '다음에 AI의 진로 추천을 받으면, 답보다 먼저 빠진 이야기가 없는지 물어볼 거예요.'
          : '다음에 AI가 사람을 추천하면, 명단보다 먼저 기준·기록·재검토 방법을 확인할 거예요.'}
      </p>

      <div className="flex justify-center gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
        <button type="button" className="btn-outline" onClick={onOpenRecord} style={{ minHeight: '48px' }}>내 탐구 기록 보기</button>
        <button type="button" className="btn-outline" onClick={onReset} style={{ minHeight: '48px' }}>이 이야기 다시 해 보기</button>
        <button type="button" className="btn-primary" onClick={onBackToActivities} style={{ minHeight: '48px' }}>다른 이야기 고르기</button>
      </div>
    </div>
  );
}
