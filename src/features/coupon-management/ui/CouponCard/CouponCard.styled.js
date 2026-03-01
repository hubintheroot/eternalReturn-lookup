import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  color: rgb(107, 114, 128);
  transition: color 0.2s;
  &:hover {
    color: rgb(17, 24, 39);
  }
`;

export const InnerIcon = styled.div`
  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: ${(props) => (!props.$isActive ? '#44444E' : '#fff')};
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  box-sizing: border-box;
  padding: 1.5rem;
`;

export const TitleBox = styled(InnerIcon)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const Title = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: ${(props) => (!props.$isActive ? '#D3DAD9' : 'rgb(17, 24, 39)')};
`;

export const ModifyBox = styled.div`
  display: flex;
  height: 2rem;
  gap: 0.25rem;
`;

export const ModifyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0.5rem;

  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

export const DeleteButton = styled(ModifyButton)`
  &:hover {
    color: rgb(211, 47, 47);
  }
`;

export const Reward = styled.p`
  font-size: 0.875rem;
  color: ${(props) => (!props.$isActive ? '#D3DAD9' : 'rgb(107, 114, 128)')};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const CodeBox = styled(InnerIcon)`
  display: flex;
  align-items: center;
  background-color: ${(props) => (!props.$isActive ? '#D3DAD9' : '#fff')};
  border: ${(props) => (!props.$isActive ? 'none' : '1px dashed #A6E3E9')};
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Code = styled.p`
  margin: 0;
  font-size: 1rem;
  flex: 1 1 0%;
  color: ${(props) => (!props.$isActive ? 'rgb(60, 60, 60)' : '#2a9da4')};
  font-weight: 600;
`;

export const CopyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
`;

export const ExpiresAt = styled.div`
  font-size: 0.75rem;
  /* color: rgb(107, 114, 128); */
  color: ${(props) =>
    !props.$isActive ? 'rgb(211, 47, 47);' : 'rgb(107, 114, 128)'};
`;
