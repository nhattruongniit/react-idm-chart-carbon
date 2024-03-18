import React from 'react';
import { useDispatch } from 'react-redux';

// module
import ChartEditor from 'modules/ChartEditor';

// components
// import Header from 'components/Header';

// mock api
import { pieChart, lineChart, violinPlot } from 'mockData';

// actions
import { fetchChart } from 'reducer/chart.reducer';

function App() {
  const [type] = React.useState('pie');
  const dispatch = useDispatch();

  React.useEffect(() => {
    let dataChart = {};

    switch (type) {
      case 'pie': {
        dataChart = { ...pieChart };
        break;
      }
      case 'line': {
        dataChart = { ...lineChart };
        break;
      }
      case 'violinPlot': {
        dataChart = { ...violinPlot };
        break;
      }
      default:
        break;
    }
    dispatch(fetchChart(dataChart));
  }, [type]);

  return (
    <>
      <div className="">
        {/* <Header /> */}
        <ChartEditor />
      </div>
    </>
  );
}

export default App;
