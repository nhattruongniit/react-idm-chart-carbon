import React from 'react';
import styled from 'styled-components';

// components
import CheckboxField from 'components/CheckboxField';

// actions
const VariablePanel = ({ variables, selectedPlotted, handleToggleVariable, checkboxName }) => {
  return (
    <VariableStyled>
      {variables.map((variable) => {
        return (
          <CheckboxField
            key={variable.id}
            id={`${checkboxName}-${variable.id.toString()}`}
            defaultChecked={selectedPlotted[variable.id]}
            labelText={variable.full_name}
            onClick={() => handleToggleVariable(variable.id)}
          />
        );
      })}
    </VariableStyled>
  );
};

export default VariablePanel;

const VariableStyled = styled.div`
  width: 100%;
  height: 65vh;
  overflow-y: auto;
  color: #5a6872;
  font-size: 14px;
  margin: 20px 0 15px 0;
  padding: 0 10px;

  & > div + div {
    margin-bottom: 5px;
  }
`;
