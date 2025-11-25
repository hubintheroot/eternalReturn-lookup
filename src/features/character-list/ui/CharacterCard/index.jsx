import { useState } from "react";
import { Link } from "react-router-dom";
import { useImageLoadedStore } from "@/entities/image-loaded/model/imageLoadedStore";
import styled, { keyframes } from "styled-components";

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
  const setCharListLoaded = useImageLoadedStore((state) => state.setCharListLoaded);

  const handler = {
    imgError: (e) => {
      cnt.current += 1;
      e.target.src = `${process.env.PUBLIC_URL}/icons8-64.png`;
      e.target.classList.add("prepare-image");

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
        alert("데이터를 준비중입니다.");
      }
    },
    setStyle: (e) => {
      e.target.style.cursor = disabled ? "not-allowed" : "pointer";
    },
    disableSkelUI: () => {
      if (maxLength === cnt.current) setCharListLoaded(false);
    },
  };

  return (
    <Card>
      {/* skeleton ui */}
      <SkelStyledLink style={{ display: loading ? "block" : "none" }}>
        <Figure>
          <SkelImgBox>
            <Img height={`${size.height}px`} width={`${size.width}px`} />
          </SkelImgBox>
          <SkelFigcaption></SkelFigcaption>
        </Figure>
      </SkelStyledLink>

      {/* content */}
      <StyledLink
        to={link}
        style={{ display: loading ? "none" : "block" }}
        onClick={handler.disableLink}
        onMouseOver={handler.setStyle}
      >
        <Figure>
          <ImgBox>
            {data.Weekly_Free ? (
              <Free src={freeIconPath} alt="free rotation character flag" />
            ) : null}
            <Img
              src={bgPath}
              alt="background image"
              height={size.height}
              width={size.width}
            />
            <Img
              src={data.ImagePath}
              onError={handler.imgError}
              onLoad={handler.imgOnload}
              alt="character image"
              height={size.height}
              width={size.width}
            />
          </ImgBox>
          <Figcaption>{data.Name_KR}</Figcaption>
        </Figure>
      </StyledLink>
    </Card>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  margin: 0 1rem;
`;
const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  & .prepare-image {
    width: 48px;
    height: 48px;
    top: 8px;
    left: 8px;
  }
`;
const ImgBox = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin-bottom: 4px;
`;
const Free = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 40;
  top: -5px;
  left: -5px;
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;
const Figcaption = styled.figcaption`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;
const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
  &:hover > ${Figcaption} {
    color: rgb(153, 153, 153);
  }
`;

const pulseKeyFrame = keyframes`
    0% {
        opacity: .5;
    }
    50% {
        opacity: .3;
    }
    100% {
        opacity: .5;
    }
`;
const SkelStyledLink = styled(StyledLink)`
  animation: ${pulseKeyFrame} 1.5s ease-in-out infinite;
`;
const SkelFigcaption = styled(Figcaption)`
  background-color: lightgrey;
  height: 12px;
  width: 100%;
`;
const SkelImgBox = styled(ImgBox)`
  background-color: lightgrey;
`;
