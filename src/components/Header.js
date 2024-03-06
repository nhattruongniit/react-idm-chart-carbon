import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Select, SelectItem } from '@carbon/react';

// components
import Heading from './Heading';
import ButtonField from 'components/ButtonField';

// mock api
import { pieChart, lineChart, violinPlot } from 'mockData';

// actions
import { fetchChart } from 'reducer/chart.reducer';

export default function Header() {
  const dispatch = useDispatch();
  const [type, setType] = React.useState('pie');

  React.useEffect(() => {
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
      case 'violinPlot': {
        dataChart = { ...violinPlot };
        break;
      }
      default:
        break;
    }
    dispatch(fetchChart(dataChart));
  }, [type]);

  return (
    <HeaderStyled>
      <HeaderLogo>
        <Heading text="REACT CHART CARBON DESIGN" />
      </HeaderLogo>
      <div className="flex">
        <Select light inline defaultValue={type} id="select-chart-type" labelText="Chart Type" onChange={(e) => setType(e.target.value)}>
          <SelectItem text="violin plot" value="violinPlot" />
          <SelectItem text="pie" value="pie" />
          <SelectItem text="line" value="line" />
        </Select>
        <ButtonField kind="ghost" text="Reset Chart" onClick={() => window.location.reload()} />
      </div>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  padding: 0 5.5px;
  height: 67px;
  display: flex;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 10px #d9ebfd;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  padding-right: 5.5px;
  margin-right: 25px;
  display: flex;
  align-items: center;
  color: #5a6872;
  img {
    width: 42px;
    height: 46px;
    margin-right: 10px;
  }
`;
