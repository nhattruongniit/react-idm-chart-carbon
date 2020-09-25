import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// components
import ControlCenterlPanel from './ControlCenterPanel';
import ChartCenterPanel from './ChartCenterPanel';
import VariablePanel from './VariablePanel';

// actions
import { fetchVariables } from 'reducer/variables.reducer';
import { fetchChart } from 'reducer/chart.reducer';

const ChartEditor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVariables(9));
    dispatch(fetchChart());
  }, [dispatch]);

  return (
    <div className="chartEditor">
      <ControlCenterlPanel />
      <ChartCenterPanel />
      <VariablePanel />
    </div>
  );
};

export default ChartEditor;
