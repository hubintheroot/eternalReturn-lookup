# 배포 페이지

https://eternalreturn-lookup.netlify.app/
https://eternalreturn-lookup.pages.dev/

# EternalReturn Lookup

## 프로젝트 소개

EternalReturn Lookup은 이터널 리턴 게임의 다양한 정보를 제공하는 웹 애플리케이션입니다. 스킨 이미지, 시즌 정보, 사용 가능한 쿠폰 등 게임과 관련된 유용한 정보들을 손쉽게 확인할 수 있습니다.

**주요 기능:**

- **스킨 및 캐릭터 정보 조회:** 다양한 캐릭터와 스킨 이미지를 찾아볼 수 있습니다.
- **시즌 정보:** 현재 진행중인 시즌과 관련된 정보를 제공합니다.
- **쿠폰 정보:** 사용 가능한 쿠폰 목록을 확인하고, 코드를 복사하여 게임 내에서 사용할 수 있습니다.
- **신뢰성 있는 쿠폰 관리:** 사용자가 직접 쿠폰을 등록하고 수정할 수 있습니다. 쿠폰 정보의 신뢰도를 높이기 위해, 쿠폰 등록 및 수정 기능은 회원가입을 한 사용자에게만 제공됩니다.

로그인하지 않은 사용자도 모든 정보(스킨, 시즌, 쿠폰)를 자유롭게 조회할 수 있습니다.

## 프로젝트 구조

```
.
├── public/
│   ├── images/
│   │   ├── backgroundImgs/
│   │   └── icons/
│   └── (기타 public 자산)
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── backgroundImgs/
│   │       └── icons/
│   ├── common/
│   │   ├── components/
│   │   ├── ui/
│   │   └── utils/
│   ├── features/
│   │   ├── character/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── coupon/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── imageLoaded/
│   │   ├── login/
│   │   ├── season/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   └── sortOption/
│   ├── pages/
│   ├── supabase/
│   └── (기타 src 폴더)
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 실행 방법

1. **의존성 설치**

   ```bash
   npm install
   ```

2. **환경 변수 설정**

   `.env` 파일을 프로젝트 루트에 생성하고, 다음 환경 변수를 추가합니다.

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLIC_ANON_KEY=your_supabase_public_anon_key
   VITE_KAKAO_REST_KEY=your_kakao_rest_key
   VITE_BACKGROUND_IMAGE_PATH=your_background_image_path
   VITE_UNLOCK_ICON_PATH=your_unlock_icon_path
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   이제 브라우저에서 [http://localhost:5173](http://localhost:5173)으로 접속할 수 있습니다.

## 사용 기술

- React
- Vite
- Redux Toolkit
- React Router
- styled-components
- Supabase
