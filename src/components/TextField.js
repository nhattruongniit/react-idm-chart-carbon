import React from 'react';
import styled, { css } from 'styled-components';

// carbon core
import { TextInput } from 'carbon-components-react';

export default function TextField({ id, value, labelText, width, hideLabel, ...props }) {
  return (
    <TextStyled width={width} hideLabel={hideLabel}>
      <TextInput light id={id} labelText={labelText} defaultValue={value} {...props} />
    </TextStyled>
  );
}

const TextStyled = styled.div`
  width: ${(props) => props.width || '100%'};

  ${(props) =>
    props.hideLabel &&
    css`
      .bx--label {
        opacity: 0;
      }
    `}

  .bx--label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #152935;
  }
`;
