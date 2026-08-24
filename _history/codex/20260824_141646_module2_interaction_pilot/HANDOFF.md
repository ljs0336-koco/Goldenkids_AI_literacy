# 모듈 2 상호작용 시범 구현 인계

## 백업

이 폴더의 기존 파일들은 구현 직전 원본이다.

복원 시 전체 폴더를 덮어쓰지 말고 필요한 파일만 현재 `src/features/verification/`의 같은 상대 경로와 비교한다.

## 현재 구현 범위

- 모듈 2 활동 A에 역할·상태 라벨 추가
- 자료·문장·비교 장면의 짧은 전환 추가
- 선택 결과의 인라인 표시 강화
- 완료 시 `함께 완성 / 사람 확인 완료` 활성화
- 실제 챗봇 미연결 상태를 `가상 체험`으로 명시
- 모듈 2의 중복 하단 안내 팝업 제거

## 건드리지 않은 영역

- `src/features/fairness/**`
- `src/features/role/**`
- `src/features/agent/**`
- `src/components/**`
- 모듈 2 활동 B의 콘텐츠·라벨·전환 구조
- 실제 챗봇 API·링크
- 로컬스토리지 키와 저장 형식

## 새 파일

- `src/features/verification/components/VerificationWorkLabels.jsx`
- `src/features/verification/components/VerificationExperienceStage.jsx`
- `docs/MODULE2_INTERACTION_PILOT_IMPLEMENTATION.md`

## 협업 주의

Antigravity가 병행 작업할 경우 활동 A 검토가 끝나기 전에는 위 두 새 컴포넌트를 공용 폴더로 옮기거나 활동 B·다른 모듈에 복제하지 않는다.

모듈 2의 `VerificationChoiceFork.jsx`와 `VerificationPageNav.jsx`에서는 의도적으로 하단 안내 이벤트를 제거했다. 다시 추가하면 상단 `지금 할 일`과 중복된다.

## 검증

- 모듈 2 전용: 31 tests passed
- 전체 앱: 99 tests passed
- 린트: 0 errors
- 빌드: 성공
- 데스크톱·390px 모바일 브라우저 확인 완료
