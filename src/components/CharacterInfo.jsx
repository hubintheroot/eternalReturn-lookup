import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import DifficultyBox from "./DifficultyBox";
import MiniSizeImage from "./MiniSizeImage";
import FullSizeImage from "./FullSizeImage";
import { setCharDetailLoaded } from "../features/imageLoaded/imageLoadedSlice";

const skelAnimation = keyframes`
    0% {
        opacity: .6;
    }
    50% {
        opacity: .3;
    }
    100% {
        opacity: .6;
    }
`;
const animation = css`
  animation: ${skelAnimation} 1.5s ease-in-out infinite;
`;
const Section = styled.section`
  box-sizing: border-box;
  ${(props) => (props.$isLoading ? animation : null)};

  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
const FlexDiv = styled.div`
  display: flex;
`;
const InfoDiv = styled.div`
  width: 18rem;
  word-break: keep-all;
  word-wrap: break-word;
  ${(props) =>
    props.$isLoading
      ? `
        pointer-events: none;
        cursor: default;
        & .content {
          max-width: fit-content;
          background-color: lightgrey;
          border-radius: 5px;
        }

        & .content > .story-desc {
          width: 18rem;
          height: 25rem;
        }

        & .content > div {
            opacity: 0;
        }
    `
      : null}
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const ImgDiv = styled(FlexDiv)`
  flex-direction: row;
  gap: 2rem;
  width: 40rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    max-width: 382px;
    margin: 0 auto 4rem;
    margin-top: 1rem;
    gap: 1rem;
    height: 653px;
    justify-content: flex-start;
  }
  @media screen and (max-width: 429px) {
    width: 100%;
  }
`;
const Container = styled(FlexDiv)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  min-height: 856px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 2rem;
    justify-content: flex-start;
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    width: 100%;
    gap: 0.2rem;
  }
`;
const TitleBox = styled(FlexDiv)`
  margin-top: 1.5rem;
  flex-direction: column;
  gap: 0.5rem;

  ${(props) =>
    props.$isLoading
      ? `
        pointer-events: none;
        cursor: default;
        & .content {
          max-width: fit-content;
          background-color: lightgrey;
          border-radius: 5px;
        }
        & .content > * {
        opacity: 0;
        }
    `
      : null}
`;
const CharNameBox = styled.div`
  display: flex;
  margin: 1rem 0 0;
`;
const CharName = styled.h1`
  margin: 0;
`;

const Span = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1rem;
  display: flex;
  align-items: end;
  &::before {
    content: "“";
  }
  &::after {
    content: "”";
  }
`;
const ControlDiffBox = styled(FlexDiv)`
  flex-direction: row;
  font-size: 0.8rem;
  line-height: 1.2rem;
  gap: 1rem;
`;
const InfoContent = styled(FlexDiv)`
  line-height: 2rem;
  margin: 0.5rem 0;
  gap: 1rem;
`;
const InfoContentTitle = styled(FlexDiv)`
  justify-content: center;
  padding: 0 0.5rem;
  border: 0.1rem solid #000;
  border-radius: 0.8rem;
  width: 2rem;
  font-weight: 800;
`;
const DescContent = styled.div`
  margin: 1rem 0 0;
  white-space: pre-wrap;
  & > p {
    padding: 0;
    line-height: 2rem;
  }
`;
const FullBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 767px) {
    margin-bottom: 2rem;
  }
