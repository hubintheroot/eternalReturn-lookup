import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: calc(100% - 2.5rem);
  max-width: 28rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  word-break: keep-all;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  text-align: center;
  & > h2 {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.25rem;
    margin: 0 0 0.5rem;
    padding: 0;
  }
  & > p {
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    color: rgb(113, 113, 122);
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* justify-content: space-between; */
  padding-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px;
  border-style: solid;
  border-color: #e5e5e8;
`;

export const SubTitle = styled.span`
  color: rgb(113, 113, 122);
  line-height: 1rem;
  font-size: 1rem;
`;

export const Text = styled.span`
  line-height: 0.8rem;
  font-size: 0.8rem;
  @media screen and(min-width: 768px) {
    line-height: 1rem;
    font-size: 1rem;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
`;

export const CloseBox = styled(ButtonBox)`
  justify-content: flex-end;
`;

export const DeleteBox = styled(ButtonBox)`
  justify-content: center;
  padding: 1rem 0;
`;
