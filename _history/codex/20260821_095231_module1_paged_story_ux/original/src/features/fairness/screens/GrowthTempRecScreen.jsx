import React from 'react';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationStudent
} from '../fairnessData';
import { getTopActivityRecommendation, rankActivityRecommendations } from '../fairnessEngine';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';
import AiExchangePanel from '../components/AiExchangePanel';
import { growthQuestions } from '../fairnessLearningData';

export default function GrowthTempRecScreen({ questionId, onQuestion, onNext, onPrev }) {
  const ranking = rankActivityRecommendations(activityRecommendationInitialRecords, activityRecommendationOptions);
  const firstRecommendation = getTopActivityRecommendation(activityRecommendationInitialRecords, activityRecommendationOptions);

  return (
    <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="text-center mb-6">
        <img 
          src={geumjjokDoctor} 
          alt="박사 금쪽이" 
          style={{ width: '64px', height: 'auto', marginBottom: '8px' }} 
        />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '8px' }}>
          온라인 기록만 사용한 첫 추천이에요
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
          AI 금쪽이는 {activityRecommendationStudent.name}의 최근 온라인 기록 {activityRecommendationInitialRecords.length}개에서 관심 단서를 찾아 다음 활동을 추천했어요.
        </p>
      </div>

      {/* 임시 추천 카드 */}
      <div 
        style={{
          backgroundColor: '#eef1ef',
          border: '2px solid var(--color-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#405e69', marginBottom: '4px' }}>
          ⭐ 온라인 기록 기준 첫 추천
        </div>
        <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-primary-hover)', margin: '0 0 12px 0' }}>
          {firstRecommendation.name}
        </h3>

        <div className="flex justify-center gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
          {ranking.map(option => (
            <span key={option.key} style={{ fontSize: 'var(--font-size-sm)', backgroundColor: 'white', padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              {option.shortName}: {option.score}점
            </span>
          ))}
        </div>

        <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-base)', fontWeight: '600', color: 'var(--color-primary-hover)' }}>
          "온라인 기록에서는 코딩 활동과 관련된 단서가 가장 많이 보여요."
        </p>

        {/* 경고 박스 */}
        <div 
          style={{
            backgroundColor: '#f3e8e4',
            border: '1.5px solid #d6aaa0',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            color: '#78453c',
            fontSize: 'var(--font-size-sm)',
            lineHeight: '1.5',
            textAlign: 'left'
          }}
        >
          ⚠️ <strong>주의:</strong> 오프라인 수업 활동과 {activityRecommendationStudent.name}이 직접 표현한 관심이 빠져 있어요. 이 추천만으로 {activityRecommendationStudent.name}의 관심과 가능성을 모두 안다고 할 수 없어요.
        </div>
      </div>

      {/* 처음 제공된 온라인 기록 요약 */}
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-secondary)' }}>
        📋 AI가 처음 확인한 온라인 기록
      </h3>
      <div className="flex flex-col gap-2 mb-6">
        {activityRecommendationInitialRecords.map(record => (
            <div 
              key={record.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--color-border)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'var(--font-size-sm)'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold' }}>• {record.title}</div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>{record.desc}</div>
              </div>
              <span style={{ color: '#405e69', fontWeight: 'bold', flexShrink: 0, marginLeft: '12px' }}>
                {record.source}
              </span>
            </div>
          ))}
      </div>

      <AiExchangePanel
        questions={growthQuestions}
        selectedId={questionId}
        onSelect={onQuestion}
        title="첫 추천을 그대로 넘기지 말고 하나 물어봐요"
      />

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>
          ← 이전
        </button>
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!questionId}
          style={{ minHeight: '52px', fontSize: 'var(--font-size-base)' }}
        >
          {questionId ? '빠진 기록 찾아보기 →' : 'AI에게 질문을 하나 골라 주세요'}
        </button>
      </div>
    </div>
  );
}
