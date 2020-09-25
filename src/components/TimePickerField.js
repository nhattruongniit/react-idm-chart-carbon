import React from 'react';
import styled from 'styled-components';

// carbon core
import { TimePicker } from 'carbon-components-react';

export default function TimePickerField({ id, labelText, placeholder, onChange }) {
  return (
    <TimeStyled>
      <TimePicker id={id} labelText={labelText} placeholder={placeholder} onChange={onChange} />
    </TimeStyled>
  );
}

const TimeStyled = styled.div`
  .bx--label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #152935;
  }
`;
