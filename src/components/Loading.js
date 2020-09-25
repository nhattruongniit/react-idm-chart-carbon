import React from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Loading } from 'carbon-components-react';

const DefaultPage = ({ message }) => {
  return (
    <Portal>
      <WrapperStyled>
        {message && <MessageStyled>{message}</MessageStyled>}
        <Loading />
      </WrapperStyled>
    </Portal>
  );
};

export default DefaultPage;

const WrapperStyled = styled.div`
  z-index: 9999;
  .bx--loading-overlay {
    z-index: 9999;
  }
`;

const MessageStyled = styled.p`
  position: fixed;
  top: calc(50% + 50px);
  text-align: center;
  width: 100%;
`;
