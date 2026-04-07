import type { ReactNode, CSSProperties } from 'react';
import * as Styled from './EmptyState.styled';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'subtle' | 'warning';
  style?: CSSProperties;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  variant = 'default',
  style,
  className
}: EmptyStateProps) {
  return <Styled.Container $variant={variant} style={style} className={className}>
      {icon && <Styled.IconWrapper>{icon}</Styled.IconWrapper>}
      {title && <Styled.Title>{title}</Styled.Title>}
      {description && <Styled.Description>{description}</Styled.Description>}
      {action && <Styled.ActionWrapper>{action}</Styled.ActionWrapper>}
    </Styled.Container>;
}
