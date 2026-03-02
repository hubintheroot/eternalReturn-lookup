# EternalReturn Lookup

배포: [eternalreturn-lookup.pages.dev](https://eternalreturn-lookup.pages.dev/)
배포2: [eternalreturn-lookup.netlify.app](https://eternalreturn-lookup.netlify.app/)

## 프로젝트 소개

이터널 리턴 게임 정보를 제공하는 웹 애플리케이션입니다.

### 목적

게임 플레이어들이 캐릭터 정보, 스킨 일러스트, 시즌 정보, 쿠폰 등을 빠르고 쉽게 확인할 수 있도록 정보를 제공합니다.

### 주요 기능

- **랜딩 페이지**: 시즌 정보, 최신 패치노트 미리보기, 실험체/쿠폰 퀵 링크
- **캐릭터 정보**: 전체 캐릭터 목록 조회, 난이도별 정렬, 로테이션 필터링
- **캐릭터 상세**: 스킨 이미지 캐러셀 (자동 재생, 무한 루프, 모달 확대), 난이도, 기본 정보 확인
- **시즌 정보**: 현재 시즌 정보 및 종료까지 남은 시간 카운트다운 (사이드바/탑바 미니 타이머 포함)
- **패치노트**: 패치노트 목록 및 상세 정보 (캐릭터·장비별 변경 사항)
- **쿠폰 관리**: 로그인 시 쿠폰 등록/수정/삭제 기능 (CRUD)
- **인증**: 카카오 소셜 로그인 지원
- **반응형 레이아웃**: 세로(Topbar + Drawer 햄버거 메뉴) / 가로(Sidebar) 자동 전환
- **페이지 전환 애니메이션**: 사이드바 메뉴 이동 시 블라인드 전환 효과 (BlindTransition)

## 기술 스택

- **Core**: React 18.2.0, Vite 7.0.5
- **State Management**: Zustand 5.0.8
- **Routing**: React Router DOM 6.22.3
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
│   ├── RootLayout/
│   ├── landingView/
│   ├── charactersView/
│   ├── couponsView/
│   ├── patchNotesView/
│   ├── patchNoteDetailView/
│   ├── userInfo/
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
├── /                    - 랜딩 페이지 (시즌 정보 + 패치노트 미리보기 + 퀵 링크)
├── /patchNotes          - 패치노트 목록
├── /patchNotes/:id      - 패치노트 상세
├── /coupons             - 쿠폰 관리
├── /characters          - 캐릭터 목록
│   └── /*               - 캐릭터 상세 (중첩 라우팅)
├── /userInfo            - 사용자 정보
├── /test                - 개발/실험용 (NewsView)
└── *                    - 404 페이지
```

주요 특징:

- 중첩 라우팅으로 RootLayout 재사용
- Outlet을 통한 자식 라우트 렌더링
- BlindTransition으로 사이드바 경로 간 페이지 전환 애니메이션 적용
- 첫 접속 시 항상 `/`(랜딩 페이지)로 리다이렉트

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

### UI/UX 개선 및 신규 기능 (2026.02 ~ 2026.03)

#### 랜딩 페이지 도입

기존 `/` 경로가 쿠폰 페이지로 직행하던 구조를 개선, 시즌 정보·패치노트 미리보기·퀵 링크를 제공하는 랜딩 페이지로 교체했습니다.

- 시즌 카운트다운(`SeasonBox`) 메인 표시
- 최신 패치노트 2개 카드 링크
- 실험체/쿠폰 퀵 네비게이션 버튼

#### 반응형 레이아웃 재설계 (RootLayout)

| 방향            | 레이아웃                     |
| --------------- | ---------------------------- |
| 세로(portrait)  | TopBar + Drawer(햄버거 메뉴) |
| 가로(landscape) | 왼쪽 Sidebar                 |

- `SeasonMiniTimer` 컴포넌트 추가 (`variant="topbar"` / `variant="sidebar"`)
- 랜딩 페이지(`/`)에서는 미니 타이머 숨김 (SeasonBox가 직접 표시)

#### BlindTransition 페이지 전환 애니메이션

`useBlocker`를 활용해 사이드바 주요 경로(`/`, `/patchNotes`, `/coupons`, `/characters`) 이동 시 블라인드 슬라이드 전환 효과를 구현했습니다.

- POP 히스토리, 같은 섹션 내 이동 시 미트리거
- `appSession.js` 싱글톤으로 첫 접속 리다이렉트 및 블라인드 우회 플래그 관리

#### 실험체 이미지 캐러셀 (ImageCarousel + ImageModal)

캐릭터 상세 페이지의 스킨 이미지를 단순 리스트에서 인터랙티브 캐러셀로 교체했습니다.

- 3초 간격 자동 재생 (무한 루프)
- 마우스 휠 / 터치 스와이프 슬라이드
- 썸네일 클릭으로 이동
- 이미지 클릭 시 `ImageModal`로 전체 화면 확대

#### OpenGraph 메타 태그 적용

소셜 공유 시 미리보기 노출을 위해 `index.html`에 OG 태그를 추가했습니다.

#### 패치노트 상세 페이지 UI 개선

- `CharacterSection`: 캐릭터별 스킬 변경 사항 상세 표시 개선
- `EquipmentSection`: 장비 변경 사항 레이아웃 개선

#### 버그 수정

- URL 인코딩으로 인해 한글 캐릭터명 선택이 불가능하던 문제 해결

---

### 스타일과 로직 분리 (2025.12.17)

전체 프로젝트의 모든 컴포넌트에서 스타일과 로직을 체계적으로 분리하여 코드 품질을 향상시켰습니다.

#### 작업 개요

**목표**: 모든 컴포넌트에서 styled-components 정의를 별도 파일로 분리하고 일관된 패턴 적용

**결과**:

- ✅ 총 26개 컴포넌트 스타일 분리 완료
- ✅ 52개 파일 작업 (26개 styled 파일 생성 + 26개 컴포넌트 수정)
- ✅ 빌드 성공 (1.41s, 0 errors, 0 warnings)

#### 적용한 명명 규칙

```javascript
// 파일명: ComponentName.styled.js (NOT .jsx)
import * as Styled from './ComponentName.styled'

// Export: clean names without "Styled" prefix
export const Button = styled.button``

// Usage: Styled prefix appears at usage site
<Styled.Button>Click</Styled.Button>
```

#### 6단계 Stage별 작업

1. **Stage 1: 공통 스타일** (5개 파일) - mixins, animations, constants, theme, index
2. **Stage 2: shared/ui** (5개) - Button, EmptyState, Modal, NotFoundView, Toast
3. **Stage 3: coupon-management** (5개) - AddCoupon, CouponCard, DeleteCoupon, EditCoupon, CouponList
4. **Stage 4: season-display** (3개) - SeasonBox, TimerDisplay, SeasonInfo
5. **Stage 5: character features** (8개) - CharacterList, FilterBox, CharacterInfo, DifficultyBox 등
6. **Stage 6: pages** (8개) - comingsoon, userInfo, newsView, Root, charactersView, couponsView 등

#### 개선 효과

- **유지보수성**: 스타일 수정 시 별도 파일에서 작업 가능
- **가독성**: 컴포넌트 로직에 집중 가능 (파일당 평균 30-50% 코드 감소)
- **재사용성**: 공통 스타일 상수/믹스인 활용 가능
- **협업**: 스타일과 로직 담당자의 작업 분리 가능
- **일관성**: 프로젝트 전체에 동일한 패턴 적용

### 코드베이스 정리 (2025.12.16)

Claude CLI와 협업하여 체계적인 코드 품질 개선 작업 수행

#### 7단계 Cleanup 프로세스

**Stage 1: 빈 폴더 제거**

- 5개 빈 폴더 삭제 (app/store, assets/\_empty, components, entities/coupon, widgets)

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

---

## 로드맵

### 예정

### 완료

- [x] UI/UX 점진적 개선
- [x] OpenGraph 메타 태그 적용
- [x] 반응형 레이아웃 (Sidebar / TopBar+Drawer) 재설계
- [x] BlindTransition 페이지 전환 애니메이션
- [x] 랜딩 페이지 도입 (시즌 타이머 + 퀵 링크)
- [x] 이미지 캐러셀 (자동 재생, 무한 루프, 모달 확대)
- [x] 패치노트 페이지 구현
- [x] 스타일/로직 분리 리팩토링
- [x] FSD 아키텍처 적용
- [x] 코드베이스 정리
