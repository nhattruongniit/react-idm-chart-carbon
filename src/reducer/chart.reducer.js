// import * as chartEditor from 'api/chartEditor.api';

// TYPES
const FETCH_CHART_SUCCESS = 'CHART/FETCH_CHART_SUCCESS';

// ACTIONS

export const fetchChart = (data) => async (dispatch) => {
  dispatch({
    type: FETCH_CHART_SUCCESS,
    payload: data,
  });
};

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHART_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
};

export default reducer;
