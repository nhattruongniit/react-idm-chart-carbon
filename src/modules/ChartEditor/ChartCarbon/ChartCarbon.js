import React from 'react';
import { useSelector } from 'react-redux';
import '@carbon/charts/styles.css';

// components
import PieChart from './PieChart';
import LineChart from './LineChart';
// import LineChartCanvasJS from './LineChartCanvasJS';

// selectors
import { chartSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';
import ViolinPlotChart from './ViolinPlotChart';

const ChartCarbon = () => {
  const chart = useSelector(chartSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);

  return (
    <>
      {chart.type === 'pie' && <PieChart key={chartOptionTab.reRenderId} />}
      {chart.type === 'line' && <LineChart key={chartOptionTab.reRenderId} />}
      {chart.type === 'violinPlot' && <ViolinPlotChart key={chartOptionTab.reRenderId} chart={chart} />}
      {/* <LineChartCanvasJS /> */}
    </>
  );
};

export default ChartCarbon;
