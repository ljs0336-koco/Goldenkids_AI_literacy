# 따뜻한 교과서형 디자인 정리

- 작업자: 회색여우 코덱스
- 작업 시각: 2026-08-20 16:48 KST
- 목적: 기존의 강한 다색·그라데이션·그림자 중심 표현을 줄이고, 명료하면서도 따뜻한 교육용 웹앱 톤으로 통일

## 주요 변경

- 아이보리 배경, 따뜻한 흰색 표면, 먹색 본문, 저채도 청록을 중심으로 공용 디자인 토큰 재정의
- 홈, 공용 헤더, 진행 단계, 활동지 모달을 편집 디자인에 가까운 평면 구조로 재작성
- 모듈 1·3 활동 선택 화면을 동일한 정보 위계와 카드 규칙으로 통일
- 모듈 2·4의 고채도 상태색, 두꺼운 테두리, 그라데이션, 강한 그림자를 저채도 의미색으로 조정
- 이미지 채도를 살짝 낮추고 장식용 이모지와 알약형 배지를 축소
- 장식 문자에 결합되어 있던 진행 단계 테스트를 실제 완료 상태 클래스 기준으로 보강

## 수정 파일

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/app/Home.jsx`
- `src/components/AppHeader.jsx`
- `src/components/ProgressStepper.jsx`
- `src/components/WorksheetModal.jsx`
- `src/features/fairness/screens/ModeSelectScreen.jsx`
- `src/features/fairness/FairnessLab.integration.test.jsx`
- `src/features/role/screens/RoleModeSelectScreen.jsx`
- `src/features/verification/screens/VerificationModeSelectScreen.jsx`
- `src/features/verification/verification.css`
- `src/features/agent/agent.css`

## 검증

- `npm test -- --run --reporter=dot`: 14개 파일, 81개 테스트 통과
- `npm run lint`: 통과
- `npm run build`: 통과
- `git diff --check`: 공백 오류 없음

## 알려진 제한

- 인앱 브라우저의 플러그인 신뢰 경로 오류로 자동 스크린샷 기반 시각 검수는 실행하지 못함
- 실제 기기에서의 최종 색감과 금쪽이 이미지 채도는 사용자 체험 피드백 후 한 차례 더 미세 조정 권장

## 복원

`original/` 아래에 수정 전 파일을 원래 프로젝트 경로 구조로 보관했습니다. 필요한 파일만 비교하여 되돌릴 수 있습니다.
