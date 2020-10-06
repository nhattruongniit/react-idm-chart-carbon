import React from 'react';
import { useSelector } from 'react-redux';
import '@carbon/charts/styles.css';

// components
import PieChart from './PieChart';
import LineChart from './LineChart';

// selectors
import { chartSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';

const ChartCarbon = () => {
  const chart = useSelector(chartSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);

  return (
    <>
      {chart.type === 'pie' && <PieChart key={chartOptionTab.reRenderId} />}
      {chart.type === 'line' && <LineChart key={chartOptionTab.reRenderId} />}
    </>
  );
};

export default ChartCarbon;
