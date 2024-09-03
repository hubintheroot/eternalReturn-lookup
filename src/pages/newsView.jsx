import styled from "styled-components";

export default function NewsView() {
  // TODO: 이터널리턴 새소식 페이지 크롤링해서 supabase에 올린 후 이 페이지에서 가져오기

  const news = [
    { title: "새소식 예시", timeStamp: "2024.08.28 18:10" },
    { title: "news1", timeStamp: "yyyy.mm.dd hh:mm" },
    { title: "news2", timeStamp: "yyyy.mm.dd hh:mm" },
    { title: "news3", timeStamp: "yyyy.mm.dd hh:mm" },
  ];
  const news_elements = news.map((n) => (
    <div className="article">
      <h2 className="news-title">news title: {n.title}</h2>
      <h3 className="time-stamp">{n.timeStamp}</h3>
    </div>
  ));
  return (
    <Section>
      <div className="news-container">{news_elements}</div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;

  & > div.news-container {
    width: 100%;
    max-width: 880px;
    word-break: keep-all;

    & h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    span {
      white-space: break-spaces;
      word-break: keep-all;
      overflow-wrap: break-word;
      margin: 0;
      padding: 0;
    }

    & .article {
      padding: 16px 0;
      margin: 0 15px;
      border-bottom: 1px solid #000;
    }

    & .article:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    & .read {
    }

    & h2.news-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
      line-height: 1.5;
    }
    & h3.time-stamp {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
