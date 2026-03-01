import * as Styled from './EmptyState.styled';
export default function EmptyState({
  title,
  description,
  icon,
  action,
  variant = 'default',
  style,
  className
}) {
  return <Styled.Container $variant={variant} style={style} className={className}>
      {icon && <Styled.IconWrapper>{icon}</Styled.IconWrapper>}
      {title && <Styled.Title>{title}</Styled.Title>}
      {description && <Styled.Description>{description}</Styled.Description>}
      {action && <Styled.ActionWrapper>{action}</Styled.ActionWrapper>}
    </Styled.Container>;
}