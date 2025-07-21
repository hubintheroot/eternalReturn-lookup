import Root from '../../pages/Root';
import NotFoundView from '../../pages/notfoundView';
import UserInfo from '../../pages/userInfo';
import CharacterInfo from '../../features/character/components/CharacterInfo';
import ComingSoonView from '../../pages/comingsoon';
import CouponsView from '../../features/coupon/pages/couponsView';
import CharactersView from '../../features/character/pages/charactersView';

// eslint-disable-next-line
import NewsView from '../../pages/newsView';
// eslint-disable-next-line
import RankView from '../../features/season/pages/rankView';

// eslint-disable-next-line
const rankInfo = { text: '랭크 정보 페이지를 준비 중입니다.' };
// eslint-disable-next-line
const newsInfo = { text: '새소식 페이지를 준비 중입니다.' };

export const RouterInfo = [
  {
    element: <Root />,
    children: [
      { path: '*', element: <NotFoundView /> },
      { path: '/', element: <CouponsView /> },
      { path: '/userInfo', element: <UserInfo /> },
      // { path: "/", element: <RedirectHome /> },
      {
        path: '/characters',
        element: <CharactersView />,
        children: [{ path: '*', element: <CharacterInfo /> }],
      },
      {
        path: '/news',
        element: <ComingSoonView data={newsInfo} />,
        // element: <NewsView />,
      },
      // { path: "/rank", element: <ComingSoonView data={rankInfo} /> },
      { path: '/rank', element: <RankView /> },
      { path: '/coupons', element: <CouponsView /> },
    ],
  },
];
