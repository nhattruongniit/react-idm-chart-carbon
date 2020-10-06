import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart } from '@carbon/charts-react';

// components
import SelectPage from 'components/SelectPage';

// helpers
import { optionChart } from 'helpers';

// selectors
import { chartSelector, chartValuesSelector, chartLabelsSelector, activePageSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';

// actions
import { setActivePage } from 'reducer/chartValues.reducer';

const LineChartCarbon = () => {
  const dispatch = useDispatch();
  const chart = useSelector(chartSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);
  const chartValues = useSelector(chartValuesSelector);
  const chartLabels = useSelector(chartLabelsSelector);
  const activePage = useSelector(activePageSelector);
  const option = optionChart(chart.type, chartOptionTab, chartLabels);

  const pageLabel = chartValues.length > 0 && chartValues[activePage] && chartValues[activePage].name;
  const totalPages = chartValues.length;
  const chartValuesLineChart = (chartValues && chartValues[activePage]) || { chartData: [] };

  const handleActivePage = (number) => {
    dispatch(setActivePage(number));
  };

  return (
    <>
      {chartValuesLineChart.chartData.length > 0 && (
        <LineContainerStyled>
          <LineChart key={chartOptionTab.reRenderId} data={chartValuesLineChart.chartData} options={option} />
          <div className="pagination">
            <SelectPage activePage={activePage} pageLabel={pageLabel} setActivePage={handleActivePage} totalPages={totalPages} />
          </div>
        </LineContainerStyled>
      )}
    </>
  );
};

export default LineChartCarbon;

const LineContainerStyled = styled.div`
  width: 100%;
`;
