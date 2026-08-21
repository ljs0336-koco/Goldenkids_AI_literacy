import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import ProgressStepper from '../../components/ProgressStepper';
import { claimById, mediaCaseById } from './verificationData';
import { getClaimProgress } from './verificationEngine';
import { useVerificationState } from './useVerificationState';
import VerificationModeSelectScreen from './screens/VerificationModeSelectScreen';
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
import VerificationWorksheet from './print/VerificationWorksheet';
import WorksheetModal from '../../components/WorksheetModal';
import VerificationPageCue from './components/VerificationPageCue';
import VerificationHelpDrawer from './components/VerificationHelpDrawer';
import { verificationStepPurposes } from './verificationLearningData';
import './verification.css';

export default function VerificationLabPage() {
  const { state, updateState, selectMode } = useVerificationState();
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window === 'undefined' || !window.scrollTo) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const go = updates => {
    updateState(updates);
    scrollToTop();
  };

  const claim = claimById[state.selectedClaimId];
  const mediaCase = mediaCaseById[state.selectedMediaCaseId];

  const getSteps = () => {
    if (state.mode === 'claim') return ['① 마감 직전 초안', '② 확인할 문장', '③ 자료 비교', '④ 기사 고치기'];
    if (state.mode === 'media') return ['① 게시 요청', '② 보이는 단서', '③ 제작 정보·권리', '④ 사용 결정'];
    return [];
  };

  const getStepperCurrent = () => {
    if (state.mode === 'claim') {
      if (state.claimStep === 0) return 0;
      if (state.claimStep === 1) return 1;
      if (state.claimStep <= 3) return 2;
      if (state.claimStep === 4) return 3;
      return 4;
    }
    if (state.mode === 'media') {
      if (state.mediaStep === 0) return 0;
      if (state.mediaStep === 1) return 1;
      if (state.mediaStep <= 3) return 2;
      if (state.mediaStep === 4) return 3;
      return 4;
    }
    return 0;
  };

  const toggleArrayValue = (record, key, value) => {
    const current = record[key] || [];
    return {
      ...record,
      [key]: current.includes(value) ? current.filter(item => item !== value) : [...current, value]
    };
  };

  const renderClaim = () => {
    switch (state.claimStep) {
      case 0:
        return <ClaimIntroScreen onNext={() => go({ claimStep: 1 })} onPrev={() => selectMode(null)} />;
      case 1:
        return (
          <ClaimIdentifyScreen
            claimDecisions={state.claimDecisions}
            onSelectClaim={claimId => go({ selectedClaimId: claimId, claimStep: 2 })}
            onPrev={() => go({ claimStep: 0 })}
          />
        );
      case 2:
        return (
          <SourceCheckScreen
            claim={claim}
            selectedSourceIds={state.claimSelectedSourceIds[claim.id] || []}
            onToggleSource={sourceId => updateState({
              claimSelectedSourceIds: toggleArrayValue(state.claimSelectedSourceIds, claim.id, sourceId)
            })}
            onNext={() => go({ claimStep: 3 })}
            onPrev={() => go({ claimStep: 1 })}
          />
        );
      case 3:
        return (
          <EvidenceCompareScreen
            claim={claim}
            selectedSourceIds={state.claimSelectedSourceIds[claim.id] || []}
            onNext={() => go({ claimStep: 4 })}
            onPrev={() => go({ claimStep: 2 })}
          />
        );
      case 4:
        return (
          <ClaimDecisionScreen
            claim={claim}
            decisionId={state.claimDecisions[claim.id] || ''}
            reasonId={state.claimReasonSelections[claim.id] || ''}
            onChangeDecision={decisionId => updateState({ claimDecisions: { ...state.claimDecisions, [claim.id]: decisionId } })}
            onChangeReason={reasonId => updateState({ claimReasonSelections: { ...state.claimReasonSelections, [claim.id]: reasonId } })}
            onSave={() => updateState({ claimDecisions: { ...state.claimDecisions }, claimReasonSelections: { ...state.claimReasonSelections } })}
            onContinue={() => {
              const progress = getClaimProgress(state.claimDecisions);
              go(progress.isComplete ? { claimStep: 5, isClaimCompleted: true } : { claimStep: 1 });
            }}
            onPrev={() => go({ claimStep: 3 })}
          />
        );
      case 5:
        return (
          <VerifiedCardScreen
            onOpenRecord={() => setIsWorksheetOpen(true)}
            onRestart={() => go({
              claimStep: 0,
              selectedClaimId: 'claim_opening',
              claimSelectedSourceIds: {},
              claimDecisions: {},
              claimReasonSelections: {},
              isClaimCompleted: false
            })}
            onBackToActivities={() => selectMode(null)}
          />
        );
      default:
        return null;
    }
  };

  const renderMedia = () => {
    switch (state.mediaStep) {
      case 0:
        return (
          <MediaIntroScreen
            mediaDecisions={state.mediaDecisions}
            onSelectCase={caseId => go({ selectedMediaCaseId: caseId, mediaStep: 1 })}
            onPrev={() => selectMode(null)}
          />
        );
      case 1:
        return (
          <VisualClueScreen
            mediaCase={mediaCase}
            selectedObservationIds={state.mediaObservations[mediaCase.id] || []}
            acknowledged={Boolean(state.mediaClueAcknowledged[mediaCase.id])}
            onToggleObservation={clueId => updateState({
              mediaObservations: toggleArrayValue(state.mediaObservations, mediaCase.id, clueId)
            })}
            onToggleAcknowledged={() => updateState({
              mediaClueAcknowledged: { ...state.mediaClueAcknowledged, [mediaCase.id]: !state.mediaClueAcknowledged[mediaCase.id] }
            })}
            onNext={() => go({ mediaStep: 2 })}
            onPrev={() => go({ mediaStep: 0 })}
          />
        );
      case 2:
        return (
          <ProvenanceScreen
            mediaCase={mediaCase}
            reviewedIds={state.mediaReviewedProvenance[mediaCase.id] || []}
            onReview={cardId => {
              const current = state.mediaReviewedProvenance[mediaCase.id] || [];
              if (!current.includes(cardId)) {
                updateState({ mediaReviewedProvenance: { ...state.mediaReviewedProvenance, [mediaCase.id]: [...current, cardId] } });
              }
            }}
            onNext={() => go({ mediaStep: 3 })}
            onPrev={() => go({ mediaStep: 1 })}
          />
        );
      case 3:
        return (
          <ConsentRightsScreen
            mediaCase={mediaCase}
            selectedRightIds={state.mediaRightsSelections[mediaCase.id] || []}
            onToggleRight={rightId => updateState({
              mediaRightsSelections: toggleArrayValue(state.mediaRightsSelections, mediaCase.id, rightId)
            })}
            onNext={() => go({ mediaStep: 4 })}
            onPrev={() => go({ mediaStep: 2 })}
          />
        );
      case 4:
        return (
          <MediaDecisionScreen
            mediaCase={mediaCase}
            selectedRightIds={state.mediaRightsSelections[mediaCase.id] || []}
            decisionId={state.mediaDecisions[mediaCase.id] || ''}
            onChangeDecision={decisionId => updateState({ mediaDecisions: { ...state.mediaDecisions, [mediaCase.id]: decisionId } })}
            onSave={() => updateState({ mediaDecisions: { ...state.mediaDecisions } })}
            onContinue={() => go({ mediaStep: 5, isMediaCompleted: true })}
            onPrev={() => go({ mediaStep: 3 })}
          />
        );
      case 5:
        return (
          <VerificationCompletionScreen
            mediaDecisions={state.mediaDecisions}
            caseId={state.selectedMediaCaseId}
            onOpenRecord={() => setIsWorksheetOpen(true)}
            onExploreAnother={() => go({ mediaStep: 0 })}
            onRestart={() => go({
              mediaStep: 0,
              selectedMediaCaseId: 'media_voice',
              mediaObservations: {},
              mediaClueAcknowledged: {},
              mediaReviewedProvenance: {},
              mediaRightsSelections: {},
              mediaDecisions: {},
              isMediaCompleted: false
            })}
            onBackToActivities={() => selectMode(null)}
          />
        );
      default:
        return null;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStep = state.mode === 'claim' ? state.claimStep : state.mediaStep;
  const currentPurpose = state.mode ? verificationStepPurposes[state.mode]?.[currentStep] : null;

  return (
    <div className="app-container verification-app">
      <AppHeader
        title="진짜일까? 써도 될까?"
        showBackButton={state.mode !== null}
        onBackToActivities={() => selectMode(null)}
        studentMode
        onHelp={() => setIsHelpOpen(true)}
      />
      <main className="container mt-4 no-print">
        {state.mode && (
          <>
            <ProgressStepper steps={getSteps()} currentStep={getStepperCurrent()} />
            <VerificationPageCue purpose={currentPurpose} />
          </>
        )}
        {!state.mode && <VerificationModeSelectScreen onSelectMode={selectMode} />}
        {state.mode === 'claim' && renderClaim()}
        {state.mode === 'media' && renderMedia()}
      </main>

      <VerificationHelpDrawer isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} mode={state.mode} />

      {/* 활동지 전용 팝업 모달 */}
      <WorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        onPrint={handlePrint}
        title="확인하고 고친 나의 탐구 기록"
      >
        <VerificationWorksheet state={state} />
      </WorksheetModal>

      {/* 인쇄 시에만 출력되는 숨김 영역 */}
      <div className="print-only" style={{ display: 'none' }}>
        <VerificationWorksheet state={state} />
      </div>
    </div>
  );
}
