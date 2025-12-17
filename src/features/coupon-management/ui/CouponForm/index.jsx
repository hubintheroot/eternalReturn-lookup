import { useEffect, useState } from 'react';
import * as Styled from './CouponForm.styled';
import { XIconSVG } from '@/shared/ui/SVG';
import { formatDate } from '@/shared/lib/utils';

export default function CouponForm({ text, onSubmit, onClose, data }) {
  const [noExpiry, setNoExpiry] = useState(data?.expires_at ? false : true);
  const [expiry, setExpiry] = useState(
    data?.expires_at
      ? formatDate(new Date(data.expires_at))
      : formatDate(new Date())
  );

  useEffect(() => {
    setExpiry(
      data?.expires_at
        ? formatDate(new Date(data.expires_at))
        : formatDate(new Date())
    );
  }, [noExpiry, data]);

  const checkHandler = () => {
    setNoExpiry(!noExpiry);
  };

  return (
    <Styled.Container>
      <Styled.TitleContainer>
        <div>
          <Styled.Title>{text.title}</Styled.Title>
          <Styled.SubTitle>{text.sub}</Styled.SubTitle>
        </div>
        <Styled.CloseButton onClick={onClose}>
          <XIconSVG />
        </Styled.CloseButton>
      </Styled.TitleContainer>
      <Styled.Form onSubmit={onSubmit}>
        <Styled.InputBox>
          <Styled.Label htmlFor="coupon-name">쿠폰 이름</Styled.Label>
          <Styled.Input
            name="coupon_name"
            id="coupon-name"
            placeholder="쿠폰 이름"
            defaultValue={data?.name}
          />
        </Styled.InputBox>
        <Styled.InputBox>
          <Styled.Label htmlFor="coupon-code">쿠폰 코드</Styled.Label>
          <Styled.Input
            name="coupon_code"
            id="coupon-code"
            placeholder="쿠폰 코드"
            defaultValue={data?.code}
          />
        </Styled.InputBox>
        <Styled.InputBox>
          <Styled.Label htmlFor="coupon-reward">보상</Styled.Label>
          <Styled.Input
            name="coupon_reward"
            id="coupon-reward"
            placeholder="보상"
            defaultValue={data?.description}
          />
        </Styled.InputBox>
        <Styled.InputCheckBox>
          <Styled.Input
            onChange={checkHandler}
            type="checkbox"
            name="coupon_noExpiry"
            id="coupon-noExpiry"
            checked={noExpiry}
          ></Styled.Input>
          <Styled.Label htmlFor="coupon-noExpiry">이 쿠폰은 만료기한이 없습니다</Styled.Label>
        </Styled.InputCheckBox>
        {!noExpiry && (
          <Styled.InputBox>
            <Styled.Label htmlFor="coupon-expiresAt">만료일</Styled.Label>
            <Styled.Input
              type="datetime-local"
              name="coupon_expiresAt"
              min="2023-07-20T00:00"
              max="2100-01-01T23:59"
              placeholder=""
              defaultValue={noExpiry ? null : expiry}
            />
          </Styled.InputBox>
        )}
        <Styled.AddButtonBox>
          <Styled.AddButton type="submit">{text.button}</Styled.AddButton>
        </Styled.AddButtonBox>
      </Styled.Form>
    </Styled.Container>
  );
}
