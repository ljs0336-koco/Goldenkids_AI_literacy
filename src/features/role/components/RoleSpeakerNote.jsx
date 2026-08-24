import React from 'react';
import geumjjokDoctor from '../../../assets/geumjjok/금쪽이_캐릭터_박사_안경콧수염.png';

export default function RoleSpeakerNote() {
  return (
    <aside className="role-speaker-note">
      <img src={geumjjokDoctor} alt="금쪽이 스피커" />
      <p><strong>금쪽이 스피커가 있다면</strong> 완성한 부탁 문장을 직접 말해 보고, 답이 달라지는지 잠깐 확인해 보세요.</p>
    </aside>
  );
}
