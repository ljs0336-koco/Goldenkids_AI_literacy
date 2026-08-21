import React, { useState } from 'react';
import {
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

  return (
    <div className="card fair-story-page">
      <div className="text-center mb-4">
        <img src={geumjjokIdea} alt="아이디어 금쪽이" style={{ width: '62px', height: 'auto', marginBottom: '6px' }} />
        <span className="fair-eyebrow">AI가 아직 듣지 못한 이야기</span>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: '4px 0 8px' }}>{activityRecommendationStudent.name}을 기록보다 더 알아가요</h2>
        <p className="fair-one-line-help">이야기를 한 장씩 읽고, AI에게 새로 알려 주세요.</p>
      </div>

      <article className={`fair-record-page ${isViewed ? 'is-viewed' : ''}`}>
        <span className="fair-eyebrow">{record.source}</span>
        <h3>{record.title}</h3>
        <p>{record.desc}</p>
        <p className="fair-record-reveal"><strong>이 이야기에서 보이는 하늘이</strong><span>{record.reveals}</span></p>
        <button
          type="button"
          className={isViewed ? 'btn-outline fair-record-confirm' : 'btn-primary fair-record-confirm'}
          onClick={() => onStudentViewed?.(record.id)}
          disabled={isViewed}
        >
          {isViewed ? 'AI에게 알려 줬어요' : '이 이야기를 AI에게 알려주기'}
        </button>
      </article>

      <PageTurnNav
        current={pageIndex}
        total={activityRecommendationSupplementRecords.length}
        onPrev={() => setPageIndex(index => Math.max(0, index - 1))}
        onNext={() => setPageIndex(index => Math.min(activityRecommendationSupplementRecords.length - 1, index + 1))}
        disableNext={!isViewed}
        prevLabel="이전 이야기"
        nextLabel="다음 이야기"
      />

      <p className="text-center" style={{ color: allViewed ? 'var(--color-primary-hover)' : 'var(--color-text-muted)', fontWeight: 800 }}>
        AI에게 알려 준 하늘이의 이야기 {viewedCount} / {activityRecommendationSupplementRecords.length}
      </p>

      <div className="bottom-nav-bar">
        <button className="btn-outline" onClick={onPrev}>← 이전</button>
        <button className="btn-primary" onClick={onNext} disabled={!allViewed} style={{ minHeight: '52px' }}>
          {allViewed ? '새롭게 보이는 꿈 후보 살펴보기 →' : `하늘이의 이야기 ${activityRecommendationSupplementRecords.length}가지를 차례로 알려 주세요`}
        </button>
      </div>
    </div>
  );
}
