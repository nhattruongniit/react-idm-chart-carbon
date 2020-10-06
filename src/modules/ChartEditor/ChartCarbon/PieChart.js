import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@carbon/charts-react';

// helpers
import { optionChart } from 'helpers';

// selectors
import { chartSelector, chartValuesSelector, chartLabelsSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';

const PieChartCarbon = () => {
  const chart = useSelector(chartSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);
  const chartValues = useSelector(chartValuesSelector);
  const chartLabels = useSelector(chartLabelsSelector);
  const option = optionChart(chart.type, chartOptionTab, chartLabels);

  return <PieChart key={chartOptionTab.reRenderId} data={chartValues} options={option} />;
};

export default PieChartCarbon;
