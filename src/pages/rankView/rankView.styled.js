import styled from 'styled-components';

export const Section = styled.section`
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
