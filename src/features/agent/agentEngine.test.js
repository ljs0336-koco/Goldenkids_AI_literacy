import { describe, it, expect } from 'vitest';
import { getMissionById, getToolById, evaluateGuardrailSafety } from './agentEngine';

describe('AgentEngine Unit Tests', () => {
  it('1. 미션 ID와 도구 ID로 데이터를 올바르게 조회한다', () => {
    const mission = getMissionById('mission_invite');
    expect(mission).toBeDefined();
    expect(mission.title).toContain('학예회');

    const tool = getToolById('tool_pay');
    expect(tool).toBeDefined();
    expect(tool.riskLevel).toBe('critical');
  });

  it('2. 4대 가드레일 선택에 따른 안전 지수와 피드백을 정확히 연산한다', () => {
    // All recommended choices
    const safeChoices = {
      guard_permission: 'minimal',
      guard_budget: 'limit_10',
      guard_hitl: 'hitl_strict',
      guard_killswitch: 'kill_enabled'
    };

    const evalSafe = evaluateGuardrailSafety(safeChoices);
    expect(evalSafe.safetyScore).toBe(100);
    expect(evalSafe.isFullySafe).toBe(true);
    expect(evalSafe.safetyLevel).toBe('완벽한 안전 사령관');

    // Partial risky choices
    const riskyChoices = {
      guard_permission: 'full',
      guard_budget: 'no_limit',
      guard_hitl: 'hitl_off',
      guard_killswitch: 'kill_disabled'
    };

    const evalRisky = evaluateGuardrailSafety(riskyChoices);
    expect(evalRisky.safetyScore).toBe(0);
    expect(evalRisky.isFullySafe).toBe(false);
  });
});