`;

export default function CharacterInfo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.imageLoaded.detailLoaded);
  const data = useSelector((state) => state.characterData.data);
  const [selectedSkin, setSelectedSkin] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageLoadedCount = useRef(0);
  //   const voiceRef = useRef(null);

  useEffect(() => {
    setSelectedSkin("default");
    imageLoadedCount.current = 0;
    dispatch(setCharDetailLoaded(true));
  }, [pathname, dispatch]);

  // TODO: VoicePlayer 준비중
  //   useEffect(() => {
  //     const getVoicePath = () => {
  //       const character = pathname.replace("/characters/", "");
  //       const voicePath = require(`../assets/charactersVoice/${character}/selected.wav`);
  //       return voicePath;
  //     };
  //     const play = () => {
  //       try {
  //         voiceRef.current.play();
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     };
  //     const voicePlayer = () => {
  //       try {
  //         const voicePath = getVoicePath();
  //         if (voiceRef.current) {
  //           voiceRef.current.src = voicePath;
  //         } else {
  //           const voice = new Audio(voicePath);
  //           voiceRef.current = voice;
  //         }
  //         voiceRef.current.addEventListener("canplaythrough", play);
  //       } catch (error) {
  //         if (voiceRef.current) {
  //           voiceRef.current.pause();
  //         }
  //         // console.log(`no voice for character: ${error.message}`);
  //       }
  //       return () => {
  //         voiceRef.current.removeEventListener("canplaythrough", play);
  //       };
  //     };

  //     voicePlayer();
  //   }, [pathname]);

  useEffect(() => {
    const eventHandler = {
      resizing: () => setWindowWidth(window.innerWidth),
    };
    // TODO: VoicePlayer 준비중
    //   const handleReloadBlock = (e) => {
    //     if (e.key === "F5") {
    //       e.preventDefault();
    //       e.stopPropagation();
    //     }
    //   };
    window.addEventListener("resize", eventHandler.resizing);
    //   window.addEventListener("keydown", handleReloadBlock);

    return () => {
      window.removeEventListener("resize", eventHandler.resizing);
      //   window.removeEventListener("keydown", handleReloadBlock);
    };
  }, []);

  if (!data) navigate("/");
  else {
    const handler = {
      setSelect: (e) => {
        const skin_name = e.target.src.split("/")[8].replaceAll("%20", " ");
        setSelectedSkin(handler.getImagePath(skin_name));
      },
      loadEvent: () => {
        imageLoadedCount.current += 1;

        if (imageLoadedCount.current === skins.length * 2) {
          dispatch(setCharDetailLoaded(false));
          imageLoadedCount.current = 0;
        }
      },
      getImagePath: (skinName) => {
        const upperA = characterName.toUpperCase();
        const upperB =
          skinName &&
          skinName.replaceAll(" ", "").replaceAll("&", "").toUpperCase();
        return upperA === upperB
          ? "default"
          : skinName.replace(`. ${characterName}`, "");
      },
    };

    const jsDelivr =
      "https://cdn.jsdelivr.net/gh/hubintheroot/eternalreturn_contents@main/img";

    const characterName = pathname.replace("/characters/", "");
    const character = data.find(
      (character) => characterName === character.Name_EN
    );
    const skins = character.skins.filter(
      (skin) => skin.mini_size && skin.full_size
    );

    const textContents = [
      {
        id: 1,
        title: "이름",
        content: character.Full_Name,
        isStory: false,
      },
      {
        id: 2,
        title: "성별",
        content: character.Gender,
        isStory: false,
      },
      {
        id: 3,
        title: "나이",
        content: character.Age,
        isStory: false,
      },
      {
        id: 4,
        title: "키",
        content: character.Height,
        isStory: false,
      },
      {
        id: 5,
        title: "",
        content: character.Story_Desc,
        isStory: true,
      },
    ];

    return (
      <Section $isLoading={loading}>
        <TitleBox $isLoading={loading}>
          <CharNameBox className="content">
            <CharName>{character.Name_KR}</CharName>
            <Span>{character.Story_Title}</Span>
          </CharNameBox>
          <ControlDiffBox className="content">
            <div>조작 난이도</div>
            <DifficultyBox
              difficulty={character.Difficulty}
              maxDifficulty={5}
            />
          </ControlDiffBox>
        </TitleBox>
        <Container>
          <InfoDiv $isLoading={loading}>
            {textContents.map((info) => (
              <InfoContent className="content" key={info.id}>
                {info.isStory ? (
                  <DescContent className="story-desc">
                    <p>{info.content}</p>
                  </DescContent>
                ) : (
                  <>
                    <InfoContentTitle>{info.title}</InfoContentTitle>
                    <div>{info.content}</div>
                  </>
                )}
              </InfoContent>
            ))}
          </InfoDiv>
          <ImgDiv>
            <Ul>
              {skins.map((skin) => (
                <MiniSizeImage
                  src={`${jsDelivr}/${character.Name_EN}/${handler.getImagePath(
                    skin.name_en
                  )}/Mini.webp`}
                  alt={`${skin.name_en}`}
                  handler={handler}
                  size={windowWidth <= 768 ? 64 : 84}
                  key={skin.skin_id}
                />
              ))}
            </Ul>
            <FullBox>
              {skins.map((skin) => (
                <FullSizeImage
                  // src={`${process.env.REACT_APP_TEST}/${
                  //   character.Name_EN
                  // }/${handler.getImagePath(skin.name_en)}/Full.webp`}
                  src={`${jsDelivr}/${character.Name_EN}/${handler.getImagePath(
                    skin.name_en
                  )}/Full.webp`}
                  alt={`${skin.name_en}`}
                  name={{ kr: skin.name_kr, en: skin.name_en }}
                  select={selectedSkin}
                  handler={handler}
                  key={skin.skin_id}
                />
              ))}
            </FullBox>
          </ImgDiv>
        </Container>
      </Section>
    );
  }
}
