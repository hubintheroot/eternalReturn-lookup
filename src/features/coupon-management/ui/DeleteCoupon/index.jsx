import * as Styled from './DeleteCoupon.styled';
import { getCoupons, supabase } from '@/shared/api/supabase';
import { couponSort, formatDate } from '@/shared/lib/utils';
import Button from '@/shared/ui/Button';
import { XIconSVG } from '@/shared/ui/SVG';

async function del(id) {
  try {
    const { error } = await supabase().from('Coupons').delete().eq('id', id);
    if (error) throw error;

    const coupons = await getCoupons();

    return { ok: true, data: couponSort(coupons.data) };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('delete coupon error:', err);
    }
    return { ok: false, data: null };
  }
}

export default function DeleteCoupon({ handler, onClose, data }) {
  const deleteCoupon = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const res = await del(data.id);
      if (res.ok) {
        handler.toast.success('쿠폰이 삭제되었습니다.');
        handler.setData(res.data);
      } else {
        handler.toast.failed('알 수 없는 에러가 발생했습니다.');
      }
      onClose();
    }
  };
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.CloseBox>
          <Button eventHandler={onClose}>
            <XIconSVG />
          </Button>
        </Styled.CloseBox>
        <h2>쿠폰 정보</h2>
        <p>삭제할 쿠폰 정보를 조회합니다.</p>
      </Styled.Header>
      <div>
        <Styled.InfoBox>
          <Styled.Info>
            <Styled.SubTitle>쿠폰코드</Styled.SubTitle>
            <Styled.Text>{data.code}</Styled.Text>
          </Styled.Info>
          <Styled.Info>
            <Styled.SubTitle>보상</Styled.SubTitle>
            <Styled.Text>{data.description}</Styled.Text>
          </Styled.Info>
          <Styled.Info>
            <Styled.SubTitle>만료일</Styled.SubTitle>
            <Styled.Text>
              {data.expires_at
                ? formatDate(new Date(data.expires_at), true)
                : '영구'}
            </Styled.Text>
          </Styled.Info>
        </Styled.InfoBox>
        <Styled.DeleteBox>
          <Button
            eventHandler={deleteCoupon}
            text={'제거하기'}
            color={'#fff'}
            hoverColor={'none'}
            backgroundColor={'#000'}
            hoverBackgroundColor={'rgb(51, 51, 51)'}
            display={'block'}
          />
        </Styled.DeleteBox>
      </div>
    </Styled.Container>
  );
}
