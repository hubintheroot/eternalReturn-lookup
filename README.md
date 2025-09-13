# EternalReturn Lookup: A User-Centric Web Application Case Study

- **배포 페이지:** [eternalreturn-lookup.pages.dev](https://eternalreturn-lookup.pages.dev/)
- **대체 링크:** [eternalreturn-lookup.netlify.app](https://eternalreturn-lookup.netlify.app/)

## 1. 프로젝트 소개: ‘왜’ 만들었는가?

EternalReturn Lookup 프로젝트는 평소 즐기던 게임 '이터널 리턴'의 정보를 쉽게 확인하고 싶다는 생각에서 출발했습니다.
캐릭터의 배경 정보, 스킨 일러스트, 랭크 시즌 정보, 인게임에서 사용 가능한 쿠폰 등 게임과 관련된 유용한 정보를 빠르고 쉽게 확인할 수 있습니다.

이터널 리턴 게임 정보를 제공하는 웹사이트입니다. 하지만 이 프로젝트의 본질은 단순히 정보를 보여주는 것을 넘어, **“어떻게 하면 사용자에게 더 나은 경험을 제공할 수 있을까?”** 라는 질문에 대한 깊은 고민과 기술적 해결 과정을 담았습니다.

사용자의 입장에서 불편한 점을 찾고, 이를 해결하기 위해 최적의 아키텍처를 설계하며 겪었던 문제 해결 경험을 중심으로 프로젝트를 소개합니다. 이 문서는 결과물인 동시에, 개발자로서의 성장 기록입니다.

**주요 기능:**

- **스킨 및 캐릭터 정보 조회:** 다양한 캐릭터와 스킨 이미지를 찾아볼 수 있습니다.
- **시즌 정보:** 현재 진행중인 시즌 기간을 제공합니다.
- **쿠폰 정보:** 사용 가능한 쿠폰 목록을 확인하고, 코드를 복사하여 게임 내에서 사용할 수 있습니다.
- **신뢰성 있는 쿠폰 관리:** 사용자가 직접 쿠폰을 등록하고 수정할 수 있습니다. 쿠폰 정보의 신뢰도를 높이기 위해, 쿠폰 등록 및 수정 기능은 회원가입을 한 사용자에게만 제공됩니다.

로그인하지 않은 사용자도 모든 정보(스킨, 시즌, 쿠폰)를 자유롭게 조회할 수 있습니다.

## 2. 기술 스택 (Tech Stack)

- **Core:** React, Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Styling:** Styled-components
- **Backend (BaaS):** Supabase
- **Language:** JavaScript (ES6+)

## 3. 아키텍처: ‘어떻게’ 만들었는가?

사용자 경험(UX)과 개발 경험(DX)을 모두 향상시키기 위해 다음과 같은 아키텍처를 설계하고 적용했습니다.

### 3.1. 상태 관리: “데이터 흐름을 예측 가능하게”

#### 문제 정의

프로젝트 초기, 여러 컴포넌트가 로그인 상태, 정렬 옵션 등 공통 데이터를 사용하게 되면서 `props drilling` 문제가 발생했습니다. 이는 코드의 복잡성을 높이고 데이터 흐름 추적을 어렵게 만들어 유지보수를 저해하는 요인이었습니다.

#### 해결 방안: Redux Toolkit을 활용한 중앙 집중식 상태 관리

전역 상태와 지역 상태의 역할을 명확히 분리하는 전략을 채택했습니다.

1.  **전역 상태 (Global State):** `Redux Toolkit`을 사용하여 애플리케이션 전반에서 필요한 데이터(사용자 정보, API로 받은 캐릭터 데이터 등)를 관리합니다. `createSlice`를 통해 상태, 리듀서, 액션을 모듈화하여 기능별로 응집도를 높였습니다.

    _기술 명세: Store 설정 (`src/common/utils/store.js`)_

    ```javascript
    import { configureStore } from '@reduxjs/toolkit';
    import characterDataReducer from '../../features/character/characterInfoSlice';
    import sortOptionSliceReducer from '../../features/sortOption/sortOptionSlice';
    import imageLoadedSlice from '../../features/imageLoaded/imageLoadedSlice';
    import seasonInfoSlice from '../../features/season/seasonInfoSlice';
    import userInfoSlice from '../../features/login/userInfoSlice';

    export default configureStore({
      reducer: {
        characterData: characterDataReducer,
        sortOption: sortOptionSliceReducer,
        imageLoaded: imageLoadedSlice,
        seasonInfo: seasonInfoSlice,
        userInfo: userInfoSlice,
      },
    });
    ```

2.  **지역 상태 (Local State):** 단일 컴포넌트 내에서만 유효한 UI 상태(모달의 열림/닫힘, 폼 입력 값 등)는 `useState`를 사용합니다. 이는 전역 스토어를 불필요한 상태로부터 보호하고, 컴포넌트의 독립성과 재사용성을 확보하는 결정이었습니다.

#### 기대 효과

- **개발자 경험:** 데이터 흐름이 단방향으로 예측 가능해져 디버깅이 용이해지고, 기능 추가 및 수정 시 영향을 받는 범위를 명확히 파악할 수 있습니다.
- **사용자 경험:** 앱의 어느 곳에서든 로그인 상태나 정렬 순서가 일관되게 유지되어 안정적인 사용 경험을 제공합니다.

### 3.2. 렌더링 최적화: “체감 성능을 향상시켜라”

#### 문제 정의

캐릭터 목록 페이지 진입 시, 수십 개의 고화질 이미지를 불러오는 과정에서 사용자가 긴 시간 동안 빈 화면을 봐야 하는 `UX` 저하 문제가 발생했습니다.

#### 해결 방안: 다각적 성능 최적화

실제 성능과 체감 성능을 모두 개선하기 위해 다음 두 가지를 적용했습니다.

1.  **이미지 최적화:** `webp` 포맷 변환 및 CDN 도입으로 이미지 파일의 크기를 줄이고 전송 속도를 개선하여 **평균 0.4초대**의 로딩 시간을 달성했습니다.
2.  **컴포넌트 단위 스켈레톤 UI:** 개별 `CharacterCard` 컴포넌트 내부에 스켈레톤 UI를 구현했습니다. Redux 스토어의 로딩 상태(`charListLoaded`)를 각 카드가 구독하여, 로딩 중일 때는 스켈레톤 UI를, 로딩이 완료되면 실제 콘텐츠를 보여주는 방식으로 매끄러운 전환을 구현했습니다.

    _기술 명세: 스켈레톤 UI 구현 (`src/features/character/components/CharacterCard.jsx`)_

    ```jsx
    // 1. Redux의 로딩 상태 구독
    const loading = useSelector((state) => state.imageLoaded.charListLoaded);
    // ...
    return (
      <Card>
        {/* 2. 로딩 상태에 따라 스켈레톤 UI를 조건부 렌더링 */}
        <SkelStyledLink style={{ display: loading ? 'block' : 'none' }}>
          <Figure>
            <SkelImgBox />
            <SkelFigcaption />
          </Figure>
        </SkelStyledLink>

        {/* 실제 콘텐츠: 로딩 완료 후 표시 */}
        <StyledLink style={{ display: loading ? 'none' : 'block' }}>
          {/* ... 실제 카드 콘텐츠 ... */}
        </StyledLink>
      </Card>
    );

    // 3. styled-components와 keyframes를 이용한 애니메이션
    const pulseKeyFrame = keyframes`
        0% { opacity: .5; }
        50% { opacity: .3; }
        100% { opacity: .5; }
    `;
    const SkelStyledLink = styled(StyledLink)`
      animation: ${pulseKeyFrame} 1.5s ease-in-out infinite;
    `;
    const SkelImgBox = styled(ImgBox)`
      background-color: lightgrey;
    `;
    ```

#### 기대 효과

- **사용자 경험:** 전체 페이지가 아닌, 각 카드 단위로 로딩 상태가 표시되어 사용자에게 더 정교한 피드백을 제공합니다. 또한, 로딩 중에도 페이지 전체 레이아웃이 유지되어 콘텐츠가 갑자기 나타나면서 화면이 밀리는 현상(Layout Shift)을 방지하고 시각적 안정성을 높입니다.

### 3.3. 라우팅: “끊김 없는 네비게이션”

#### 문제 정의

전통적인 방식의 페이지 이동은 매번 전체 페이지를 새로고침하여 사용자의 흐름을 끊고 서버에 불필요한 부담을 줍니다.

#### 해결 방안: React Router를 이용한 SPA 구현

`React Router`를 도입하여 **SPA(Single Page Application)** 로 구현했습니다. `<Outlet>`을 활용한 중첩 라우팅 구조를 설계하여 공통 레이아웃(헤더, 네비게이션 등)의 재사용성을 극대화했습니다.

_기술 명세: 중첩 라우트 구조 (`src/common/router/router.jsx`)_

```javascript
import Root from '../../pages/Root';
import CouponsView from '../../features/coupon/pages/couponsView';
import CharactersView from '../../features/character/pages/charactersView';
// ...

export const RouterInfo = [
  {
    element: <Root />, // 모든 페이지에 공통으로 적용될 레이아웃
    children: [
      { path: '*', element: <NotFoundView /> },
      { path: '/', element: <CouponsView /> },
      {
        path: '/characters',
        element: <CharactersView />,
        children: [
          /* ... */
        ],
      },
      { path: '/rank', element: <RankView /> },
      // ... 그 외 여러 라우트들
    ],
  },
];
```

#### 기대 효과

- **사용자 경험:** 페이지 전환이 즉각적으로 일어나, 데스크톱 애플리케이션처럼 빠르고 부드러운 상호작용이 가능합니다.

## 4. 프로젝트 실행 방법

1.  **의존성 설치**
    ```bash
    npm install
    ```
2.  **`.env` 파일 설정**
    - 프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 채워주세요.
    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_PUBLIC_ANON_KEY=your_supabase_public_anon_key
    VITE_KAKAO_REST_KEY=your_kakao_rest_key
    ```
3.  **개발 서버 실행**
    ```bash
    npm run dev
    ```
