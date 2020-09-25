import React from 'react';
import styled from 'styled-components';

// carbon core
import { Select } from 'carbon-components-react';

export default function SelectField({ id, labelText, children, width, onChange }) {
  return (
    <SelectStyled width={width}>
      <Select light id={id} labelText={labelText} onChange={onChange}>
        {children}
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.div`
  width: ${(props) => props.width || '100%'};

  .bx--label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #152935;
  }
  .bx--select-input {
    text-transform: capitalize;
  }
  .bx--select,
  .bx--select-input__wrapper {
    width: 100%;
  }
`;
