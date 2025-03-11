import { useEffect, useState } from "react";
import styled from "styled-components";

export const itemList = [
  { title: "이벤트 NP", value: "EventNP", key: 1, checked: false },
  { title: "NP", value: "NP", key: 2, checked: false },
  {
    title: "연구소 데이터 박스",
    value: "LabDataBox",
    key: 3,
    checked: false,
  },
  {
    title: "스킨 데이터 박스",
    value: "SkinDataBox",
    key: 4,
    checked: false,
  },
  { title: "A-Coin", value: "A-Coin", key: 5, checked: false },
  { title: "이모티콘", value: "Emoji", key: 6, checked: false },
  { title: "시즌 토큰", value: "SeasonToken", key: 7, checked: false },
  { title: "브금", value: "BGM", key: 8, checked: false },
  { title: "ER Point 부스트", value: "ERBoost", key: 9, checked: false },
  { title: "A-Coin 부스트", value: "A-CoinBoost", key: 10, checked: false },
  { title: "XP 부스트", value: "XPBoost", key: 11, checked: false },
];

export default function CouponForm({ title, onSubmit, onClose, data }) {
  const [hasExpires, setHasExpires] = useState(false);
  const [expires, setExpires] = useState();
  const [item, setItem] = useState();

  useEffect(() => {
    itemList.forEach((item) => (item.checked = false));
    if (data) {
      const expires_at = formatDate(new Date(data.expires_at));
      const selectedItemList = data.description.split(", ");
      const newItemList = [...itemList];

      selectedItemList.forEach((item) => {
        itemList.some(({ title }, i) => {
          if (item === title) {
            newItemList[i].checked = true;
            return true;
          } else return false;
        });
      });

      setHasExpires(data.expires_at === null ? true : false);
      setExpires(expires_at);
      setItem(newItemList);
    } else {
      const today = formatDate(new Date());
      setExpires(today);
      setItem(itemList);
    }
  }, [data]);

  const checkHandler = () => {
    setHasExpires(!hasExpires);
  };

  return (
    <Container>
      <CloseButton onClick={onClose}>close</CloseButton>
      <h2>{title}</h2>
      <StyledForm onSubmit={onSubmit}>
        <div>
          <CouponInput
            name="coupon-code"
            placeholder="쿠폰 코드"
            defaultValue={data?.code}
          />
        </div>
        <ExpiresContainer>
          <ExpiresInput
            type="datetime-local"
            name="expires-at"
            min="2023-07-20T00:00"
            max="2100-01-01T23:59"
            defaultValue={hasExpires ? null : expires}
            disabled={hasExpires}
          />
          <StyledLabel>
            <input
              onChange={checkHandler}
              type="checkbox"
              name="has-expires"
              id="has-expires"
              checked={hasExpires}
            />
            <span>기한 없음</span>
          </StyledLabel>
        </ExpiresContainer>
        <CheckBoxContainer>
          {item?.map((item) => (
            <StyledLabel htmlFor={item.value} key={item.key}>
              <input
                type="checkbox"
                name={item.value}
                id={item.value}
                defaultChecked={item.checked}
              />
              <span>{item.title}</span>
            </StyledLabel>
          ))}
        </CheckBoxContainer>
        <ButtonContainer>
          <SubmitButton type="submit">저장</SubmitButton>
        </ButtonContainer>
      </StyledForm>
    </Container>
  );
}

function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

const Container = styled.div`
  width: 300px;
  @media screen and (min-width: 768px) {
    width: 500px;
  }
`;
const StyledDiv = styled.div`
  display: flex;
`;
const ButtonContainer = styled(StyledDiv)`
  flex-direction: row;
  justify-content: center;
`;
const ExpiresContainer = styled(StyledDiv)`
  flex-direction: row;
  gap: 0.2em;
`;
const CloseButton = styled.div`
  margin-left: auto;
  width: 4rem;
  text-align: center;
  border: 1px solid #000;

  &:hover {
    cursor: pointer;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const StyledInput = styled.input`
  margin: 0;
  padding: 1em;
  font-size: 1em;
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 8px;
`;
const CouponInput = styled(StyledInput)`
  width: 80%;
`;
const ExpiresInput = styled(StyledInput)`
  width: fit-content;
`;
const CheckBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  gap: 1rem;
  margin: 0;
  box-sizing: border-box;
  word-break: keep-all;
`;
const StyledLabel = styled.label`
  width: fit-content;
  & > span {
    margin-left: 0.5em;
  }
`;
const SubmitButton = styled.button`
  padding: 1em 1.2em;
  appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    padding: 0.5em 1em;
  }
`;
