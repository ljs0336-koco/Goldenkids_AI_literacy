# 변경 기록

## 작업 목적

- 자료가 단순 설명 상자가 아니라 공지문·소식지·설문·게시글처럼 보이게 한다.
- `지금 할 일`의 모호한 이름을 구체적인 단계명으로 바꾼다.
- 과거 배포본에 남은 하단 `지금 해볼 일`과 현재 로컬 상태를 구분해 기록한다.

## 변경 파일

- `src/features/verification/verificationData.js`
- `src/features/verification/verificationLearningData.js`
- `src/features/verification/components/VerificationPageCue.jsx`
- `src/features/verification/components/VerificationSourceDocument.jsx` (신규)
- `src/features/verification/screens/claim/SourceCheckScreen.jsx`
- `src/features/verification/screens/claim/EvidenceCompareScreen.jsx`
- `src/features/verification/verification.css`
- `src/features/verification/VerificationLab.integration.test.jsx`
- `docs/MODULE2_INTERACTION_PILOT_IMPLEMENTATION.md`
- `docs/MODULE2_SOURCE_DOCUMENT_AND_STEP_GUIDE_IMPLEMENTATION.md` (신규)

## 백업

이 폴더에 있는 코드 파일은 작업 직전 원본이다. 신규 컴포넌트는 작업 전 존재하지 않았으므로 백업본이 없다.

## 검증 결과

- 모듈 2: 31 tests passed
- 전체 앱: 99 tests passed
- 린트: 0 errors
- 빌드: 성공
- 데스크톱·모바일 브라우저: 정상
- 브라우저 오류 로그: 없음
