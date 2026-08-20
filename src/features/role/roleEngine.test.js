import { describe, it, expect } from 'vitest';
import { getPersonaMatchAnalysis, calculateTaskDistribution, evaluateTaskClassifications } from './roleEngine';
import { roleScenarios, workTasks } from './roleData';

describe('RoleEngine Unit Tests', () => {
  describe('Persona Matching Engine', () => {
    it('1. 시나리오의 주 추천 역할, 보조 역할, 활용 가이드를 올바르게 분석한다', () => {
      const sc01 = roleScenarios.find(s => s.id === 'sc_01'); // primary: friend, secondary: coach
      
      // 주 추천 선택 시
      const primaryRes = getPersonaMatchAnalysis(sc01, 'friend');
      expect(primaryRes.fitLevel).toBe('primary');
      expect(primaryRes.isPrimary).toBe(true);
      expect(primaryRes.primaryPersona.id).toBe('friend');
      expect(primaryRes.secondaryPersona.id).toBe('coach');
      expect(primaryRes.cautionNotice).toContain('진짜 사람 친구나 전문 상담사를 대신할 수 없어요');

      // 보조 역할 선택 시
      const secondaryRes = getPersonaMatchAnalysis(sc01, 'coach');
      expect(secondaryRes.fitLevel).toBe('secondary');
      expect(secondaryRes.isSecondary).toBe(true);

      // 보완적 관점 선택 시
      const compRes = getPersonaMatchAnalysis(sc01, 'critic');
      expect(compRes.fitLevel).toBe('complementary');
      expect(compRes.isPrimary).toBe(false);
      expect(compRes.isSecondary).toBe(false);
    });
  });

  describe('Task Distribution Engine', () => {
    it('2. 12개 업무의 3구역 분류 분포를 올바르게 집계한다', () => {
      const sampleClassifications = {
        task_01: 'ai_auto',
        task_02: 'human_lead',
        task_03: 'collaboration',
        task_04: 'ai_auto'
      };

      const dist = calculateTaskDistribution(sampleClassifications);

      expect(dist.counts.ai_auto).toBe(2);
      expect(dist.counts.collaboration).toBe(1);
      expect(dist.counts.human_lead).toBe(1);
      expect(dist.counts.unclassified).toBe(8);
      expect(dist.classifiedCount).toBe(4);
      expect(dist.total).toBe(12);
      expect(dist.isAllClassified).toBe(false);
    });

    it('3. 12개 업무 전체 분류 시 isAllClassified가 true가 된다', () => {
      const allClassified = {};
      workTasks.forEach(t => {
        allClassified[t.id] = t.recommendedZone;
      });

      const dist = calculateTaskDistribution(allClassified);
      expect(dist.isAllClassified).toBe(true);
      expect(dist.counts.unclassified).toBe(0);
      expect(dist.classifiedCount).toBe(12);
    });

    it('4. 추천 분류와의 부합 여부 및 개별 사유를 정확하게 평가한다', () => {
      const allRecommended = {};
      workTasks.forEach(t => {
        allRecommended[t.id] = t.recommendedZone;
      });

      const evalRes = evaluateTaskClassifications(allRecommended);
      expect(evalRes.alignedCount).toBe(12);
      expect(evalRes.items).toHaveLength(12);
      expect(evalRes.items[0].isAligned).toBe(true);
      expect(evalRes.items[0].rationale).toBeDefined();
    });
  });
});
