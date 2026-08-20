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
import './verification.css';

export default function VerificationLabPage() {
  const { state, updateState, selectMode, resetState } = useVerificationState();
  const [isPresentation, setIsPresentation] = useState(false);

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
    if (state.mode === 'claim') return ['① 주장 찾기', '② 출처·날짜', '③ 근거 비교', '④ 판단·설명'];
    if (state.mode === 'media') return ['① 첫 단서', '② 출처·제작 이력', '③ 동의·권리', '④ 최종 판단'];
    return [];
  };

  const getStepperCurrent = () => {
    if (state.mode === 'claim') {
      if (state.claimStep <= 1) return 0;
      if (state.claimStep === 2) return 1;
      if (state.claimStep === 3) return 2;
      if (state.claimStep === 4) return 3;
      return 4;
    }
    if (state.mode === 'media') {
      if (state.mediaStep <= 1) return 0;
      if (state.mediaStep === 2) return 1;
      if (state.mediaStep === 3) return 2;
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
            claimDecisions={state.claimDecisions}
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

  return (
    <div className={`app-container verification-app ${isPresentation ? 'presentation-mode' : ''}`}>
      <AppHeader
        title="진실·미디어 검증소"
        showBackButton={state.mode !== null}
        onBackToActivities={() => selectMode(null)}
        onReset={resetState}
        onPrint={() => window.print()}
        isPresentation={isPresentation}
        setIsPresentation={setIsPresentation}
      />
      <main className="container mt-4 no-print">
        {state.mode && <ProgressStepper steps={getSteps()} currentStep={getStepperCurrent()} />}
        {!state.mode && <VerificationModeSelectScreen onSelectMode={selectMode} />}
        {state.mode === 'claim' && renderClaim()}
        {state.mode === 'media' && renderMedia()}
      </main>
      <VerificationWorksheet state={state} />
    </div>
  );
}
