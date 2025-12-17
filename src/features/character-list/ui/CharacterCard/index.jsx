import { useState } from 'react';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './CharacterCard.styled';

export default function CharacterCard({
  data,
  maxLength,
  cnt,
  size,
  link,
  bgPath,
  freeIconPath,
}) {
  const [disabled, setDisabled] = useState(false);
  const loading = useImageLoadedStore((state) => state.charListLoaded);
  const setCharListLoaded = useImageLoadedStore(
    (state) => state.setCharListLoaded
  );

  const handler = {
    imgError: (e) => {
      cnt.current += 1;
      e.target.src = `${process.env.PUBLIC_URL}/icons8-64.png`;
      e.target.classList.add('prepare-image');

      setDisabled(true);
      handler.disableSkelUI();
    },
    imgOnload: () => {
      cnt.current += 1;
      handler.disableSkelUI();
    },
    disableLink: (e) => {
      if (disabled) {
        e.preventDefault();
        alert('데이터를 준비중입니다.');
      }
    },
    setStyle: (e) => {
      e.target.style.cursor = disabled ? 'not-allowed' : 'pointer';
    },
    disableSkelUI: () => {
      if (maxLength === cnt.current) setCharListLoaded(false);
    },
  };

  return (
    <Styled.Card>
      {/* skeleton ui */}
      <Styled.SkelStyledLink style={{ display: loading ? 'block' : 'none' }}>
        <Styled.Figure>
          <Styled.SkelImgBox>
            <Styled.Img height={`${size.height}px`} width={`${size.width}px`} />
          </Styled.SkelImgBox>
          <Styled.SkelFigcaption></Styled.SkelFigcaption>
        </Styled.Figure>
      </Styled.SkelStyledLink>

      {/* content */}
      <Styled.StyledLink
        to={link}
        style={{ display: loading ? 'none' : 'block' }}
        onClick={handler.disableLink}
        onMouseOver={handler.setStyle}
      >
        <Styled.Figure>
          <Styled.ImgBox>
            {data.Weekly_Free ? (
              <Styled.Free src={freeIconPath} alt="free rotation character flag" />
            ) : null}
            <Styled.Img
              src={bgPath}
              alt="background image"
              height={size.height}
              width={size.width}
            />
            <Styled.Img
              src={data.ImagePath}
              onError={handler.imgError}
              onLoad={handler.imgOnload}
              alt="character image"
              height={size.height}
              width={size.width}
            />
          </Styled.ImgBox>
          <Styled.Figcaption>{data.Name_KR}</Styled.Figcaption>
        </Styled.Figure>
      </Styled.StyledLink>
    </Styled.Card>
  );
}
