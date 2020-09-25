import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// components
import CheckboxField from 'components/CheckboxField';

import { plottedVariablesSelector } from 'selectors/variables.selector';

const PlottedVariableList = () => {
  const plottedVariables = useSelector(plottedVariablesSelector);

  return (
    <>
      <TitleStyled>Selected Variables / Sections</TitleStyled>
      <SelectedStyled>
        {plottedVariables.map((variable, idx) => (
          <CheckboxField
            key={idx}
            id={`section-${variable.id.toString()}`}
            labelText="Environment:Site Outdoor Air Drybulb Temperature [C](Hourly) utdoor Air Drybulb Temperature [C](Hourly)"
            defaultChecked
            disabled
            onClick={() => console.log('click')}
            bgColor={variable.bgColor}
            color="#fff"
            textEllipsis
          />
        ))}
      </SelectedStyled>
    </>
  );
};

export default PlottedVariableList;

const TitleStyled = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #152935;
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: 56vh;
  overflow-y: auto;
  color: #5a6872;
  font-size: 14px;
  margin: 20px 0 15px 0;
  padding-right: 10px;
`;
