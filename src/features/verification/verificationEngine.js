import {
  claimById,
  claimDecisionOptions,
  evidenceSources,
  mediaCaseById,
  mediaDecisionOptions,
  sourceById,
  verificationClaims
} from './verificationData';

export function getClaimDecisionOption(decisionId) {
  return claimDecisionOptions.find(option => option.id === decisionId) || null;
}

export function evaluateClaimDecision(claimId, decisionId, reasonId) {
  const claim = claimById[claimId];
  if (!claim) return null;

  const selectedReason = claim.reasonOptions.find(reason => reason.id === reasonId) || null;
  return {
    claimId,
    decisionId,
    expectedDecision: claim.expectedDecision,
    isEvidenceAligned: decisionId === claim.expectedDecision && Boolean(selectedReason?.isBest),
    selectedReason,
    expectedOption: getClaimDecisionOption(claim.expectedDecision),
    evidenceSummary: claim.evidenceSummary,
    verifiedText: claim.verifiedText
  };
}

export function getSourceComparison(sourceIds = []) {
  return sourceIds
    .map(sourceId => sourceById[sourceId])
    .filter(Boolean)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getClaimProgress(claimDecisions = {}) {
  const completedCount = verificationClaims.filter(claim => Boolean(claimDecisions[claim.id])).length;
  return {
    completedCount,
    totalCount: verificationClaims.length,
    isComplete: completedCount === verificationClaims.length
  };
}

export function getSourceQualitySummary(sourceIds = []) {
  const selected = getSourceComparison(sourceIds);
  const levels = selected.map(source => source.trustLevel);
  return {
    selected,
    hasCurrentOfficialSource: selected.some(source => source.id === 'source_notice_current'),
    hasLowContextSource: levels.includes('low'),
    hasMultipleSourceTypes: new Set(selected.map(source => source.type)).size > 1
  };
}

export function evaluateMediaDecision(caseId, decisionId, selectedRightIds = []) {
  const mediaCase = mediaCaseById[caseId];
  if (!mediaCase) return null;

  const requiredIds = mediaCase.rightsChoices.filter(choice => choice.required).map(choice => choice.id);
  const harmfulIds = mediaCase.rightsChoices.filter(choice => !choice.required).map(choice => choice.id);
  const selectedRequiredCount = requiredIds.filter(id => selectedRightIds.includes(id)).length;
  const hasAllRequiredActions = selectedRequiredCount === requiredIds.length;
  const selectedHarmfulChoice = harmfulIds.some(id => selectedRightIds.includes(id));

  return {
    caseId,
    decisionId,
    expectedDecision: mediaCase.expectedDecision,
    isEvidenceAligned: decisionId === mediaCase.expectedDecision && hasAllRequiredActions && !selectedHarmfulChoice,
    selectedRequiredCount,
    requiredCount: requiredIds.length,
    hasAllRequiredActions,
    selectedHarmfulChoice,
    expectedOption: mediaDecisionOptions.find(option => option.id === mediaCase.expectedDecision) || null,
    decisionReason: mediaCase.decisionReason,
    repairSteps: mediaCase.repairSteps
  };
}

export function getMediaProgress(mediaDecisions = {}) {
  const completedIds = Object.keys(mediaDecisions).filter(caseId => Boolean(mediaCaseById[caseId]));
  return {
    completedIds,
    completedCount: completedIds.length,
    totalCount: Object.keys(mediaCaseById).length,
    hasCompletedCase: completedIds.length > 0
  };
}

export function getEvidenceSourceIds() {
  return evidenceSources.map(source => source.id);
}
