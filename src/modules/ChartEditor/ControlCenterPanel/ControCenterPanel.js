import React from 'react';
import styled from 'styled-components';

// carbon icon
import CloseIcon from '@carbon/icons-react/es/close/16';

// components

import PlottedVariableList from './PlottedVariableList';
import ChartForm from './ChartForm';

const ControlCenterPanel = () => {
  return (
    <ContainerStyled>
      <HeaderStyled>
        <span>CONTROL CENTRE</span>
        <IconStyled>
          <CloseIcon fill="var(--cds-text-02,#525252)" />
        </IconStyled>
      </HeaderStyled>

      <ChartForm />

      <HrStyled />

      <PlottedVariableList />
    </ContainerStyled>
  );
};

export default ControlCenterPanel;

const ContainerStyled = styled.div`
  width: 440px;
  height: 100%;
  padding: 20px 15px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 2px 2px 10px #d9ebfd;
  z-index: 1;
`;

const HeaderStyled = styled.div`
  position: relative;
  text-align: center;
  text-transform: capitalize;
  color: #5a6872;
  padding-bottom: 30px;
`;

const IconStyled = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  cursor: pointer;
`;

const HrStyled = styled.div`
  margin: 20px -15px;
  border-top: 1px solid #cfd0d1;
`;
