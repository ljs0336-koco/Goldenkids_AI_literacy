import { describe, it, expect } from 'vitest';
import {
  calculateActivityScores,
  getTopActivityRecommendation,
  rankActivityRecommendations,
  calculateTeamCandidateScore,
  evaluateTeamCandidates,
  evaluateTeamRoleBalance,
  getRecommendationDiff
} from './fairnessEngine';
import {
  activityRecommendationInitialRecords,
  activityRecommendationOptions,
  activityRecommendationSupplementRecords,
  projectTeamCandidates,
  projectTeamPresets
} from './fairnessData';

describe('FairnessEngine Unit Tests', () => {
  // ==========================================
  // 1. AI 금쪽이 활동 추천 엔진 테스트
  // ==========================================
  describe('Activity Recommendation Engine', () => {
    it('1. 온라인 기록의 활동별 관심 단서 점수를 정확하게 합산한다', () => {
      const scores = calculateActivityScores(
        activityRecommendationInitialRecords,
        activityRecommendationOptions
      );

      expect(scores.find(item => item.key === 'coding')?.score).toBe(9);
      expect(scores.find(item => item.key === 'science')?.score).toBe(4);
      expect(scores.find(item => item.key === 'story')?.score).toBe(1);
      expect(scores.find(item => item.key === 'collaboration')?.score).toBe(1);
    });

    it('2. 온라인 기록만 보면 코딩 메이커 교실을 첫 활동으로 추천한다', () => {
      const recommendation = getTopActivityRecommendation(
        activityRecommendationInitialRecords,
        activityRecommendationOptions
      );

      expect(recommendation.key).toBe('coding');
      expect(recommendation.score).toBe(9);
    });

    it('3. 빠졌던 기록을 추가하면 과학 탐구 교실로 추천이 달라진다', () => {
      const allRecords = [
        ...activityRecommendationInitialRecords,
        ...activityRecommendationSupplementRecords
      ];
      const recommendation = getTopActivityRecommendation(allRecords, activityRecommendationOptions);

      expect(recommendation.key).toBe('science');
      expect(recommendation.score).toBe(16);
    });

    it('4. 활동 순위를 점수 내림차순으로 정렬하고 입력 데이터는 변경하지 않는다', () => {
      const originalRecords = structuredClone(activityRecommendationInitialRecords);
      const ranking = rankActivityRecommendations(
        activityRecommendationInitialRecords,
        activityRecommendationOptions
      );

      expect(ranking.map(item => item.key)).toEqual(['coding', 'science', 'story', 'collaboration']);
      expect(activityRecommendationInitialRecords).toEqual(originalRecords);
    });
  });

  // ==========================================
  // 2. 프로젝트 대표팀 구성 엔진 테스트
  // ==========================================
  describe('Project Team Engine', () => {
    it('5. 지원자의 가중치 총점을 올바르게 계산한다', () => {
      const narae = projectTeamCandidates.find(c => c.id === 'narae');
      // narae: prob 75, dig 95, col 55, pres 85, prevCount 2 (oppScore = 60)
      // preset1: prob 30, dig 35, col 20, pres 15, opp 0
      // score: (75*30 + 95*35 + 55*20 + 85*15 + 60*0) / 1000 = (2250 + 3325 + 1100 + 1275) / 1000 = 79.5
      const score = calculateTeamCandidateScore(narae, projectTeamPresets[0].weights);
      expect(score).toBe(79.5);
    });

    it('6. 기준에 따라 대표팀 4명을 선발한다', () => {
      const team = evaluateTeamCandidates(projectTeamCandidates, projectTeamPresets[0].weights);
      expect(team).toHaveLength(4);
      const teamIds = team.map(c => c.id);
      expect(teamIds).toContain('narae');
      expect(teamIds).toContain('maru');
    });

    it('7. 팀의 4대 역할 균형(80점 이상 강점 보유 여부)을 판별한다', () => {
      // 4명이 모든 역할을 커버하는 경우
      const balancedTeam = [
        { id: '1', problemDiscovery: 85, digitalMaking: 60, communicationCollaboration: 70, presentation: 70 },
        { id: '2', problemDiscovery: 70, digitalMaking: 90, communicationCollaboration: 70, presentation: 70 },
        { id: '3', problemDiscovery: 70, digitalMaking: 60, communicationCollaboration: 95, presentation: 70 },
        { id: '4', problemDiscovery: 70, digitalMaking: 60, communicationCollaboration: 70, presentation: 88 }
      ];
      const balanceRes = evaluateTeamRoleBalance(balancedTeam);
      expect(balanceRes.isBalanced).toBe(true);
      expect(balanceRes.problemDiscovery).toBe(true);
      expect(balanceRes.digitalMaking).toBe(true);
      expect(balanceRes.communicationCollaboration).toBe(true);
      expect(balanceRes.presentation).toBe(true);

      // 발표 역할이 80점 미만으로 결여된 경우
      const unbalancedTeam = [
        { id: '1', problemDiscovery: 85, digitalMaking: 90, communicationCollaboration: 85, presentation: 70 },
        { id: '2', problemDiscovery: 80, digitalMaking: 85, communicationCollaboration: 80, presentation: 65 }
      ];
      const unbalRes = evaluateTeamRoleBalance(unbalancedTeam);
      expect(unbalRes.isBalanced).toBe(false);
      expect(unbalRes.presentation).toBe(false);
    });

    it('8. 대표팀 구성 변화(유지, 새로 추가, 제외)를 정확하게 계산한다', () => {
      const oldTeam = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
      const newTeam = [{ id: 'a' }, { id: 'b' }, { id: 'e' }, { id: 'f' }];

      const diff = getRecommendationDiff(oldTeam, newTeam);
      expect(diff.maintainedIds).toEqual(['a', 'b']);
      expect(diff.newlyAddedIds).toEqual(['e', 'f']);
      expect(diff.excludedIds).toEqual(['c', 'd']);
    });
  });
});
