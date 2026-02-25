import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  position: relative;
  height: calc(100vh - 80px);
  width: calc(100vh - 80px);
  max-width: 90vw;
  max-height: 90vw;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  -webkit-user-drag: none;
  user-select: none;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: #71C9CE;
  color: #fff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  line-height: 1;

  &:hover {
    background-color: #A6E3E9;
  }
`;

export const SkinLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(113, 201, 206, 0.85);
  color: #fff;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
`;
