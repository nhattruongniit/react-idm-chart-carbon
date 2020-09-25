import React from 'react';
import { useSelector } from 'react-redux';
import '@carbon/charts/styles.css';

import { PieChart } from '@carbon/charts-react';

// selectors
import { chartSelector, chartValuesSelector, chartLabelsSelector } from 'selectors/chart.selector';
import { chartOptionTabSelector } from 'selectors/tabs.selector';

// data of pie chart
// const chartValues = [
//   {
//     group: 'Qty',
//     value: 65000,
//   },
//   {
//     group: 'More',
//     value: 29123,
//   },
//   {
//     group: 'Sold',
//     value: 35213,
//   },
//   {
//     group: 'Restocking',
//     value: 51213,
//   },
//   {
//     group: 'Misc',
//     value: 16932,
//   },
// ];

const ChartCarbon = () => {
  const chart = useSelector(chartSelector);
  const chartOptionTab = useSelector(chartOptionTabSelector);
  const chartValues = useSelector(chartValuesSelector);
  const chartLabels = useSelector(chartLabelsSelector);

  let options = {
    legend: {
      alignment: 'center',
    },
  };

  const renderOption = () => {
    if (chart.type === 'pie') {
      options = {
        ...options,
        legend: {
          ...options.legend,
          enabled: chartOptionTab.options.legend,
        },
        tooltip: {
          enabled: chartOptionTab.options.tooltip,
          showTotal: chartOptionTab.options.tooltip,
        },
        pie: {
          alignment: 'center',
        },
        height: '500px',
        color: {
          scale: {
            ...chartLabels,
          },
        },
      };
    }

    return options;
  };

  return <>{chart.type === 'pie' && <PieChart key={chartOptionTab.reRenderId} data={chartValues} options={renderOption()} />}</>;
};

export default ChartCarbon;
