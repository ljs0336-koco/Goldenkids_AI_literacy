import React, { useState } from 'react';
import {
  activityRecommendationOptions,
  activityRecommendationStudent,
  activityRecommendationSupplementRecords
} from '../fairnessData';
import PageTurnNav from '../components/PageTurnNav';
import geumjjokIdea from '../../../assets/geumjjok/금쪽이_캐릭터_아이디어_전구안경.png';

export default function GrowthSupplementScreen({ viewedStudentIds = [], onStudentViewed, onNext, onPrev }) {
  const [pageIndex, setPageIndex] = useState(0);
  const record = activityRecommendationSupplementRecords[pageIndex];
  const isViewed = viewedStudentIds.includes(record.id);
  const viewedCount = activityRecommendationSupplementRecords.filter(item => viewedStudentIds.includes(item.id)).length;
  const allViewed = viewedCount === activityRecommendationSupplementRecords.length;
  const relatedOptions = activityRecommendationOptions.filter(option => record.signals[option.key] > 0);

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokIdea} alt="아이디어 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '0 0 8px' }}>AI가 놓친 기록을 한 장씩 확인해요</h2>
        <p className="fair-one-line-help">기록을 확인한 뒤 다음 장으로 넘겨 주세요.</p>
      </div>

      <article className={`fair-record-page ${isViewed ? 'is-viewed' : ''}`}>
        <span className="fair-eyebrow">{record.source}</span>
        <h3>{record.title}</h3>
        <p>{record.desc}</p>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          {relatedOptions.map(option => (
            <span key={option.key} style={{ padding: '5px 9px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-soft)', fontSize: '14px', fontWeight: 700 }}>
              {option.shortName} 관심 단서 +{record.signals[option.key]}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={isViewed ? 'btn-outline fair-record-confirm' : 'btn-primary fair-record-confirm'}
          onClick={() => onStudentViewed?.(record.id)}
          disabled={isViewed}
        >
          {isViewed ? '이 기록을 확인했어요' : '☝ 이 기록 확인하기'}
        </button>
      </article>

      <PageTurnNav
        current={pageIndex}
        total={activityRecommendationSupplementRecords.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(activityRecommendationSupplementRecords.length - 1, index + 1))}
        disableNext={!isViewed}
        prevLabel="이전 기록"
        nextLabel="다음 기록"
      />

      <p className="text-center" style={{ color: allViewed ? 'var(--color-primary-hover)' : 'var(--color-text-muted)', fontWeight: 800 }}>
        {activityRecommendationStudent.name}의 빠진 기록 {viewedCount} / {activityRecommendationSupplementRecords.length}개 확인
      </p>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={!allViewed} style={{ minHeight: '52px' }}>
          {allViewed ? '전체 기록으로 다시 추천받기 →' : '기록 3개를 차례로 확인해 주세요'}
        </button>
      </div>
    </div>
  );
}
