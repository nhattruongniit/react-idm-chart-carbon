import React from 'react';
import { useSelector } from 'react-redux';

// components
import PieChart from './PieChart';
import LineChart from './LineChart';
// import LineChartCanvasJS from './LineChartCanvasJS';

// selectors
import { chartSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';
// import ViolinPlotChart from './ViolinPlotChart';

const ChartCarbon = () => {
  const chart = useSelector(chartSelector);
  // const chartOptionTab = useSelector(chartOptionTabSelector);

  return (
    <>
      {chart.type === 'pie' && <PieChart />}
      {chart.type === 'line' && <LineChart />}
      {/* {chart.type === 'violinPlot' && <ViolinPlotChart key={chartOptionTab.reRenderId} chart={chart} />} */}
      {/* <LineChartCanvasJS /> */}
    </>
  );
};

export default ChartCarbon;
