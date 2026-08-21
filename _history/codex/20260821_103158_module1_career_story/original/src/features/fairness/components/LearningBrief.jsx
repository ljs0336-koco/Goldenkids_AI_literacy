import React from 'react';

export default function LearningBrief({ brief }) {
  if (!brief) return null;

  return (
    <section className="fair-learning-brief" aria-labelledby="fair-learning-brief-title">
      <div>
        <span className="fair-eyebrow">{brief.eyebrow}</span>
        <h2 id="fair-learning-brief-title">{brief.title}</h2>
      </div>
      <div className="fair-learning-brief-grid">
        <p><strong>내가 할 일</strong><span>{brief.doText}</span></p>
        <p><strong>여기서 배우는 것</strong><span>{brief.learnText}</span></p>
      </div>
      <p className="fair-skill-chip"><strong>AI 리터러시</strong> {brief.skill}</p>
    </section>
  );
}
