import { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  claimDecisionOptions,
  mediaCases,
  mediaDecisionOptions,
  verificationClaims
} from './verificationData';

export const VERIFICATION_STORAGE_KEY = 'ai-literacy-lab-verification:v1';

export const initialVerificationState = {
  version: 'v1',
  mode: null,
  claimStep: 0,
  selectedClaimId: 'claim_opening',
  claimSelectedSourceIds: {},
  claimDecisions: {},
  claimReasonSelections: {},
  isClaimCompleted: false,
  mediaStep: 0,
  selectedMediaCaseId: 'media_voice',
  mediaObservations: {},
  mediaClueAcknowledged: {},
  mediaReviewedProvenance: {},
  mediaRightsSelections: {},
  mediaDecisions: {},
  isMediaCompleted: false
};

const validModes = new Set(['claim', 'media', null]);
const validClaimIds = new Set(verificationClaims.map(claim => claim.id));
const validClaimDecisions = new Set(claimDecisionOptions.map(option => option.id));
const validMediaCaseIds = new Set(mediaCases.map(item => item.id));
const validMediaDecisions = new Set(mediaDecisionOptions.map(option => option.id));

function sanitizeStringArray(value, allowedIds) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(item => typeof item === 'string' && allowedIds.has(item)))];
}

function sanitizeRecordOfArrays(value, validKeys, getAllowedIds) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const result = {};
  for (const [key, items] of Object.entries(value)) {
    if (!validKeys.has(key)) continue;
    const allowedIds = getAllowedIds(key);
    result[key] = sanitizeStringArray(items, allowedIds);
  }
  return result;
}

export function validateAndSanitizeVerificationState(rawState) {
  if (!rawState || typeof rawState !== 'object' || Array.isArray(rawState) || rawState.version !== 'v1') {
    return { ...initialVerificationState };
  }

  const result = { ...initialVerificationState };
  result.mode = validModes.has(rawState.mode) ? rawState.mode : null;
  result.claimStep = Number.isInteger(rawState.claimStep) && rawState.claimStep >= 0 && rawState.claimStep <= 5 ? rawState.claimStep : 0;
  result.selectedClaimId = validClaimIds.has(rawState.selectedClaimId) ? rawState.selectedClaimId : 'claim_opening';
  result.claimSelectedSourceIds = sanitizeRecordOfArrays(rawState.claimSelectedSourceIds, validClaimIds, claimId => {
    const claim = verificationClaims.find(item => item.id === claimId);
    return new Set(claim?.sourceOptionIds || []);
  });

  if (rawState.claimDecisions && typeof rawState.claimDecisions === 'object' && !Array.isArray(rawState.claimDecisions)) {
    result.claimDecisions = Object.fromEntries(
      Object.entries(rawState.claimDecisions).filter(([claimId, decisionId]) => validClaimIds.has(claimId) && validClaimDecisions.has(decisionId))
    );
  }

  if (rawState.claimReasonSelections && typeof rawState.claimReasonSelections === 'object' && !Array.isArray(rawState.claimReasonSelections)) {
    result.claimReasonSelections = Object.fromEntries(
      Object.entries(rawState.claimReasonSelections).filter(([claimId, reasonId]) => {
        const claim = verificationClaims.find(item => item.id === claimId);
        return claim && claim.reasonOptions.some(reason => reason.id === reasonId);
      })
    );
  }
  result.isClaimCompleted = Boolean(rawState.isClaimCompleted);

  result.mediaStep = Number.isInteger(rawState.mediaStep) && rawState.mediaStep >= 0 && rawState.mediaStep <= 5 ? rawState.mediaStep : 0;
  result.selectedMediaCaseId = validMediaCaseIds.has(rawState.selectedMediaCaseId) ? rawState.selectedMediaCaseId : 'media_voice';
  result.mediaObservations = sanitizeRecordOfArrays(rawState.mediaObservations, validMediaCaseIds, caseId => {
    const item = mediaCases.find(mediaCase => mediaCase.id === caseId);
    return new Set(item?.visibleClues.map(clue => clue.id) || []);
  });

  if (rawState.mediaClueAcknowledged && typeof rawState.mediaClueAcknowledged === 'object' && !Array.isArray(rawState.mediaClueAcknowledged)) {
    result.mediaClueAcknowledged = Object.fromEntries(
      Object.entries(rawState.mediaClueAcknowledged).filter(([caseId]) => validMediaCaseIds.has(caseId)).map(([caseId, value]) => [caseId, Boolean(value)])
    );
  }

  result.mediaReviewedProvenance = sanitizeRecordOfArrays(rawState.mediaReviewedProvenance, validMediaCaseIds, caseId => {
    const item = mediaCases.find(mediaCase => mediaCase.id === caseId);
    return new Set(item?.provenance.map(card => card.id) || []);
  });
  result.mediaRightsSelections = sanitizeRecordOfArrays(rawState.mediaRightsSelections, validMediaCaseIds, caseId => {
    const item = mediaCases.find(mediaCase => mediaCase.id === caseId);
    return new Set(item?.rightsChoices.map(choice => choice.id) || []);
  });

  if (rawState.mediaDecisions && typeof rawState.mediaDecisions === 'object' && !Array.isArray(rawState.mediaDecisions)) {
    result.mediaDecisions = Object.fromEntries(
      Object.entries(rawState.mediaDecisions).filter(([caseId, decisionId]) => validMediaCaseIds.has(caseId) && validMediaDecisions.has(decisionId))
    );
  }
  result.isMediaCompleted = Boolean(rawState.isMediaCompleted);

  return result;
}

export function useVerificationState() {
  const [storedState, setStoredState] = useLocalStorage(VERIFICATION_STORAGE_KEY, initialVerificationState);
  const state = useMemo(() => validateAndSanitizeVerificationState(storedState), [storedState]);

  const updateState = updates => {
    setStoredState(previous => validateAndSanitizeVerificationState({
      ...validateAndSanitizeVerificationState(previous),
      ...updates,
      version: 'v1'
    }));
  };

  const selectMode = mode => {
    if (mode === 'claim') updateState({ mode: 'claim', claimStep: 0 });
    else if (mode === 'media') updateState({ mode: 'media', mediaStep: 0 });
    else updateState({ mode: null });
  };

  const resetState = () => setStoredState({ ...initialVerificationState });

  return { state, updateState, selectMode, resetState };
}
