import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import VerificationLabPage from './VerificationLabPage';
import VerificationWorksheet from './print/VerificationWorksheet';
import ClaimIntroScreen from './screens/claim/ClaimIntroScreen';
import ClaimIdentifyScreen from './screens/claim/ClaimIdentifyScreen';
import SourceCheckScreen from './screens/claim/SourceCheckScreen';
import EvidenceCompareScreen from './screens/claim/EvidenceCompareScreen';
import ClaimDecisionScreen from './screens/claim/ClaimDecisionScreen';
import VerifiedCardScreen from './screens/claim/VerifiedCardScreen';
import MediaIntroScreen from './screens/media/MediaIntroScreen';
import VisualClueScreen from './screens/media/VisualClueScreen';
import ProvenanceScreen from './screens/media/ProvenanceScreen';
import ConsentRightsScreen from './screens/media/ConsentRightsScreen';
import MediaDecisionScreen from './screens/media/MediaDecisionScreen';
import VerificationCompletionScreen from './screens/media/VerificationCompletionScreen';
import { claimById, mediaCaseById } from './verificationData';
import { initialVerificationState } from './useVerificationState';

function SourceHarness() {
  const [selected, setSelected] = useState([]);
  const toggle = id => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return <SourceCheckScreen claim={claimById.claim_hours} selectedSourceIds={selected} onToggleSource={toggle} onNext={() => {}} onPrev={() => {}} />;
}

function ClaimDecisionHarness() {
  const [decision, setDecision] = useState('');
  const [reason, setReason] = useState('');
  return (
    <ClaimDecisionScreen
      claim={claimById.claim_opening}
      decisionId={decision}
      reasonId={reason}
      onChangeDecision={setDecision}
      onChangeReason={setReason}
      onSave={() => {}}
      onContinue={() => {}}
      onPrev={() => {}}
    />
  );
}

