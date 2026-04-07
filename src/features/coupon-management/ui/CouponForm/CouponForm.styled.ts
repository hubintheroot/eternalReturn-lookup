import styled from 'styled-components';
import { scrollbarStyle } from '@/shared/ui/styles';

export const Container = styled.div`
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(224, 224, 224);
  border-radius: 0.5rem;
  width: calc(100% - 1rem);
  max-width: 28rem;
  overflow-y: visible;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  ${scrollbarStyle}

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-left: 3px solid #71C9CE;
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
  font-size: 1rem;

  @media screen and (min-width: 768px) {
    font-size: 0.875rem;
  }

  &:focus {
    outline: none;
    border-color: #71C9CE;
    box-shadow: 0 0 0 3px rgba(113, 201, 206, 0.2);
  }
`;

export const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    background-color: #fff;
    color: #000;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 0.375rem;
    font-size: 1rem;
    cursor: text;
    box-sizing: border-box;

    @media screen and (min-width: 768px) {
      font-size: 0.875rem;
    }

    &:focus {
      outline: none;
      border-color: #71C9CE;
      box-shadow: 0 0 0 3px rgba(113, 201, 206, 0.2);
    }
  }

  .react-datepicker {
    font-family: inherit;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .react-datepicker__header {
    background-color: #71C9CE;
    border-bottom: none;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker-time__header {
    color: #fff;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #71C9CE;
    color: #fff;

    &:hover {
      background-color: #A6E3E9;
    }
  }

  .react-datepicker__time-list-item--selected {
    background-color: #71C9CE !important;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #fff;
  }

  .react-datepicker__day-names {
    background-color: #71C9CE;
  }

  .react-datepicker__day-name {
    color: #fff;
  }

  .react-datepicker__day--outside-month {
    color: #b0b0b0;
  }

  .react-datepicker__time-container {
    border-left: 1px solid #71C9CE;
  }
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
  background-color: #71C9CE;
  color: #1a1a1a;
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
    background-color: #A6E3E9;
  }
`;
