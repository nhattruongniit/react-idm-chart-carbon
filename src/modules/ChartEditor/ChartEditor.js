import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// mock api
import { variables } from 'mockData';

// components
import ControlCenterlPanel from './ControlCenterPanel';
import ChartCenterPanel from './ChartCenterPanel';
import VariablePanel from './VariablePanel';

// actions
import { fetchVariables } from 'reducer/variables.reducer';

const ChartEditor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVariables(variables));
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
