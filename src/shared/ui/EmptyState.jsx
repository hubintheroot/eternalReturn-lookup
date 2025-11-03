import styled from 'styled-components';

/**
 * 확장 가능한 Empty State 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 메인 제목
 * @param {string} props.description - 설명 텍스트
 * @param {React.ReactNode} props.icon - 아이콘 또는 이미지 (선택)
 * @param {React.ReactNode} props.action - 액션 버튼 또는 추가 컴포넌트 (선택)
 * @param {string} props.variant - 스타일 변형 ('default', 'subtle', 'warning') (선택)
 * @param {Object} props.style - 추가 인라인 스타일 (선택)
 */
export default function EmptyState({
  title,
  description,
  icon,
  action,
  variant = 'default',
  style,
  className,
}) {
  return (
    <Container $variant={variant} style={style} className={className}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
      {action && <ActionWrapper>{action}</ActionWrapper>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  color: ${(props) => {
    switch (props.$variant) {
      case 'subtle':
        return 'rgba(255, 255, 255, 0.6)';
      case 'warning':
        return '#ffa500';
      default:
        return '#fff';
    }
  }};

  @media screen and (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  font-size: 2.5rem;
  opacity: 0.8;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 700;

  @media screen and (min-width: 480px) {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
  max-width: 500px;

  @media screen and (min-width: 480px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const ActionWrapper = styled.div`
  margin-top: 0.5rem;

  @media screen and (min-width: 768px) {
    margin-top: 1rem;
  }
`;
