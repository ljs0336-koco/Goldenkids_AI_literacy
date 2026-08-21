import React from 'react';
import factCheckImage from '../../../assets/geumjjok/thumb_module2_media.png';
import { mediaCases } from '../verificationData';
import VerificationMediaArt from '../VerificationMediaArt';

export default function VerificationModeSelectScreen({ onSelectMode }) {
  return (
    <section aria-labelledby="verification-mode-title">
      <div className="verification-hero card">
        <div>
          <span className="verification-kicker">공개하기 전 마지막 확인</span>
          <h2 id="verification-mode-title">진짜일까? 써도 될까?</h2>
          <p>AI의 답과 미디어가 곧 공개될 상황이에요. 하나를 골라 근거와 사용 조건을 직접 확인해 봐요.</p>
        </div>
        <div className="verification-opening-note" role="note">
          <strong>두 활동에서 공통으로 할 일</strong>
          <span>그럴듯한 첫인상에서 멈추지 않고, 공개해도 되는 근거가 있는지 확인해요.</span>
        </div>
      </div>

      <div className="verification-mode-grid">
        <button type="button" className="verification-mode-card" onClick={() => onSelectMode('claim')}>
          <div className="verification-mode-image verification-mode-image--fact">
            <img src={factCheckImage} alt="자료를 살펴보는 AI 금쪽이" />
          </div>
          <div className="verification-mode-copy">
            <span className="verification-time">학교신문 검증 · 약 10분</span>
            <h3>마감 전, AI가 쓴 기사를 확인하라</h3>
            <p>AI가 만든 학교숲 소개문을 문장별로 확인하고, 공개해도 되는 기사로 다시 써요.</p>
            <span className="verification-start">학교신문 편집 시작하기 →</span>
          </div>
        </button>

        <button type="button" className="verification-mode-card verification-mode-card--media" onClick={() => onSelectMode('media')}>
          <VerificationMediaArt mediaCase={mediaCases[0]} decorative className="verification-mode-media-art" />
          <div className="verification-mode-copy">
            <span className="verification-time">미디어 게시 전 확인 · 약 12분</span>
            <h3>업로드 전, 이 콘텐츠를 써도 될까?</h3>
            <p>보이는 단서와 출처, 제작 과정, 당사자 동의를 확인하고 게시 여부를 결정해요.</p>
            <span className="verification-start">게시 요청 확인하기 →</span>
          </div>
        </button>
      </div>

      <p className="verification-safety-note">
        모든 사례는 수업용 가상 인물과 가상 기관으로 만들었어요. 실제 얼굴·목소리 업로드나 카메라·마이크를 사용하지 않습니다.
      </p>
    </section>
  );
}
