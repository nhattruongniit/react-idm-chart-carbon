import React from 'react';
import { useSelector } from 'react-redux';
import '@carbon/charts/styles.css';

import { PieChart, LineChart } from '@carbon/charts-react';

// mock data
import { dataLineChart } from 'mockData';

// helpers
import { optionChart } from 'helpers';

// selectors
import { chartSelector, chartValuesSelector, chartLabelsSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';

const ChartCarbon = () => {
  const chart = useSelector(chartSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);
  const chartValues = useSelector(chartValuesSelector);
  const chartLabels = useSelector(chartLabelsSelector);
  const option = optionChart(chart.type, chartOptionTab, chartLabels);

  return (
    <>
      {chart.type === 'pie' && <PieChart key={chartOptionTab.reRenderId} data={chartValues} options={option} />}
      {chart.type === 'line' && <LineChart key={chartOptionTab.reRenderId} data={dataLineChart} options={option} />}
    </>
  );
};

export default ChartCarbon;
