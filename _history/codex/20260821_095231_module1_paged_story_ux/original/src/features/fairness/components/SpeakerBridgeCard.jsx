import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

export default function SpeakerBridgeCard({ prompt, value, onChange }) {
  return (
    <section className="fair-speaker-card" aria-labelledby="speaker-bridge-title">
      <img src={geumjjokMain} alt="금쪽이 스피커 캐릭터" />
      <div className="fair-speaker-copy">
        <span className="fair-eyebrow">금쪽이 스피커와 연결하기 · 선택 활동</span>
        <h3 id="speaker-bridge-title">먼저 금쪽이에게 이렇게 말해 볼까요?</h3>
        <blockquote>“{prompt}”</blockquote>
        <p>실제 금쪽이 챗봇과 말해 봐도 되고, 지금 스피커를 쓸 수 없다면 준비된 응답으로 같은 실험을 이어갈 수 있어요. 이 웹앱은 음성을 녹음하지 않아요.</p>
        <div className="fair-choice-row" role="group" aria-label="금쪽이 대화 방법 선택">
          <button type="button" className={value === 'speaker' ? 'is-selected' : ''} onClick={() => onChange('speaker')}>금쪽이와 대화했어요</button>
          <button type="button" className={value === 'sample' ? 'is-selected' : ''} onClick={() => onChange('sample')}>준비된 응답으로 계속하기</button>
        </div>
      </div>
    </section>
  );
}
