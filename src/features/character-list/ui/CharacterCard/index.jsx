import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './CharacterCard.styled';
export default function CharacterCard({
  data,
  maxLength,
  cnt,
  link
}) {
  const [disabled, setDisabled] = useState(false);
  const {
    pathname
  } = useLocation();
  const loading = useImageLoadedStore(state => state.charListLoaded);
  const setCharListLoaded = useImageLoadedStore(state => state.setCharListLoaded);
  const isActive = decodeURIComponent(pathname).includes(data.Name_EN);
  const handleLoad = () => {
    cnt.current += 1;
    if (maxLength === cnt.current) setCharListLoaded(false);
  };
  const handleError = e => {
    cnt.current += 1;
    e.target.src = `${process.env.PUBLIC_URL}/icons8-64.png`;
    e.target.classList.add('prepare-image');
    setDisabled(true);
    if (maxLength === cnt.current) setCharListLoaded(false);
  };
  const handleClick = e => {
    if (disabled) {
      e.preventDefault();
      alert('데이터를 준비중입니다.');
    }
  };
  return <Styled.Li>
      <Styled.SkelCard style={{
      display: loading ? 'flex' : 'none'
    }}>
        <Styled.SkelImg />
        <Styled.SkelCaption />
      </Styled.SkelCard>
      <Styled.StyledLink to={link} $active={isActive} $disabled={disabled} onClick={handleClick} style={{
      display: loading ? 'none' : 'block'
    }}>
        <Styled.Figure>
          <Styled.ImgWrapper>
            <Styled.Thumb src={data.skins[0].mini_size} alt={data.Name_KR} draggable="false" onLoad={handleLoad} onError={handleError} />
            {data.Weekly_Free && <Styled.UnlockIcon src="/images/icons/unlock_icon.png" alt="로테이션" draggable="false" />}
          </Styled.ImgWrapper>
          <Styled.Figcaption $active={isActive}>
            {data.Name_KR}
          </Styled.Figcaption>
        </Styled.Figure>
      </Styled.StyledLink>
    </Styled.Li>;
}