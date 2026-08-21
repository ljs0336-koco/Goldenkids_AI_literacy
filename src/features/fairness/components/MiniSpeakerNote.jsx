import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

export default function MiniSpeakerNote({ prompt }) {
  return (
    <aside className="fair-speaker-whisper" aria-label="금쪽이 대화 제안">
      <img src={geumjjokMain} alt="" aria-hidden="true" />
      <p>
        <strong>금쪽이 스피커가 곁에 있다면</strong>
        <span>이렇게 한 번 더 물어봐도 좋아요. “{prompt}”</span>
      </p>
    </aside>
  );
}
