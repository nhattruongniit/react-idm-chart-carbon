import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// carbon core
import { Search, SelectItem } from 'carbon-components-react';

// carbon icon
import CloseIcon from '@carbon/icons-react/es/close/16';

// components
import VariableList from './VariableList';
import SelectField from 'components/SelectField';

// actions
import { setFilter, resetFilter, togglePlottedVariable } from 'reducer/variables.reducer';

// selector
import { unitsSelector, variablesSelector, plottedVariablesSelector, selectedPlottedSelector } from 'selectors/variables.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';

const steps = ['all', 'detailed', 'timestep', 'hourly', 'daily', 'monthly', 'runperiod', 'environment', 'annual'];

const VariablePanel = () => {
  const dispatch = useDispatch();
  const units = useSelector(unitsSelector);
  const variables = useSelector(variablesSelector);
  const plottedVariables = useSelector(plottedVariablesSelector);
  const selectedPlotted = useSelector(selectedPlottedSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);

  const onSearch = (value) => {
    if (value.trim() === '') {
      dispatch(resetFilter());
      return;
    }
    dispatch(setFilter('keyword', value));
  };

  const onFilter = (e, type) => {
    const { value } = e.target;
    if (value === 'all') {
      dispatch(resetFilter());
      return;
    }
    dispatch(setFilter(type, e.target.value));
  };

  const handleToggleVariable = (variableId) => {
    dispatch(togglePlottedVariable(variableId));
  };

  return (
    <ContainerStyled>
      <HeaderStyled>
        <span>VARIABLES</span>
        <IconStyled>
          <CloseIcon fill="var(--cds-text-02,#525252)" />
        </IconStyled>
      </HeaderStyled>

      <FilterStyled>
        <SelectField id="select-variables-step" labelText="Step" width="40%" onChange={(e) => onFilter(e, 'step')}>
          {steps.map((step, idx) => (
            <SelectItem key={idx} value={step} text={step} />
          ))}
        </SelectField>
        <SelectField id="select-variables-units" labelText="Units" width="40%" onChange={(e) => onFilter(e, 'units')}>
          <SelectItem value="all" text="All" />
          {units.map((unit, idx) => (
            <SelectItem key={idx} value={unit} text={unit} />
          ))}
        </SelectField>
      </FilterStyled>
      <br />

      <Search labelText="" placeHolderText="Search" light onChange={(e) => onSearch(e.target.value)} />

      <VariableList
        key={chartOptionTab.id}
        variables={variables}
        plottedVariables={plottedVariables}
        selectedPlotted={selectedPlotted}
        handleToggleVariable={handleToggleVariable}
        checkboxName="variable-panel-checkbox"
      />
    </ContainerStyled>
  );
};

export default VariablePanel;

const ContainerStyled = styled.div`
  width: 430px;
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
  left: 10px;
  top: 0;
  cursor: pointer;
`;

const FilterStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;
