import Root from "../pages/Root";
import NotFoundView from "../pages/notfoundView";
import CharactersView from "../pages/charactersView";
import ComingSoonView from "../pages/comingsoon";
import CharacterInfo from "../components/Character/CharacterInfo";
// eslint-disable-next-line
import NewsView from "../pages/newsView";
// eslint-disable-next-line
import RankView from "../pages/rankView";
import CouponsView from "../pages/couponsView";
import UserInfo from "../pages/userInfo";

// eslint-disable-next-line
const rankInfo = { text: "랭크 정보 페이지를 준비 중입니다." };
// eslint-disable-next-line
const newsInfo = { text: "새소식 페이지를 준비 중입니다." };

export const RouterInfo = [
  {
    element: <Root />,
    children: [
      { path: "*", element: <NotFoundView /> },
      { path: "/", element: <CouponsView /> },
      { path: "/userInfo", element: <UserInfo /> },
      // { path: "/", element: <RedirectHome /> },
      {
        path: "/characters",
        element: <CharactersView />,
        children: [{ path: "*", element: <CharacterInfo /> }],
      },
      {
        path: "/news",
        element: <ComingSoonView data={newsInfo} />,
        // element: <NewsView />,
      },
      // { path: "/rank", element: <ComingSoonView data={rankInfo} /> },
      { path: "/rank", element: <RankView /> },
      { path: "/coupons", element: <CouponsView /> },
    ],
  },
];
