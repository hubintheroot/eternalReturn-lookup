import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCharacterStore } from '@/entities/character/store';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './CharacterInfo.styled';
import NotFoundView from '@/shared/ui/NotFoundView';
import DifficultyBox from '../DifficultyBox';
import MiniSizeImage from '../MiniSizeImage';
import FullSizeImage from '../FullSizeImage';

const CharTextInfo = memo(({ textContents, isLoading }) => {
  return (
    <Styled.InfoDiv $isLoading={isLoading}>
      {textContents?.map((info) => (
        <Styled.InfoContent className="content" key={info.id}>
          {info.isStory ? (
            <Styled.DescContent className="story-desc">
              <p>{info.content}</p>
            </Styled.DescContent>
          ) : (
            <>
              <Styled.InfoContentTitle>{info.title}</Styled.InfoContentTitle>
              <div>{info.content}</div>
            </>
          )}
        </Styled.InfoContent>
      ))}
    </Styled.InfoDiv>
  );
});

const SkinImageList = memo(
  ({ skins, windowWidth, onSkinSelect, onImageLoad }) => {
    const loadableSkins = skins.filter(
      (skin) => skin.mini_size && skin.full_size
    );
    const size = windowWidth <= 768 ? 64 : 84;
    return (
      <Styled.Ul>
        {loadableSkins.map((skin) => (
          <MiniSizeImage
            key={skin.skin_id}
            data={{
              src: skin.mini_size,
              skinID: skin.skin_id,
              name: { kr: skin.name_kr, en: skin.name_en },
              size: size,
            }}
            handler={{ setSelect: onSkinSelect, loadEvent: onImageLoad }}
          />
        ))}
      </Styled.Ul>
    );
  }
);

export default function CharacterInfo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loading = useImageLoadedStore((state) => state.detailLoaded);
  const data = useCharacterStore((state) => state.data);
  const setCharDetailLoaded = useImageLoadedStore((state) => state.setCharDetailLoaded);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [character, setCharacter] = useState();
  const [selectedSkinID, setSelectedSkinID] = useState();
  const imageLoadedCount = useRef(0);

  useEffect(() => {
    if (!data || !data.length) return;

    imageLoadedCount.current = 0;

    const curCharacter = data.find((c) => pathname.includes(c.Name_EN));

    if (!curCharacter) return;

    const loadableSkins = curCharacter.skins.filter(
      (s) => s.full_size && s.mini_size
    );

    setSelectedSkinID(curCharacter.skins[0]?.skin_id);

    const nextData = {
      ...curCharacter,
      loadAbleSkins: loadableSkins,
      textContents: [
        {
          id: 1,
          title: '이름',
          content: curCharacter.Full_Name,
          isStory: false,
        },
        {
          id: 2,
          title: '성별',
          content: curCharacter.Gender,
          isStory: false,
        },
        {
          id: 3,
          title: '나이',
          content: curCharacter.Age,
          isStory: false,
        },
        {
          id: 4,
          title: '키',
          content: curCharacter.Height,
          isStory: false,
        },
        {
          id: 5,
          title: '',
          content: curCharacter.Story_Desc,
          isStory: true,
        },
      ],
    };
    setCharacter(nextData);
    setCharDetailLoaded(true);
  }, [pathname, data, setCharDetailLoaded]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSetSelect = useCallback(
    (nextSkinID) => {
      if (!character) return;
      setSelectedSkinID(nextSkinID);
    },
    [character]
  );

  const handleImageLoad = useCallback(() => {
    if (!character) return;
    imageLoadedCount.current += 1;
    if (imageLoadedCount.current === character.loadAbleSkins.length * 2) {
      setCharDetailLoaded(false);

      imageLoadedCount.current = 0;
    }
  }, [character, setCharDetailLoaded]);

  if (!data) {
    navigate('/');
    return null;
  }
  if (data && character && !data.some((c) => c.Name_EN === character.Name_EN)) {
    return <NotFoundView message="캐릭터" />;
  }

  if (!character) {
    return null;
  }

  return (
    <Styled.Section $isLoading={loading}>
      <Styled.TitleBox $isLoading={loading}>
        <Styled.CharNameBox className="content">
          <Styled.CharName>{character.Name_KR}</Styled.CharName>
          <Styled.Span>{character.Story_Title}</Styled.Span>
        </Styled.CharNameBox>
        <Styled.ControlDiffBox className="content">
          <div>조작 난이도</div>
          <DifficultyBox difficulty={character.Difficulty} maxDifficulty={5} />
        </Styled.ControlDiffBox>
      </Styled.TitleBox>
      <Styled.Container>
        <CharTextInfo
          textContents={character.textContents}
          isLoading={loading}
        />
        <Styled.ImgDiv>
          <SkinImageList
            skins={character.skins}
            windowWidth={windowWidth}
            onSkinSelect={handleSetSelect}
            onImageLoad={handleImageLoad}
          />
          <Styled.FullBox>
            {character.skins.map(
              (skin) =>
                skin.mini_size &&
                skin.full_size && (
                  <FullSizeImage
                    data={{
                      src: skin.full_size,
                      name: { kr: skin.name_kr, en: skin.name_en },
                      skinID: skin.skin_id,
                      select: selectedSkinID,
                    }}
                    handler={{
                      loadEvent: handleImageLoad,
                    }}
                    key={skin.skin_id}
                  />
                )
            )}
          </Styled.FullBox>
        </Styled.ImgDiv>
      </Styled.Container>
    </Styled.Section>
  );
}
