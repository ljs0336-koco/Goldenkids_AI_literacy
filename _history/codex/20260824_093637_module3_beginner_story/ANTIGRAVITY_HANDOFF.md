# Antigravity 인계 메모

## 변경 영역

- Codex가 크게 수정한 전담 영역: `src/features/role/**`
- Codex가 연동을 위해 수정한 공용 파일:
  - `src/app/Home.jsx`
  - `src/utils/learningProgress.js`
- 수정하지 않은 영역:
  - `src/features/fairness/**`
  - `src/features/verification/**`
  - `src/features/agent/**`
  - 패키지 설정과 라우트

## 통합 시 지켜야 할 점

1. 모듈 3의 현재 저장 키는 `ai-literacy-lab-role:v3`이다. v2 상태를 다시 가져오지 않는다.
2. `src/features/role/role.css`는 모듈 전용 스타일이며 전역 CSS로 옮기거나 삭제하지 않는다.
3. `RoleLabPage.jsx`는 학생용 헤더, 도움말, 단계 안내 토스트를 마운트한다. 기존 교사 도구·발표 모드 코드를 되살리지 않는다.
4. `RoleChoiceFork`의 A/B 중심과 작은 C안 구조를 유지한다.
5. 화면 결과 영역은 선택 전에도 빈 자리를 확보한다. 조건부 렌더링만으로 되돌리면 화면이 다시 흔들린다.
6. 자동화와 AI를 같은 말로 쓰지 않는다. 명단 정리는 규칙 자동화 예시다.
7. 활동 A는 한 상황만 마쳐도 완료다. 3개 이상 수행 조건을 되살리지 않는다.
8. 활동 B는 하나의 학교 축제 안 네 가지 과업이다. 12개 무관한 직업 목록으로 되돌리지 않는다.

## 확인 명령

- 모듈 3: `npx vitest run src/features/role/`
- 전체: `npx vitest run`
- 정적 검사: `npx oxlint src`
- 빌드: `npm run build`

현재 확인 결과는 모듈 3 14개, 전체 96개 테스트 통과이며 린트와 빌드도 성공했다.

