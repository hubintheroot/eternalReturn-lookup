import { useEffect, useState } from "react";
import styled from "styled-components";
import { XIconSVG } from "../ui/SVG";

export default function CouponForm({ text, onSubmit, onClose, data }) {
  const [noExpiry, setNoExpiry] = useState(false);
  const [expiry, setExpiry] = useState(formatDate(new Date()));

  useEffect(() => {
    if (data) {
      const expires_at = formatDate(new Date(data.expires_at));

      setNoExpiry(data.expires_at === null ? true : false);
      setExpiry(expires_at);
    } else {
      const today = formatDate(new Date());
      setExpiry(today);
    }
  }, [data]);

  const checkHandler = () => {
    setNoExpiry(!noExpiry);
  };

  return (
    <Container>
      <TitleContainer>
        <div>
          <Title>{text.title}</Title>
          <SubTitle>{text.sub}</SubTitle>
        </div>
        <CloseButton onClick={onClose}>
          <XIconSVG />
        </CloseButton>
      </TitleContainer>
      <Form onSubmit={onSubmit}>
        <InputBox>
          <Label htmlFor="coupon-name">쿠폰 이름</Label>
          <Input
            name="coupon_name"
            id="coupon-name"
            placeholder="쿠폰 이름"
            defaultValue={data?.name}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="coupon-code">쿠폰 코드</Label>
          <Input
            name="coupon_code"
            id="coupon-code"
            placeholder="쿠폰 코드"
            defaultValue={data?.code}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="coupon-reward">보상</Label>
          <Input
            name="coupon_reward"
            id="coupon-reward"
            placeholder="보상"
            defaultValue={data?.description}
          />
        </InputBox>
        <InputCheckBox>
          <Input
            onChange={checkHandler}
            type="checkbox"
            name="coupon_noExpiry"
            id="coupon-noExpiry"
            checked={noExpiry}
          ></Input>
          <Label htmlFor="coupon-noExpiry">이 쿠폰은 만료기한이 없습니다</Label>
        </InputCheckBox>
        {!noExpiry && (
          <InputBox>
            <Label htmlFor="coupon-expiresAt">만료일</Label>
            <Input
              type="datetime-local"
              name="coupon_expiresAt"
              min="2023-07-20T00:00"
              max="2100-01-01T23:59"
              placeholder=""
              defaultValue={noExpiry ? null : expiry}
            />
          </InputBox>
        )}
        <AddButtonBox>
          <AddButton type="submit">{text.button}</AddButton>
        </AddButtonBox>
      </Form>
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
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(224, 224, 224);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 28rem;
  max-height: calc(-2rem + 100vh);
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgb(224, 224, 224);
`;
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
`;
const SubTitle = styled.p`
  color: rgb(102, 102, 102);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
const CloseButton = styled.button`
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
const Form = styled.form`
  padding: 1rem;
`;
const InputBox = styled.div`
  margin-bottom: 1rem;
`;
const InputCheckBox = styled(InputBox)`
  display: flex;
  border: 1px solid rgb(224, 224, 224);
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  & > input {
    width: fit-content;
    margin-right: 1rem;
    line-height: 1rem;
  }
  & > label {
    margin: 0;
    color: rgb(102, 102, 102);
  }
`;
const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #000;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #fff;
  color: #000;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 0.375rem;
  font-size: 0.875rem;
`;
const AddButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid rgb(224, 224, 224);
`;
const AddButton = styled.button`
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
