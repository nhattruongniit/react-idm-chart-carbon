export default function optionChart(chartType, chartOptionTab, chartLabels) {
  let options = {
    legend: {
      alignment: 'center',
      enabled: chartOptionTab.options.legend,
    },
    tooltip: {
      enabled: chartOptionTab.options.tooltip,
      showTotal: chartOptionTab.options.tooltip,
    },
    height: '500px',
  };

  switch (chartType) {
    case 'pie': {
      options = {
        ...options,
        pie: {
          alignment: 'center',
        },

        color: {
          scale: {
            ...chartLabels,
          },
        },
      };
      break;
    }
    case 'line': {
      options = {
        ...options,
        axes: {
          bottom: {
            mapsTo: 'date',
            scaleType: 'time',
          },
          left: {
            mapsTo: 'value',
            scaleType: 'linear',
          },
        },
        color: {
          scale: {
            ...chartLabels,
          },
        },
        curve: 'curveMonotoneX',
      };
      break;
    }
    default:
      break;
  }

  return options;
}
