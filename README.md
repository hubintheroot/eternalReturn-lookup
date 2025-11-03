# EternalReturn Lookup

배포: [eternalreturn-lookup.pages.dev](https://eternalreturn-lookup.pages.dev/)

## 프로젝트 소개

이터널 리턴 게임 정보를 제공하는 웹 애플리케이션입니다. 캐릭터 정보, 스킨 일러스트, 시즌 정보, 쿠폰 등을 빠르고 쉽게 확인할 수 있습니다.

주요 기능:
- 스킨 및 캐릭터 정보 조회
- 시즌 정보 및 카운트다운
- 쿠폰 정보 관리 (회원 전용)
- 로그인 없이 모든 정보 조회 가능

## 기술 스택

- Core: React, Vite
- State Management: Zustand
- Routing: React Router DOM
- Styling: Styled-components
- Backend: Supabase (BaaS)
- Language: JavaScript (ES6+)

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
│   ├── character/model/characterStore.js
│   ├── user/model/userInfoStore.js
│   ├── season/model/seasonInfoStore.js
│   ├── sort-option/model/sortOptionStore.js
│   └── image-loaded/model/imageLoadedStore.js
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

1. 이미지 최적화
   - webp 포맷 변환
   - CDN 도입
   - 평균 로딩 시간: 0.4초

2. 스켈레톤 UI
   - 컴포넌트 단위 로딩 표시
   - Layout Shift 방지
   - 로딩 상태의 시각적 피드백

3. 컴포넌트 메모이제이션
   - React.memo 활용
   - 불필요한 리렌더링 방지

### 라우팅

React Router를 활용한 SPA 구현:
- 중첩 라우팅으로 레이아웃 재사용
- 끊김 없는 페이지 전환
- 빠른 사용자 경험

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
