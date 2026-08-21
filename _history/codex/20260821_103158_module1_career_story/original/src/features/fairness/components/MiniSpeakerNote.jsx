import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

export default function MiniSpeakerNote({ prompt }) {
  return (
    <aside className="fair-speaker-whisper" aria-label="금쪽이 대화 제안">
      <img src={geumjjokMain} alt="" aria-hidden="true" />
      <p>
        <strong>금쪽이와도 대화해 보세요</strong>
        <span>“{prompt}”</span>
      </p>
    </aside>
  );
}
