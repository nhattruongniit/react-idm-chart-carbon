import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Modal, Select, SelectItem } from 'carbon-components-react';

// mock api
import { pieChart, lineChart, variables } from 'mockData';

// components
import ControlCenterlPanel from './ControlCenterPanel';
import ChartCenterPanel from './ChartCenterPanel';
import VariablePanel from './VariablePanel';
import ButtonField from 'components/ButtonField';

// actions
import { fetchVariables } from 'reducer/variables.reducer';
import { fetchChart } from 'reducer/chart.reducer';

const ChartEditor = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState('pie');

  useEffect(() => {
    dispatch(fetchVariables(variables));
  }, [dispatch]);

  const onSubmit = () => {
    let dataChart = {};

    switch (type) {
      case 'pie': {
        dataChart = { ...pieChart };
        break;
      }
      case 'line': {
        dataChart = { ...lineChart };
        break;
      }
      default:
        break;
    }
    setIsOpen(false);
    dispatch(fetchChart(dataChart));
  };

  return (
    <div className="chartEditor">
      <ControlCenterlPanel />
      <ChartCenterPanel />
      <VariablePanel />

      <ModalStyled>
        <Modal open={isOpen} size="xs" passiveModal modalHeading="Please choose chart" onRequestClose={onSubmit}>
          <br />
          <Select light inline defaultValue={type} id="select-chart-type" labelText="Chart Type" onChange={(e) => setType(e.target.value)}>
            <SelectItem text="pie" value="pie" />
            <SelectItem text="line" value="line" />
          </Select>
          <ButtonStyled>
            <ButtonField kind="primary" text="Submit" onClick={onSubmit} />
          </ButtonStyled>
        </Modal>
      </ModalStyled>
    </div>
  );
};

export default ChartEditor;

const ModalStyled = styled.div`
  .bx--modal-content {
    margin-bottom: 10px;
  }
`;

const ButtonStyled = styled.div`
  text-align: right;
  margin-top: 20px;
`;
