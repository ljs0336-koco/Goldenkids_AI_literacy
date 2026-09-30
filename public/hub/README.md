# QuietCraft Edu · 에듀테크 융합탐구 프로젝트 허브 앱 (v0.1)

본 저장소는 서울대학교 사범대학 AI 융합교육 연수특강(5주차)을 위해 Google Stitch 디자인 화면을 기반으로 제작된 **단일 반응형 웹앱 프로토타입(v0.1)**입니다.

---

## 📱 프로토타입 개요

- **플랫폼 명칭**: QuietCraft Edu (에듀테크 융합탐구 프로젝트 허브 앱)
- **대상**: 2026 AI 융합교육 직무연수 5주차 특강 (팀 메모 기준 8개 팀, 24명 수강생)
- **디자인 시스템**: Google Stitch `quiet_craft/DESIGN.md` (Sage Green & Terracotta Palette)
- **구동 환경**: 데스크톱, 태블릿, 모바일(360~430px) 반응형 단일 HTML 웹앱
- **핵심 기능**:
  1. **과제/프로젝트 (`#projects`, `#team/:id`)**: 8개 팀 현황 대시보드 및 팀별 상세 과제·역할분담·기본방향·체크리스트
  2. **커리큘럼 (`#curriculum`)**: 5주차 특강 교육과정 로드맵 및 차시별 지도계획
  3. **사이드 앱 (`#apps`)**: 로보독 강화학습 시뮬레이터 플레이어 및 모둠별 맞춤형 실습 웹앱 라이브러리 (**개별 HTML 내려받기 기능 탑재**)
  4. **필기노트 (`#notes`)**: 브라우저 `localStorage` 기반 로컬 필기 메모 데모 (개인 브라우저 내 보존)

---

## 🚀 실행 방법

### 방법 1. 브라우저에서 직접 열기 (권장)
- `index.html` 파일을 더블 클릭하여 Chrome, Edge, Safari, 웨일 등의 브라우저에서 즉시 실행합니다.
- 스마트폰에서 확인하려면 파일을 스마트폰으로 전송하여 열거나, 로컬 웹서버를 이용합니다.

### 방법 2. 로컬 웹서버 구동
터미널에서 아래 명령을 실행한 후 브라우저에서 접속합니다:
```bash
python -m http.server 8000
# 브라우저에서 http://localhost:8000/04_허브앱/앱/index.html 접속
```

---

## 🌐 네트워크 및 CDN 의존성 안내

본 프로토타입은 가볍고 즉각적인 구동을 위해 다음 공식 CDN 라이브러리를 참조합니다:
1. **Google Fonts & Pretendard**:
   - `Plus Jakarta Sans`, `JetBrains Mono` (`fonts.googleapis.com`)
   - `Pretendard Variable` (`cdn.jsdelivr.net`)
2. **Google Material Symbols**:
   - `Material Symbols Outlined` (`fonts.googleapis.com`)
3. **Tailwind CSS Engine**:
   - Tailwind Play CDN (`cdn.tailwindcss.com?plugins=forms,container-queries`)

> 💡 **오프라인 동작 지원 안내**:  
> 인터넷 연결이 불안정한 환경에서도 시스템 기본 글꼴(`Apple SD Gothic Neo`, `맑은 고딕`, `sans-serif`)로 안전하게 렌더링되도록 폴백 스타일이 적용되어 있습니다.

---

## 📂 폴더 구조

```text
04_허브앱/앱/
  ├── index.html                       # 단일 SPA 반응형 웹앱 프로토타입
  ├── README.md                        # 본 안내 문서
  ├── 인계.md                          # 허브 앱 인계서 (작업자: 마루)
  ├── data/
  │   └── teams_data.js                # 팀 메모의 8팀 24명 이름과 역할을 반영한 데이터
  ├── apps/
  │   └── robotdog_rl/
  │       ├── index.html               # 4족보행 로보독 강화학습 시뮬레이터 (단일 파일)
  │       └── 인계.md                  # 로보독 앱 검수 인계서
  └── screenshots/
      └── 전후비교/                    # 원본 Stitch 시안 vs 실제 구현 화면 (PPT 21·22장용)
          ├── 구현_01_대시보드.png ~ 구현_05_필기노트.png
          └── 전후비교_01_대시보드.png ~ 전후비교_05_필기노트.png
```

---

## 📌 사실 확인 및 정직성 원칙 (가짜 데이터 제거 완료)

- **인원 정합성**: 팀 메모의 8팀 24명 이름과 역할을 충실히 반영했습니다.
- **수평적 협업 존중**: 특정 1인을 임의로 '(조장)'으로 지정하지 않고 모든 팀원을 동등하게 표기했습니다.
- **가짜 수치 배제**: 실습 전 임의로 기재되었던 가짜 진행률(%) 수치를 제거하고, '9/30 제출 후 반영'으로 표기하여 혼선을 방지했습니다.
- **신뢰성 있는 링크**: 동작하지 않는 가짜 구글 드라이브나 노션 링크를 제거하고 공식 공동 작업 패들렛 단일 링크로 안내합니다.
- **사이드 앱 내려받기(Download)**: 실습생이 웹앱을 브라우저에서 체험할 뿐만 아니라 소스 HTML 파일을 로컬에 바로 다운로드하여 오프라인에서 편집·개작할 수 있도록 지원합니다.
