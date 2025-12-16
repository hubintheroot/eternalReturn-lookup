# EternalReturn Lookup

배포: [eternalreturn-lookup.pages.dev](https://eternalreturn-lookup.pages.dev/)
배포2: [eternalreturn-lookup.netlify.app](https://eternalreturn-lookup.netlify.app/)

## 프로젝트 소개

이터널 리턴 게임 정보를 제공하는 웹 애플리케이션입니다.

### 목적

게임 플레이어들이 캐릭터 정보, 스킨 일러스트, 시즌 정보, 쿠폰 등을 빠르고 쉽게 확인할 수 있도록 정보를 제공합니다.

### 주요 기능

- **캐릭터 정보**: 전체 캐릭터 목록 조회, 난이도별 정렬, 로테이션 필터링
- **캐릭터 상세**: 스킨 일러스트, 난이도, 기본 정보 확인
- **시즌 정보**: 현재 시즌 정보 및 종료까지 남은 시간 카운트다운
- **쿠폰 관리**: 로그인 시 쿠폰 등록/수정/삭제 기능 (CRUD)
- **인증**: 카카오 소셜 로그인 지원

## 기술 스택

- **Core**: React 18.2.0, Vite 7.0.5
- **State Management**: Zustand 5.0.2
- **Routing**: React Router DOM 7.1.1
- **Styling**: Styled-components 6.1.8
- **Backend**: Supabase (BaaS) - Database, Authentication
- **Language**: JavaScript (ES6+)
- **Deployment**: Cloudflare Pages

## 아키텍처

### FSD (Feature-Sliced Design)

비즈니스 로직을 기준으로 코드를 구조화하여 확장성과 유지보수성을 높였습니다.

프로젝트 구조:

```
src/
├── app/
│   ├── providers/     - 전역 Provider 설정 (AuthProvider, RouterProvider)
│   └── router/        - 라우트 구성 (React Router v6)
│
├── pages/             - 페이지 컴포넌트
│   ├── RootLayout.jsx
│   ├── charactersView.jsx
│   ├── couponsView.jsx
│   ├── rankView.jsx
│   └── ...
│
├── features/          - 기능 모듈
│   ├── character-info/        - 캐릭터 상세 정보
│   ├── character-list/        - 캐릭터 목록 및 필터링
│   ├── coupon-management/     - 쿠폰 CRUD 관리
│   └── season-display/        - 시즌 정보 및 카운트다운
│
├── entities/          - 비즈니스 엔티티 (Zustand stores)
│   ├── character/store.js
│   ├── user/store.js
│   ├── season/store.js
│   ├── sort-option/store.js
│   └── image-loaded/store.js
│
└── shared/            - 공유 리소스
    ├── api/           - Supabase 클라이언트 및 API
    ├── lib/           - 유틸리티 함수 및 AuthProvider
    └── ui/            - 재사용 가능한 UI 컴포넌트
```

계층 간 의존성 규칙:

```
app → pages → features → entities → shared
```

상위 레이어는 하위 레이어를 import 할 수 있지만, 하위 레이어는 상위 레이어를 import 할 수 없습니다.

### 상태 관리

프로젝트는 용도에 따라 3가지 상태 관리 방식을 사용합니다:

1. Zustand (전역 상태)

   - characterStore: 캐릭터 데이터
   - userInfoStore: 사용자 정보
   - seasonInfoStore: 시즌 정보
   - sortOptionStore: 정렬 및 필터 옵션
   - imageLoadedStore: 이미지 로딩 상태

2. React Context (인증)

   - AuthProvider: Supabase 인증 상태 관리 및 실시간 동기화

3. useState (지역 상태)
   - 모달 열림/닫힘, 폼 입력 값 등 컴포넌트 내부 상태

### 성능 최적화

1. **이미지 최적화**

   - webp 포맷 사용
   - CDN 도입 (cdn.jsdelivr.net)
   - 평균 로딩 시간: 0.4초

2. **스켈레톤 UI**

   - 이미지 로딩 중 스켈레톤 표시
   - Layout Shift 방지
   - imageLoadedStore를 통한 로딩 상태 관리

3. **컴포넌트 최적화**
   - React.memo로 불필요한 리렌더링 방지
   - useCallback, useMemo로 함수/값 메모이제이션
   - 조건부 렌더링으로 성능 개선

### 라우팅

React Router v7를 활용한 SPA 구현:

```
/ (RootLayout)
├── /                    - 쿠폰 페이지 (기본)
├── /characters          - 캐릭터 목록
│   └── /:name           - 캐릭터 상세 (중첩 라우팅)
├── /coupons             - 쿠폰 관리
├── /rank                - 랭크 정보
├── /news                - 새소식 (준비 중)
└── *                    - 404 페이지
```

주요 특징:

- 중첩 라우팅으로 RootLayout 재사용
- Outlet을 통한 자식 라우트 렌더링
- 끊김 없는 페이지 전환

## 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 설정

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLIC_ANON_KEY=your_supabase_anon_key
VITE_KAKAO_REST_KEY=your_kakao_rest_key
```

3. 개발 서버 실행

```bash
npm run dev
```

## 개발 히스토리

### 코드베이스 정리 (2024.12)

Claude CLI와 협업하여 체계적인 코드 품질 개선 작업 수행

#### 7단계 Cleanup 프로세스

**Stage 1: 빈 폴더 제거**
- 5개 빈 폴더 삭제 (app/store, assets/_empty, components, entities/coupon, widgets)

**Stage 2: Console 문구 정리**
- 17개 파일에서 console 문구 환경별 분기 처리
- 모든 console.log 제거
- console.error를 `import.meta.env.DEV` 블록으로 래핑하여 개발 환경에서만 실행

**Stage 3: 주석 처리 코드 제거**
- 5개 파일에서 100+ 줄의 주석 코드 제거
- VoicePlayer 준비중 코드, 미사용 스타일, 주석 처리된 JSX 등

**Stage 4: entities 폴더 구조 개선**
- `entities/{entity}/model/{entity}Store.js` → `entities/{entity}/store.js`로 단순화
- 5개 빈 model/ 폴더 제거
- 9개 파일의 import 경로 업데이트

**Stage 5: FSD 위반 수정**
- NotFoundView를 pages에서 shared/ui로 이동하여 FSD 아키텍처 준수
- 2개 파일의 import 경로 업데이트

**Stage 6: 미사용 변수 정리**
- rankView.jsx의 tiers, bar 변수 제거
- router/index.jsx의 rankInfo 변수 제거

**Stage 7: 최종 검증**
- ✅ 빌드 성공 (0 errors, 0 warnings)
- ✅ 빈 폴더: 0개
- ✅ Console 문구: 25개 (모두 DEV 환경 분기 처리됨)
- ✅ Import 경로: 모두 정상 작동

#### 개선 효과
- **코드 품질**: 주석 코드 제거, 미사용 변수 정리로 가독성 향상
- **폴더 구조**: entities 구조 단순화로 import 경로가 명확해짐
- **FSD 준수**: 아키텍처 원칙을 정확히 따르도록 개선
- **프로덕션 최적화**: 개발용 로그가 프로덕션 번들에 포함되지 않도록 환경 분기 처리
