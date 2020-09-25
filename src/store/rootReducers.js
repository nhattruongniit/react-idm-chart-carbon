import { combineReducers } from 'redux';

// reducers
import variablesReducer from 'reducer/variables.reducer';
import tabsReducer from 'reducer/tabs.reducer';
import chartReducer from 'reducer/chart.reducer';
import chartFormReducer from 'reducer/chartForm.reducer';
import chartValuesReducer from 'reducer/chartValues.reducer';

const reducers = combineReducers({
  variables: variablesReducer,
  tabs: tabsReducer,
  chart: chartReducer,
  chartForm: chartFormReducer,
  chartValues: chartValuesReducer,
});

export default reducers;
