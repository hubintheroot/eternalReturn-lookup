import { keyframes } from 'styled-components';

// Toast animations - Desktop
export const slideUpPC = keyframes`
  from {
    transform: translateY(1em);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideDownPC = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(1em);
    opacity: 0;
  }
`;

// Toast animations - Mobile
export const slideUpMB = keyframes`
  from {
    transform: translate(-50%, 1em);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 0;
  }
`;

export const slideDownMB = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 1em);
    opacity: 1;
  }
`;

// General animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
