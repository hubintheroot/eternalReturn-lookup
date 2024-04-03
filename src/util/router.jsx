import Root from '../pages/Root';
import NotFoundView from '../pages/notfoundView';
import CharactersView from '../pages/charactersView'
import ComingSoonView from '../pages/comingsoon';
import RedirectHome from './RedirectHome';

const characterInfo = {text: '캐릭터 스킨 정보를 준비 중입니다.'};
const userInfo = {text:'랭크 정보 페이지를 준비 중입니다.'};

export const RouterInfo = [{
        element: <Root/>,
        children: [
            { path: '*', element: <NotFoundView/>},
            { path: '/', element: <RedirectHome />},
            { path: '/users', element: <ComingSoonView data={userInfo} /> },
            { 
                path: '/characters',
                element: <CharactersView />,
                children: [
                    { path: '*', element: <ComingSoonView data={characterInfo}/> }
                ]
            },
        ]
    }
];