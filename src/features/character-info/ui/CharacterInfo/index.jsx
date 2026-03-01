import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCharacterStore } from '@/entities/character/store';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './CharacterInfo.styled';
import NotFoundView from '@/shared/ui/NotFoundView';
import DifficultyBox from '../DifficultyBox';
import ImageCarousel from '../ImageCarousel';

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

export default function CharacterInfo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loading = useImageLoadedStore((state) => state.detailLoaded);
  const data = useCharacterStore((state) => state.data);
  const setCharDetailLoaded = useImageLoadedStore(
    (state) => state.setCharDetailLoaded,
  );
  const setCarouselHeight = useImageLoadedStore(
    (state) => state.setCarouselHeight,
  );
  const [character, setCharacter] = useState();
  const [isEntering, setIsEntering] = useState(false);
  const imageLoadedCount = useRef(0);
  const imgDivRef = useRef(null);
  const hadCharacterRef = useRef(false);
  const enterTimerRef = useRef(null);

  useEffect(() => {
    if (!data || !data.length) return;

    const curCharacter = data.find((c) =>
      decodeURIComponent(pathname).includes(c.Name_EN),
    );

    if (!curCharacter) return;

    const loadableSkins = curCharacter.skins.filter(
      (s) => s.full_size && s.mini_size,
    );

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

    imageLoadedCount.current = 0;
    setCharacter(nextData);
    setCharDetailLoaded(true);

    if (!hadCharacterRef.current) {
      hadCharacterRef.current = true;
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;
      if (isLandscape) {
        clearTimeout(enterTimerRef.current);
        setIsEntering(true);
        enterTimerRef.current = setTimeout(() => setIsEntering(false), 350);
      }
    }

    return () => clearTimeout(enterTimerRef.current);
  }, [pathname, data, setCharDetailLoaded]);

  useLayoutEffect(() => {
    const el = imgDivRef.current;
    if (!el) return;
    const landscapeMq = window.matchMedia('(orientation: landscape)');
    const observer = new ResizeObserver(() => {
      if (landscapeMq.matches) {
        setCarouselHeight(el.getBoundingClientRect().height);
      } else {
        setCarouselHeight(0);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [character, setCarouselHeight]);

  const handleImageLoad = useCallback(() => {
    if (!character) return;
    imageLoadedCount.current += 1;
    if (imageLoadedCount.current >= character.loadAbleSkins.length) {
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
    <Styled.Section $isEntering={isEntering}>
      <Styled.Container>
        <Styled.TitleBox $isLoading={loading}>
          <Styled.CharNameBox className="content">
            <Styled.CharName>{character.Name_KR}</Styled.CharName>
            <Styled.Span>{character.Story_Title}</Styled.Span>
          </Styled.CharNameBox>
          <Styled.ControlDiffBox className="content">
            <div>조작 난이도</div>
            <DifficultyBox
              difficulty={character.Difficulty}
              maxDifficulty={5}
            />
          </Styled.ControlDiffBox>
        </Styled.TitleBox>
        <Styled.ContentBox>
          <Styled.ImgDiv ref={imgDivRef}>
            <ImageCarousel
              skins={character.loadAbleSkins}
              isLoading={loading}
              onImageLoad={handleImageLoad}
            />
          </Styled.ImgDiv>
          <CharTextInfo
            textContents={character.textContents}
            isLoading={loading}
          />
        </Styled.ContentBox>
      </Styled.Container>
    </Styled.Section>
  );
}
