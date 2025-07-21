import { styled } from "styled-components";
import SeasonBox from "../components/SeasonBox";

export default function RankView() {
  // TODO: canvas로 랭크 점수에 따른 티어를 표로 정리할 수 있나?
  // 점수를 입력하고 목표 티어까지의 점수를 계산하는 것 만들어보기
  // 기초 데이터는 supabase에다가 직접 입력해둘 것

  return (
    <Section>
      <SeasonBox />
      {/* <div className="rank-info-container">
        <div className="rank-point-bar">{bar}</div>
      </div> */}
    </Section>
  );
}

const tiers = [
  { id: 10, tier: "Immortal" },
  { id: 9, tier: "Titan" },
  { id: 8, tier: "Mithril" },
  { id: 7, tier: "Meteor" },
  { id: 6, tier: "Diamond" },
  { id: 5, tier: "Platinum" },
  { id: 4, tier: "Gold" },
  { id: 3, tier: "Silver" },
  { id: 2, tier: "Bronze" },
  { id: 1, tier: "Iron" },
];
// eslint-disable-next-line
const bar = tiers.map((item) => (
  <div className={item.tier.toLowerCase()} key={item.id}>
    <img
      src={`https://cdn.jsdelivr.net/gh/hubintheroot/eternalreturn_contents@main/tier/${item.tier}.webp`}
      alt={`${item.tier} tier`}
    />
  </div>
));

const Section = styled.section`
  display: flex;
  flex-direction: column;

  & > .rank-info-container {
    & .rank-point-bar {
      display: flex;
      flex-direction: column;
      height: 5rem;
      width: 20rem;
      margin: 0 auto;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;

      & > div {
        height: 1.5rem;
        width: 100%;
        margin-bottom: 5rem;

        & > img {
          width: 4rem;
        }
      }
      & > .iron {
        background-color: rgb(128, 128, 128);
      }
      & > .bronze {
        background-color: rgb(194, 131, 95);
      }
      & > .silver {
        background-color: rgb(153, 153, 153);
      }
      & > .gold {
        background-color: rgb(233, 195, 95);
      }
      & > .platinum {
        background-color: rgb(99, 189, 152);
      }
      & > .diamond {
        background-color: rgb(163, 123, 203);
      }
      & > .meteor {
        background-color: rgb(61, 187, 214);
      }
      & > .mithril {
        background-color: rgb(60, 123, 167);
      }
      & > .titan {
        background-color: rgb(99, 189, 153);
        /* 상위 700 */
      }
      & > .immortal {
        background-color: rgb(254, 66, 57);
        /* 상위 200 */
      }
    }
  }
`;
