import React from 'react';
import styled, { css } from 'styled-components';

// carbon core
import { Select, SelectItem } from 'carbon-components-react';

const pages = Array.from(String(12345), Number);

export default function SelectPage() {
  return (
    <ContainerStyled>
      <ArrowStyled>
        <ButtonStyled direction="left" type="button" />
      </ArrowStyled>
      <SelectStyled>
        <Select id="select-units" hideLabel light inline>
          {pages.map((page, idx) => (
            <SelectItem key={idx} value={page} text={page.toString()} />
          ))}
        </Select>
      </SelectStyled>
      <ArrowStyled>
        <ButtonStyled direction="right" type="button" />
      </ArrowStyled>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 150px;
  margin: 0 auto;
`;

const SelectStyled = styled.div`
  border-top: 1px solid #dfe3e6;
  border-bottom: 1px solid #dfe3e6;

  .bx--select,
  .bx--select-input__wrapper,
  .bx--select--light {
    width: 100%;
  }
  .bx--select-input {
    min-width: auto;
    width: 4rem;
    padding: 0 1rem;
    color: #3d70b2;
    font-weight: bold;
  }
  .bx--select__arrow {
    fill: #3d70b2;
  }
`;

const ArrowStyled = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dfe3e6;
  width: 40px;
  justify-content: center;
  cursor: pointer;
`;

const ButtonStyled = styled.button`
  border: solid #76818a;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  background-color: transparent;
  outline: 0;
  cursor: pointer;

  ${(props) =>
    props.direction === 'left' &&
    css`
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    `}

  ${(props) =>
    props.direction === 'right' &&
    css`
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    `}
`;
