import React from 'react';
import styled, { css } from 'styled-components';

// carbon core
import { Checkbox } from 'carbon-components-react';

const CheckboxField = ({ id, labelText, onChange, bgColor, color, textEllipsis = false, ...props }) => {
  return (
    <CheckStyled bgColor={bgColor} color={color} textEllipsis={textEllipsis}>
      <Checkbox id={id} labelText={labelText} onChange={onChange} {...props} />
    </CheckStyled>
  );
};

export default CheckboxField;

const CheckStyled = styled.div`
  background-color: ${(props) => props.bgColor || '#fff'};

  .bx--form-item {
    overflow: hidden;
    width: 100%;
  }
  .bx--checkbox-label {
    width: 100%;
    padding-left: 28px;
  }
  .bx--checkbox-label-text {
    color: ${(props) => props.color || 'var(--cds-text-01, #152935)'};
    width: 100%;
    display: block;

    ${(props) =>
      props.textEllipsis &&
      css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `}
  }

  .bx--checkbox:checked + .bx--checkbox-label::before,
  .bx--checkbox:indeterminate + .bx--checkbox-label::before,
  .bx--checkbox-label[data-contained-checkbox-state='true']::before,
  .bx--checkbox-label[data-contained-checkbox-state='mixed']::before {
    background-color: #3d70b2;
    border-color: #3d70b2;
    border-width: 1px;
    box-shadow: 0 0 0 0 transparent;
  }
  .bx--checkbox:focus + .bx--checkbox-label::before,
  .bx--checkbox-label__focus::before,
  .bx--checkbox:checked:focus + .bx--checkbox-label::before,
  .bx--checkbox-label[data-contained-checkbox-state='true'].bx--checkbox-label__focus::before,
  .bx--checkbox:indeterminate:focus + .bx--checkbox-label::before,
  .bx--checkbox-label[data-contained-checkbox-state='mixed'].bx--checkbox-label__focus::before {
    box-shadow: 0 0 0 0 transparent;
  }
  .bx--form-item.bx--checkbox-wrapper:first-of-type,
  .bx--form-item.bx--checkbox-wrapper:last-of-type {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
