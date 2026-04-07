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
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const ImgBox = styled.span`
  overflow: hidden;
  border-radius: 8rem;
  max-width: 6rem;
  max-height: 6rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px;
  border-style: solid;
  border-color: #e5e5e8;
  & span {
    line-height: 1rem;
    font-size: 1rem;
  }
`;

export const SubTitle = styled.span`
  color: rgb(113, 113, 122);
`;

export const Text = styled.span``;

export const ButtonBox = styled.div`
  display: flex;
`;

export const CloseBox = styled(ButtonBox)`
  justify-content: flex-end;
`;

export const ResignBox = styled(ButtonBox)`
  justify-content: center;
  padding: 1rem 0;
`;
