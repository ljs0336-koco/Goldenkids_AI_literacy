# 활동 추천 개편 작업 기록

- 작업 시각: 2026-08-19 16:26~16:40 KST
- 작업 주체: Codex
- 요청: 모듈 1의 기존 성장상 활동을 큰 구조 변경 없이 맞춤 활동 추천으로 개편
- 원본 보관: `original/`

## 변경 원칙

- `/fairness` 라우트, `growth` 내부 상태 키, 5개 화면 흐름과 기존 `Growth*` 파일명은 유지했다.
- 사용자에게 보이는 성장상 시나리오만 가상의 학생 `하늘`을 위한 맞춤 활동 추천으로 변경했다.
- 대표팀 구성 활동과 다른 모듈은 의도적으로 수정하지 않았다.
- 모듈 2와 겹치는 이미지 판별 활동은 추가하지 않았다.

## 주요 변경

1. 온라인 기록 3개만 사용할 때 `코딩 메이커 교실`을 처음 추천한다.
2. 누락된 오프라인 활동·학생 관심 기록 3개를 확인한다.
3. 같은 추천 규칙에 전체 기록 6개를 사용하면 `과학 탐구 교실`로 추천이 달라진다.
4. 추천 점수는 능력 점수가 아니라 기록에서 찾은 활동 관련 단서의 모의 합산값임을 명시했다.
5. AI 추천은 정답이 아니며 학생과 교사가 최종 선택하도록 체크리스트와 출구 퀴즈를 변경했다.
6. 인쇄 활동지를 활동 추천 시나리오와 데이터 비교표에 맞게 변경했다.
7. 이전 v4 성장상 진행 상태가 새 활동 중간에 복원되지 않도록 localStorage 버전을 v5로 변경했다.
8. 설치되지 않은 `eslint`를 호출하던 `npm run lint`를 설치되어 있는 `oxlint src`로 수정했다.

## 검증 결과

- 수정 전 기준: 4개 테스트 파일, 32개 테스트 통과
- 수정 후: 7개 테스트 파일, 47개 테스트 통과
- `npm run build`: 성공
- `npm run lint`: 성공. 활동 추천/공정성 변경 파일의 경고 없음
- 로컬 개발 서버: HTTP 200 응답 확인
- 브라우저 자동 화면 검수: Browser 플러그인의 Windows 신뢰 경로 오류로 실행하지 못함

## 공동 작업 주의

작업 중 다른 에이전트가 `fairnessData.js`와 `fairnessEngine.js` 뒤에 성장상 호환 블록을 추가하고 `src/features/role/` 관련 파일을 변경한 흔적을 확인했다. 이 동시 변경은 삭제하거나 덮어쓰지 않았다. 현재 린트 경고 6건은 모두 해당 `role` 영역의 기존 미사용 변수·import 경고다.

`original/`은 작업 시작 시점의 스냅샷이다. 다른 에이전트의 동시 변경까지 되돌릴 수 있으므로 전체를 일괄 복원하지 말고 파일별 비교 후 사용한다. 백업 테스트 파일은 Vitest 자동 수집을 피하기 위해 `.bak` 확장자를 붙였다. 기존 배포본은 `original/dist_before/`에 보관했다.

## 변경 파일

- `package.json`
- `src/features/fairness/fairnessData.js`
- `src/features/fairness/fairnessEngine.js`
- `src/features/fairness/FairnessLabPage.jsx`
- `src/features/fairness/useFairnessState.js`
- `src/features/fairness/screens/ModeSelectScreen.jsx`
- `src/features/fairness/screens/GrowthInitialScreen.jsx`
- `src/features/fairness/screens/GrowthTempRecScreen.jsx`
- `src/features/fairness/screens/GrowthSupplementScreen.jsx`
- `src/features/fairness/screens/GrowthDeltaScreen.jsx`
- `src/features/fairness/screens/GrowthHumanCheckScreen.jsx`
- `src/features/fairness/screens/CompletionScreen.jsx`
- `src/features/fairness/print/FairnessWorksheet.jsx`
- `src/features/fairness/fairnessEngine.test.js`
- `src/features/fairness/useFairnessState.test.js`
- `src/features/fairness/FairnessLab.integration.test.jsx`
- 생성된 `dist/`

## 검수용 ZIP

- 파일: `../검토용_압축파일/ai-literacy-lab-review-v9.zip`
- 크기: 27,397,762 bytes
- SHA-256: `79d0d8bbbf660ec5f4e8c3c55d517edd4d6e979972cfd68607e8ca0d23227341`
- `node_modules`와 `original/` 백업은 제외하고 소스, 공개 자산, 설정, `dist`, 이 변경 기록을 포함했다.
