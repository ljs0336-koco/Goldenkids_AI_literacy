import React from 'react';
import factCheckImage from '../../../assets/geumjjok/thumb_module2_media.png';
import { mediaCases } from '../verificationData';
import VerificationMediaArt from '../VerificationMediaArt';

export default function VerificationModeSelectScreen({ onSelectMode }) {
  return (
    <section aria-labelledby="verification-mode-title">
      <div className="verification-hero card">
        <div>
          <span className="verification-kicker">AI 금쪽이 진실·미디어 검증소</span>
          <h2 id="verification-mode-title">자연스러운 답과 그럴듯한 미디어, 무엇부터 확인할까요?</h2>
          <p>정답을 빨리 맞히는 곳이 아니에요. 주장·출처·날짜·제작 이력·동의를 차례로 확인해요.</p>
        </div>
        <div className="verification-rule-strip" role="note">
          <strong>검증 순서</strong>
          <span>① 주장·단서 찾기</span>
          <span>② 출처·날짜 확인</span>
          <span>③ 근거·권리 비교</span>
          <span>④ 사람이 판단</span>
        </div>
      </div>

      <div className="verification-mode-grid">
        <button type="button" className="verification-mode-card" onClick={() => onSelectMode('claim')}>
          <div className="verification-mode-image verification-mode-image--fact">
            <img src={factCheckImage} alt="자료를 살펴보는 AI 금쪽이" />
          </div>
          <div className="verification-mode-copy">
            <span className="verification-time">정보 검증 탐구 · 약 10분</span>
            <h3>AI 금쪽이의 답변, 그대로 믿어도 될까?</h3>
            <p>답변을 세 개의 주장으로 나누고, 서로 다른 자료의 출처와 날짜를 비교해요.</p>
            <span className="verification-start">주장 검증 시작하기 →</span>
          </div>
        </button>

        <button type="button" className="verification-mode-card verification-mode-card--media" onClick={() => onSelectMode('media')}>
          <VerificationMediaArt mediaCase={mediaCases[0]} decorative className="verification-mode-media-art" />
          <div className="verification-mode-copy">
            <span className="verification-time">합성 미디어·인권 탐구 · 약 15분</span>
            <h3>이 사진과 목소리, 사용해도 괜찮을까?</h3>
            <p>눈에 보이는 단서를 넘어 원래 출처, 제작 이력, 동의와 피해 가능성을 확인해요.</p>
            <span className="verification-start">미디어 CSI 시작하기 →</span>
          </div>
        </button>
      </div>

      <p className="verification-safety-note">
        🔒 모든 사례는 수업용 가상 인물과 가상 기관으로 만들었어요. 실제 얼굴·목소리 업로드나 카메라·마이크를 사용하지 않습니다.
      </p>
    </section>
  );
}
