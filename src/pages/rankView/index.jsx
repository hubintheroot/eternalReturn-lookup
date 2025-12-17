import * as Styled from './rankView.styled';
import SeasonBox from "@/features/season-display/ui/SeasonBox";

export default function RankView() {
  // TODO: canvas로 랭크 점수에 따른 티어를 표로 정리할 수 있나?
  // 점수를 입력하고 목표 티어까지의 점수를 계산하는 것 만들어보기
  // 기초 데이터는 supabase에다가 직접 입력해둘 것

  return (
    <Styled.Section>
      <SeasonBox />
    </Styled.Section>
  );
}
