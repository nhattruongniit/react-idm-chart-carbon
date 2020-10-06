import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs.reducer';

// TYPES
const SET_CHART_VALUES = 'CHART/SET_CHART_VALUES';
const SET_ACTIVE_PAGE = 'CHART_VALUES/SET_ACTIVE_PAGE';

// ACTIONS

export const setChartValues = (chartValues, labels) => async (dispatch) => {
  dispatch({
    type: SET_CHART_VALUES,
    payload: { chartValues, labels },
  });
};

export function setActivePage(activePage) {
  return {
    type: SET_ACTIVE_PAGE,
    payload: {
      activePage,
    },
  };
}

const initialState = {
  chartValues: [],
  labels: {},
  activePage: 0,
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
    case SET_ACTIVE_PAGE: {
      return {
        ...state,
        activePage: payload.activePage,
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
