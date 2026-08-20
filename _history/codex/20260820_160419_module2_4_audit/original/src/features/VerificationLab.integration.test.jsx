import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import VerificationLabPage from './VerificationLabPage';
import VerificationWorksheet from './print/VerificationWorksheet';
import SourceCheckScreen from './screens/claim/SourceCheckScreen';
import VisualClueScreen from './screens/media/VisualClueScreen';
import ProvenanceScreen from './screens/media/ProvenanceScreen';
import { claimById, mediaCaseById } from './verificationData';
import { initialVerificationState } from './useVerificationState';

describe('VerificationLab UI and flow', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(() => window.localStorage.clear());

  it('학생 화면과 인쇄 활동지에 차시 번호를 노출하지 않는다', () => {
    render(<VerificationLabPage />);
    expect(screen.getByText('정보 검증 탐구 · 약 10분')).toBeInTheDocument();
    expect(screen.getByText('합성 미디어·인권 탐구 · 약 15분')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/[34]차시/);

    const { container } = render(<VerificationWorksheet state={initialVerificationState} />);
    expect(container.textContent).not.toMatch(/[34]차시/);
  });

  it('모드 선택에서 AI 답변 검증 활동으로 진입한다', () => {
    render(<VerificationLabPage />);
    fireEvent.click(screen.getByRole('button', { name: /AI 금쪽이의 답변, 그대로 믿어도 될까/ }));
    expect(screen.getByText('AI 답변이 자연스러워도 사실이라는 뜻은 아니에요')).toBeInTheDocument();
    expect(screen.getAllByText(/학교숲은 2024년 4월 22일/).length).toBeGreaterThan(0);
  });

  it('출처 확인은 두 자료 이상 선택해야 다음 단계로 갈 수 있다', () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <SourceCheckScreen claim={claimById.claim_hours} selectedSourceIds={[]} onToggleSource={onToggle} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /선택한 근거 비교하기/ })).toBeDisabled();
    rerender(
      <SourceCheckScreen claim={claimById.claim_hours} selectedSourceIds={['source_notice_current', 'source_newsletter_old']} onToggleSource={onToggle} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /선택한 근거 비교하기/ })).toBeEnabled();
  });

  it('미디어 첫 단서는 관찰 선택과 비단정 약속을 모두 해야 진행된다', () => {
    const mediaCase = mediaCaseById.media_voice;
    const { rerender } = render(
      <VisualClueScreen mediaCase={mediaCase} selectedObservationIds={['voice_wave']} acknowledged={false} onToggleObservation={() => {}} onToggleAcknowledged={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /출처와 제작 이력 추적/ })).toBeDisabled();
    rerender(
      <VisualClueScreen mediaCase={mediaCase} selectedObservationIds={['voice_wave']} acknowledged={true} onToggleObservation={() => {}} onToggleAcknowledged={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /출처와 제작 이력 추적/ })).toBeEnabled();
  });

  it('출처·제작 이력 카드 네 장을 모두 확인해야 권리 판단으로 이동한다', () => {
    const mediaCase = mediaCaseById.media_context;
    const allIds = mediaCase.provenance.map(card => card.id);
    const { rerender } = render(
      <ProvenanceScreen mediaCase={mediaCase} reviewedIds={allIds.slice(0, 3)} onReview={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /동의와 권리 확인/ })).toBeDisabled();
    rerender(
      <ProvenanceScreen mediaCase={mediaCase} reviewedIds={allIds} onReview={() => {}} onNext={() => {}} onPrev={() => {}} />
    );
    expect(screen.getByRole('button', { name: /동의와 권리 확인/ })).toBeEnabled();
  });

  it('모든 미디어 사례가 교육용 가상 사례임을 명시한다', () => {
    render(<VerificationLabPage />);
    fireEvent.click(screen.getByRole('button', { name: /이 사진과 목소리, 사용해도 괜찮을까/ }));
    expect(screen.getByText(/모든 그림과 인물, 학교·기관 이름은 수업을 위해 만든 가상 사례/)).toBeInTheDocument();
    expect(screen.queryByText(/사진 업로드|음성 업로드/)).not.toBeInTheDocument();
  });
});