function VisualHarness() {
  const mediaCase = mediaCaseById.media_voice;
  const [observations, setObservations] = useState([]);
  const [acknowledged, setAcknowledged] = useState(false);
  const toggle = id => setObservations(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return (
    <VisualClueScreen
      mediaCase={mediaCase}
      selectedObservationIds={observations}
      acknowledged={acknowledged}
      onToggleObservation={toggle}
      onToggleAcknowledged={() => setAcknowledged(value => !value)}
      onNext={() => {}}
      onPrev={() => {}}
    />
  );
}

function ProvenanceHarness() {
  const mediaCase = mediaCaseById.media_voice;
  const [reviewed, setReviewed] = useState([]);
  const review = id => setReviewed(current => current.includes(id) ? current : [...current, id]);
  return <ProvenanceScreen mediaCase={mediaCase} reviewedIds={reviewed} onReview={review} onNext={() => {}} onPrev={() => {}} />;
}

function RightsHarness() {
  const mediaCase = mediaCaseById.media_voice;
  const [selected, setSelected] = useState([]);
  const toggle = id => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return <ConsentRightsScreen mediaCase={mediaCase} selectedRightIds={selected} onToggleRight={toggle} onNext={() => {}} onPrev={() => {}} />;
}

describe('Verification module story-led student flow', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(() => window.localStorage.clear());

  it('1. 학생 화면과 인쇄 기록에 차시 번호가 노출되지 않는다', () => {
    render(<VerificationLabPage />);
    expect(screen.getByText('학교신문 검증 · 약 10분')).toBeInTheDocument();
    expect(screen.getByText('미디어 게시 전 확인 · 약 12분')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/[34]차시/);
    const { container } = render(<VerificationWorksheet state={initialVerificationState} />);
    expect(container.textContent).not.toMatch(/[34]차시/);
  });

  it('2. 활동 선택 화면은 학생이 공개 전에 마주할 두 사건을 보여 준다', () => {
    render(<VerificationLabPage />);
    expect(screen.getByRole('heading', { name: '진짜일까? 써도 될까?' })).toBeInTheDocument();
    expect(screen.getByText('마감 전, AI가 쓴 기사를 확인하라')).toBeInTheDocument();
    expect(screen.getByText('업로드 전, 이 콘텐츠를 써도 될까?')).toBeInTheDocument();
    expect(screen.queryByText('진실·미디어 검증소')).not.toBeInTheDocument();
  });

  it('3. 학교신문 활동은 개념 설명보다 마감 상황과 AI 초안으로 시작한다', () => {
    render(<ClaimIntroScreen onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText('15분')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '이 글을 그대로 실어도 될까요?' })).toBeInTheDocument();
    expect(screen.getByText(/사실 확인: 아직 하지 않음/)).toBeInTheDocument();
    expect(screen.getByText('금쪽이 스피커가 곁에 있다면')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /이대로 싣기 전에 확인하기/ })).toBeEnabled();
  });

  it('4. AI 초안의 세 문장을 한 장씩 넘겨 고른다', () => {
    render(<ClaimIdentifyScreen claimDecisions={{}} onSelectClaim={() => {}} onPrev={() => {}} />);
    expect(screen.getByLabelText('3장 중 1장')).toBeInTheDocument();
    expect(screen.getByText(/2024년 4월 22일/)).toBeInTheDocument();
    expect(screen.queryByText(/현재 학교숲 이용 시간은/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 문장/ }));
    expect(screen.getByText(/현재 학교숲 이용 시간은/)).toBeInTheDocument();
  });

  it('5. 자료는 봉투를 한 장씩 열고 두 개 이상을 비교에 남긴다', () => {
    render(<SourceHarness />);
    expect(screen.getByRole('button', { name: /자료를 모두 열고 두 개 이상 남겨 주세요/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /봉투 열어 보기/ }));
    fireEvent.click(screen.getByRole('button', { name: /이 자료를 비교에 포함하기/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 자료/ }));
    fireEvent.click(screen.getByRole('button', { name: /봉투 열어 보기/ }));
    fireEvent.click(screen.getByRole('button', { name: /이 자료를 비교에 포함하기/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 자료/ }));
    fireEvent.click(screen.getByRole('button', { name: /봉투 열어 보기/ }));
    expect(screen.getByText(/자료 3\/3개 열어 봄 · 비교할 자료 2개 선택/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /선택한 자료 차례로 비교하기/ })).toBeEnabled();
  });

  it('6. 선택한 근거를 한 장씩 읽고 마지막에 함께 비교한다', () => {
    render(
      <EvidenceCompareScreen
        claim={claimById.claim_hours}
        selectedSourceIds={['source_notice_current', 'source_newsletter_old']}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('heading', { name: /별빛초 시설 이용 안내/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /문장에 판정 도장 찍기/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /다음 자료/ }));
    expect(screen.getByRole('heading', { name: /학교숲 문을 열다/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /함께 비교/ }));
    expect(screen.getByText(/2026년 최신 시설 안내는 오후 6시/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /문장에 판정 도장 찍기/ })).toBeEnabled();
  });

  it('7. 판정과 이유를 한 장씩 고른 뒤 기사 문장을 실제로 고친다', () => {
    render(<ClaimDecisionHarness />);
    fireEvent.click(screen.getByRole('button', { name: /자료로 확인됨/ }));
    fireEvent.click(screen.getByRole('button', { name: /판정 이유 고르기/ }));
    fireEvent.click(screen.getByRole('button', { name: /서로 다른 학교 공식 문서/ }));
    fireEvent.click(screen.getByRole('button', { name: /근거와 대조해 문장 고치기/ }));
    expect(screen.getByText('검증해 고친 문장')).toBeInTheDocument();
    expect(screen.getByText(/학교 공식 기록에 따르면/)).toBeInTheDocument();
  });

  it('8. 학교신문 완료 화면은 AI 초안과 발행할 기사를 전후 비교한다', () => {
    render(<VerifiedCardScreen onOpenRecord={() => {}} onRestart={() => {}} onBackToActivities={() => {}} />);
    expect(screen.getByText('검증 전 · AI 초안')).toBeInTheDocument();
    expect(screen.getByText('검증 후 · 발행할 기사')).toBeInTheDocument();
    expect(screen.getByText(/자연스러운 문장보다 먼저 출처와 날짜/)).toBeInTheDocument();
  });

  it('9. 미디어 활동은 여러 카드 목록보다 첫 게시 요청으로 시작한다', () => {
    render(<MediaIntroScreen mediaDecisions={{}} onSelectCase={() => {}} onPrev={() => {}} />);
    expect(screen.getByText('새 게시 요청')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /동아리 진행자의 목소리를 본뜬 광고/ })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText(/수업을 위해 만든 가상 사례/)).toBeInTheDocument();
  });

  it('10. 보이는 단서는 한 장씩 기록하고 합성 여부를 단정하지 않는다', () => {
    render(<VisualHarness />);
    expect(screen.getByText('사건 파일의 게시 화면부터 살펴봐요')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /다음 단서/ }));
    fireEvent.click(screen.getByRole('button', { name: /음성 파형/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 단서/ }));
    fireEvent.click(screen.getByRole('button', { name: /다음 단서/ }));
    fireEvent.click(screen.getByRole('button', { name: /관찰 정리/ }));
    expect(screen.getByText(/합성인지, 사용해도 되는지는 아직 확정할 수 없어요/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /첫인상으로 결론 내리지 않고/ }));
    expect(screen.getByRole('button', { name: /출처와 제작 과정 확인하기/ })).toBeEnabled();
  });

  it('11. 출처와 제작 과정 네 장은 현재 장을 열어야 다음으로 간다', () => {
    render(<ProvenanceHarness />);
    expect(screen.getByRole('button', { name: /동의와 사용 조건 확인하기/ })).toBeDisabled();
    for (let index = 0; index < 4; index += 1) {
      fireEvent.click(screen.getByRole('button', { name: /이 정보 열어 보기/ }));
      if (index < 3) fireEvent.click(screen.getByRole('button', { name: /다음 정보/ }));
    }
    expect(screen.getByText('확인한 제작 정보 4/4개')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /동의와 사용 조건 확인하기/ })).toBeEnabled();
  });

  it('12. 동의와 권리 행동도 한 장씩 보고 마지막에 사용 판단으로 이동한다', () => {
    render(<RightsHarness />);
    fireEvent.click(screen.getByRole('button', { name: /목소리 주인에게 합성 및 게시 동의/ }));
    for (let index = 0; index < 3; index += 1) fireEvent.click(screen.getByRole('button', { name: /다음 행동/ }));
    expect(screen.getByText(/조회 수를 높이기 위해/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /이 콘텐츠의 사용 여부 결정하기/ })).toBeEnabled();
  });

  it('13. 사용 결정은 한 장씩 비교하고 필요한 조치를 결과로 남긴다', () => {
    render(
      <MediaDecisionScreen
        mediaCase={mediaCaseById.media_voice}
        selectedRightIds={['voice_consent', 'synthetic_label', 'purpose_check']}
        decisionId="not_allowed"
        onChangeDecision={() => {}}
        onSave={() => {}}
        onContinue={() => {}}
        onPrev={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /현재는 사용하지 않음/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /확인한 정보와 대조하기/ }));
    expect(screen.getByText('필요한 조치')).toBeInTheDocument();
    expect(screen.getByText(/목소리 주인의 명시적 동의 받기/)).toBeInTheDocument();
  });

  it('14. 미디어 완료 화면은 처음 게시 요청과 최종 결정을 비교한다', () => {
    render(
      <VerificationCompletionScreen
        mediaDecisions={{ media_voice: 'not_allowed' }}
        caseId="media_voice"
        onOpenRecord={() => {}}
        onExploreAnother={() => {}}
        onRestart={() => {}}
        onBackToActivities={() => {}}
      />
    );
    expect(screen.getByText('처음 게시 요청')).toBeInTheDocument();
    expect(screen.getByText('확인한 뒤의 결정')).toBeInTheDocument();
    expect(screen.getByText(/보이는 단서에서 멈추지 않고 출처·맥락·동의/)).toBeInTheDocument();
  });

  it('15. 학생 헤더에는 활동 도움말이 있고 교사·발표 도구는 없다', () => {
    render(<VerificationLabPage />);
    expect(screen.getByRole('button', { name: /현재 활동 도움말 열기/ })).toBeInTheDocument();
    expect(screen.queryByText('교사 도구')).not.toBeInTheDocument();
    expect(screen.queryByText('발표 화면')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /현재 활동 도움말 열기/ }));
    expect(screen.getByRole('dialog', { name: /무엇을 하면 되나요/ })).toBeInTheDocument();
  });

  it('16. 인쇄 기록은 팝업에서도 보이고 CSI 같은 불필요한 명칭을 사용하지 않는다', () => {
    const { container } = render(<VerificationWorksheet state={initialVerificationState} />);
    expect(container.firstChild).not.toHaveStyle('display: none');
    expect(screen.getByText('학교신문 AI 초안 검증 기록')).toBeVisible();
    expect(screen.getByText('게시 전 미디어 확인 기록')).toBeVisible();
    expect(container.textContent).not.toMatch(/CSI/);
  });
});
