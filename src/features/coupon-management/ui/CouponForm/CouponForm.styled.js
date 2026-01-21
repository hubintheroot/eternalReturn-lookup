import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(224, 224, 224);
  border-radius: 0.5rem;
  width: calc(100% - 1rem);
  max-width: 28rem;
  max-height: calc(-2rem + 100vh);
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgb(224, 224, 224);
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
`;

export const SubTitle = styled.p`
  color: rgb(102, 102, 102);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  border-radius: 0.375rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgb(102, 102, 102);

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Form = styled.form`
  padding: 1rem;
`;

export const InputBox = styled.div`
  margin-bottom: 1rem;
`;

export const InputCheckBox = styled(InputBox)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid rgb(224, 224, 224);
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  & > input {
    width: fit-content;
    margin-right: 0.5rem;
  }
  & > label {
    margin: 0;
    color: rgb(102, 102, 102);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #000;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #fff;
  color: #000;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 0.375rem;
  font-size: 0.875rem;
`;

export const AddButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid rgb(224, 224, 224);
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: rgb(51, 51, 51);
  }
`;
