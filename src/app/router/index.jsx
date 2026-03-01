import RootLayout from '@/pages/RootLayout';
import NotFoundView from '@/shared/ui/NotFoundView';
import UserInfo from '@/pages/userInfo';
import CharacterInfo from '@/features/character-info/ui/CharacterInfo';
import CouponsView from '@/pages/couponsView';
import CharactersView from '@/pages/charactersView';
import NewsView from '@/pages/newsView';
import LandingView from '@/pages/landingView';
import PatchNotesView from '@/pages/patchNotesView';
import PatchNoteDetailView from '@/pages/patchNoteDetailView';

export const RouterInfo = [
  {
    element: <RootLayout />,
    children: [
      { path: '*', element: <NotFoundView /> },
      { path: '/', element: <LandingView /> },
      { path: '/userInfo', element: <UserInfo /> },
      {
        path: '/characters',
        element: <CharactersView />,
        children: [{ path: '*', element: <CharacterInfo /> }],
      },
      { path: '/patchNotes', element: <PatchNotesView /> },
      { path: '/patchNotes/:id', element: <PatchNoteDetailView /> },
      { path: '/coupons', element: <CouponsView /> },
      { path: '/test', element: <NewsView /> },
    ],
  },
];
