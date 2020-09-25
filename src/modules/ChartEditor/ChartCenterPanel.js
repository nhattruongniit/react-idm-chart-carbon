import React from 'react';

// components
import ChartTab from './ChartTab';
import ChartCarbon from './ChartCarbon';

const ChartCenterPanel = () => {
  return (
    <ChartTab>
      <ChartCarbon />
    </ChartTab>
  );
};

export default ChartCenterPanel;
