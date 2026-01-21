import * as Styled from './EmptyState.styled';

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
    <Styled.Container $variant={variant} style={style} className={className}>
      {icon && <Styled.IconWrapper>{icon}</Styled.IconWrapper>}
      {title && <Styled.Title>{title}</Styled.Title>}
      {description && <Styled.Description>{description}</Styled.Description>}
      {action && <Styled.ActionWrapper>{action}</Styled.ActionWrapper>}
    </Styled.Container>
  );
}
