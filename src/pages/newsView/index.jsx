import styled from 'styled-components';

const news = [
  { id: 1, title: '새소식 예시', timeStamp: '2024.08.28 18:10', views: 100 },
  { id: 2, title: 'news1', timeStamp: 'yyyy.mm.dd hh:mm', views: 2400 },
  { id: 3, title: 'news2', timeStamp: 'yyyy.mm.dd hh:mm', views: 2 },
  { id: 4, title: 'news3', timeStamp: 'yyyy.mm.dd hh:mm', views: 50 },
  { id: 5, title: 'news4', timeStamp: 'yyyy.mm.dd hh:mm', views: 12000 },
];

export default function NewsView() {
  // TODO: 이터널리턴 새소식 페이지 크롤링해서 supabase에 올린 후 이 페이지에서 가져오기

  const testContainer = news.map((n) => (
    <Li key={n.id}>
      <div>{n.id.toString().padStart(2, '0')}</div>
      <div>
        <h3>{n.title}</h3>
      </div>
      <div>{n.timeStamp}</div>
      <div>{n.views}</div>
    </Li>
  ));

  return (
    <Section>
      <Ul>{testContainer}</Ul>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Ul = styled.ul`
  padding: 0;
  margin: 0;
  width: 60rem;
`;
const Li = styled.li`
  display: flex;

  > div {
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div:nth-of-type(2) {
    flex-grow: 5;
  }
  > div:nth-of-type(3) {
    flex-grow: 2;
  }
`;
