import React from 'react';
import styled from 'styled-components';

export default function Heading({ text }) {
  return <ContainerStyled>{text}</ContainerStyled>;
}

const ContainerStyled = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--cds-text-02, #525252);
  margin-right: 35px;
`;
