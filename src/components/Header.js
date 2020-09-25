import React from 'react';
import styled from 'styled-components';

// components
import Heading from './Heading';

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderLogo>
        <Heading text="REACT CHART CARBON DESIGN" />
      </HeaderLogo>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  height: 67px;
  display: flex;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 10px #d9ebfd;
`;

const HeaderLogo = styled.div`
  padding-left: 5.5px;
  padding-right: 5.5px;
  margin-right: 25px;
  display: flex;
  align-items: center;
  color: #5a6872;
  img {
    width: 42px;
    height: 46px;
    margin-right: 10px;
  }
`;
