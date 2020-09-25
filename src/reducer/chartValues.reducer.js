import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs.reducer';

// TYPES
const SET_CHART_VALUES = 'CHART/SET_CHART_VALUES';

// ACTIONS

export const setChartValues = (chartValues, labels) => async (dispatch) => {
  // const response = await chartEditor.fetchSingleChart(chartId);
  // const chart = response.data.data;

  dispatch({
    type: SET_CHART_VALUES,
    payload: { chartValues, labels },
  });
};

const initialState = {
  chartValues: [],
  labels: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CHART_VALUES: {
      return {
        ...state,
        chartValues: payload.chartValues,
        labels: payload.labels,
      };
    }
    case RESTORE_STATE: {
      if (payload.chartValues) return payload.chartValues;
      return state;
    }
    case LOAD_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
