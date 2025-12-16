import RootLayout from '@/pages/RootLayout';
import NotFoundView from '@/shared/ui/NotFoundView';
import UserInfo from '@/pages/userInfo';
import CharacterInfo from '@/features/character-info/ui/CharacterInfo';
import ComingSoonView from '@/pages/comingsoon';
import CouponsView from '@/pages/couponsView';
import CharactersView from '@/pages/charactersView';
import NewsView from '@/pages/newsView';
import RankView from '@/pages/rankView';

const newsInfo = { text: '새소식 페이지를 준비 중입니다.' };

export const RouterInfo = [
  {
    element: <RootLayout />,
    children: [
      { path: '*', element: <NotFoundView /> },
      { path: '/', element: <CouponsView /> },
      { path: '/userInfo', element: <UserInfo /> },
      {
        path: '/characters',
        element: <CharactersView />,
        children: [{ path: '*', element: <CharacterInfo /> }],
      },
      {
        path: '/news',
        element: <ComingSoonView data={newsInfo} />,
      },
      { path: '/rank', element: <RankView /> },
      { path: '/coupons', element: <CouponsView /> },
      { path: '/test', element: <NewsView /> },
    ],
  },
];
