import React, { useRef } from 'react';
import { styled } from '@linaria/react';

interface BackDropProps {
  onCancel?: React.MouseEventHandler;
}

const BackdropStyled = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const BackDrop: React.FC<BackDropProps> = ({ onCancel, children }) => {
  const rootRef = useRef();

  const handleOutsideClick = (event) => {
    if (event.target === rootRef.current) {
      onCancel(event);
    }
  };

  return (
    <BackdropStyled ref={rootRef} onClick={handleOutsideClick}>
      {children}
    </BackdropStyled>
  );
};

export default BackDrop;
