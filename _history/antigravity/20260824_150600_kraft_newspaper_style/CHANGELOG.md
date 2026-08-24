# 모듈 2 자료 화면 크라프트 신문지 스타일 적용 기록

## 작업 개요
- 학생이 확인해야 하는 자료(신문 기사 초안, 출처 원문 문서, 문장 스크랩 카드 등)와 일반 질문/UI 박스의 시각적 구분을 강화하기 위해 크라프트 신문지 룩 적용.

## 변경 파일
- `src/features/verification/screens/claim/ClaimIntroScreen.jsx`: 마스트헤드 태그(`📰 기사 초안 원문`) 및 사람 확인 스탬프 구조 보강
- `src/features/verification/verification.css`:
  - `.verification-draft-paper`: 따뜻한 크라프트 베이지 `#F6EFE1`, 앤틱 테두리, 신문 마스트헤드 이중선, 붉은 검증 스탬프 뱃지 적용
  - `.verification-source-document`: 공문서/신문 서류철 크라프트 아카이브 스타일 고도화
  - `.verification-source-envelope`: 자료 봉투 및 열람 시 크라프트 서류 톤 적용
  - `.verification-claim-page`: 스크랩 페이퍼 느낌의 문장 카드 스타일
  - `.verification-sentence-rewrite`, `.verification-article-before-after`: 검증 전 AI 초안(크라프트 신문지 톤)과 검증 후 기사(신뢰 민트 톤)의 선명한 시각 대비

## 검증 결과
- Vitest 15개 파일, 99개 테스트 100% Pass
- Vite Production Build 성공 (609ms)
