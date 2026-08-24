# 모듈 4 교육·팩트 검토 메모

이 문서는 Antigravity 프로토타입을 Codex가 통합 검토한 기준을 다음 작업자와 공유하기 위한 기록입니다.

## 표현 기준

1. AI 에이전트는 ‘스스로 모든 것을 판단하는 AI’로 단정하지 않습니다. 목표, 모델, 도구, 지시와 권한 범위 안에서 여러 단계의 작업을 수행하는 시스템으로 설명합니다.
2. ReAct의 교육적 구조는 계획·행동·관찰의 연결을 이해하는 데 사용하되, 학생 화면이 모델의 숨겨진 사고 과정을 실제로 공개한다고 설명하지 않습니다. 화면 명칭은 ‘계획 요약’, ‘도구 요청’, ‘관찰 결과’로 통일합니다.
3. HITL(Human-in-the-Loop)은 사람의 승인 버튼 하나를 뜻하지 않습니다. 실행 정보가 충분히 보이고, 사람이 승인·보류할 수 있으며, 실행 뒤 결과를 다시 확인할 수 있어야 합니다.
4. 최소 권한, 원본 보호, 위험 기반 인간 확인, 중단·복구를 겹쳐 사용합니다. 학생 화면에서는 안전을 점수나 백분율로 계산하지 않습니다.
5. 킬스위치는 새 실행을 막을 수 있지만 이미 발송된 메일, 처리된 결제, 현실 공간의 변화까지 자동으로 되돌리지는 않습니다. 권한 회수, 결과 확인, 알림, 로그 보존과 복구를 이어갑니다.

## 참고한 1차·공식 자료

- ReAct 논문: https://arxiv.org/abs/2210.03629
- OpenAI, A practical guide to building agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- OWASP, Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

## 다음 수정 시 지킬 회귀 조건

- 학생 화면과 활동지에 차시 번호를 노출하지 않습니다.
- 도구 권한과 승인 체크리스트는 미션 데이터에서 함께 관리합니다.
- 새 가드레일 옵션은 `useAgentState.js`의 화이트리스트 검증에도 반영합니다.
- 중단 성공 문구에 근거 없는 초 단위 시간이나 ‘완전 차단’, ‘완벽히 안전’을 넣지 않습니다.
- HITL을 사람에게 책임을 넘기는 장치나 모든 위험을 없애는 장치로 표현하지 않습니다.
- 공용 허브 수정은 통합 담당자가 전체 테스트와 빌드를 확인한 뒤 반영합니다.
