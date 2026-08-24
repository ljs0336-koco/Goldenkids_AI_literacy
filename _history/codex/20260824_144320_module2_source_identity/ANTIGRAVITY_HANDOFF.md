# Antigravity 인계

## 이번 변경의 핵심

모듈 2 활동 A의 자료를 실제 문서형 UI로 바꾸고, 모듈 2 전체 상단 안내를 `이번 단계 + 단계명 + 한 문장 행동` 구조로 개편했다.

## 협업 시 주의

- 변경 범위는 `src/features/verification/**`이다.
- `VerificationSourceDocument.jsx`는 아직 모듈 2 전용이다. 사용자 검토 전에 공용 `src/components/**`로 옮기거나 다른 모듈에 복제하지 않는다.
- `verificationData.js`의 `excerpt`는 호환을 위해 남겨 두었다. 화면은 새 `document` 구조를 사용한다.
- 문서처럼 보이게 만들기 위해 존재하지 않는 문서 번호, 서명, URL, 통계값을 추가하지 않는다.
- 하단 `지금 해볼 일` 팝업은 현재 로컬 코드에 없다. 이전 배포 화면을 보고 다시 추가하지 않는다.
- 공용 허브, 모듈 1·3·4, 로컬스토리지 키는 수정하지 않았다.

## Antigravity가 업로드 전 확인할 것

1. Codex의 이 변경 커밋을 포함한 최신 `main`인지 확인한다.
2. `src/features/verification/components/VerificationSourceDocument.jsx`가 누락되지 않았는지 확인한다.
3. `npm test -- --run`, `npm run lint`, `npm run build`를 실행한다.
4. 배포 뒤 강력 새로고침 후 하단 `지금 해볼 일` 팝업이 없는지 확인한다.
5. 학교 공식 공지에서 `학교숲 개장일`과 `2026학년도 이용 시간`이 서로 다른 행으로 보이는지 확인한다.

## 검증 기준

- 모듈 2: 31 tests
- 전체: 99 tests
- 린트: 0 errors
- 빌드: 성공
