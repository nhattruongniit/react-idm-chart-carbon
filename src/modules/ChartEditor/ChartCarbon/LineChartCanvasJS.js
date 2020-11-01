import React from 'react';
import CanvasJSReact from 'assets/canvasjs/canvasjs.react';

const {CanvasJSChart} = CanvasJSReact;

const LineChartCanvasJS = () => {

  const toogleDataSeries = e =>  {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else{
      e.dataSeries.visible = true;
    }
    // chart.render();
  }

  const dataLineChart = [
    {
      type: "line",
      showInLegend: true,
      name: "Total Visit",
      markerType: "square",
      xValueFormatString: "DD MMM, YYYY",
      color: "#F08080",
      dataPoints : [
        { x: 0, y: 96 },
        { x: 1, y: 99 },
        { x: 2, y: 101 },
        { x: 3, y: 104 },
        { x: 4, y: 102 },
        { x: 5, y: 100 },
        { x: 6, y: 103 },
        { x: 7, y: 106 },
        { x: 8, y: 109 },
        { x: 9, y: 109 }
      ]
    },
    {
      type: "line",
      showInLegend: true,
      name: "Unique Visit",
      lineDashType: "dash",
      dataPoints : [
        { x: 0, y: 500 },
        { x: 1, y: 503 },
        { x: 2, y: 123 },
        { x: 3, y: 53 },
        { x: 4, y: 203 },
        { x: 5, y: 402 },
        { x: 6, y: 230 },
        { x: 7, y: 504 },
        { x: 8, y: 345 },
        { x: 9, y: 564 }
      ]
    }
  ]

  const options = {
    animationEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title:{
      text: ""
    },
    axisX:{
      // valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    toolTip:{
      shared:true
    },
    legend:{
      cursor:"pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: dataLineChart
  }
  return (
    <CanvasJSChart options={options} />
  );
}

export default LineChartCanvasJS;
