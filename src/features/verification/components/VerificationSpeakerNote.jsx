import React from 'react';
import geumjjokMain from '../../../assets/geumjjok/금쪽이_캐릭터_기본_무지개고깔.png';

export default function VerificationSpeakerNote({ prompt }) {
  return (
    <aside className="verification-speaker-note" aria-label="금쪽이 스피커 대화 제안">
      <img src={geumjjokMain} alt="" aria-hidden="true" />
      <p><strong>금쪽이 스피커가 곁에 있다면</strong><span>이렇게 물어본 뒤 앱에서 직접 확인해도 좋아요. “{prompt}”</span></p>
    </aside>
  );
}
