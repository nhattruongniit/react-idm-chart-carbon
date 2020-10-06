import { toast } from 'react-toastify';
import { fetchValuesForPieChart, fetchValuesForLineChart } from 'helpers';

import { setChartValues } from './chartValues.reducer';
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs.reducer';

// configs
import * as CONSTANTS from 'configs/constant';

// TYPES
const SET_VALUE = 'CHART_FORM/SET_VALUE';
const SET_FORM_VALUE_PIE = 'CHART_FORM/SET_FORM_VALUE_PIE';
const CLEAR_FORM = 'CHART_FORM/CLEAR_FORM';

// ACTIONS
export function setValue(fieldName, value) {
  return {
    type: SET_VALUE,
    payload: {
      fieldName,
      value,
    },
  };
}

export const submitForm = (formValues) => async (dispatch, getState) => {
  const { plottedVariable } = getState().variables;
  const chartType = getState().chart.type;
  let fetchValuesFn = null;

  if (plottedVariable.length === 0) {
    toast('Selected variables must have same type', {
      type: 'error',
    });
    return;
  }

  switch (chartType) {
    case 'pie': {
      fetchValuesFn = fetchValuesForPieChart;
      dispatch({ type: SET_FORM_VALUE_PIE, payload: { formValues } });
      break;
    }
    case 'line': {
      fetchValuesFn = fetchValuesForLineChart;
      break;
    }
    default:
      break;
  }

  if (typeof fetchValuesFn !== 'function') return;

  const { chartValues, labels } = await fetchValuesFn(getState);

  dispatch(setChartValues(chartValues, labels));
};

export const clearForm = () => async (dispatch) => {
  dispatch({ type: CLEAR_FORM });
};

const initialState = {
  values: {
    startDate: '2001-01-21T00:00:00.000Z',
    endDate: '2001-07-21T00:00:00.000Z',
    maximumDatePoints: CONSTANTS.CHART_FORM_POINTS[0],
    steps: CONSTANTS.CHART_FORM_STEPS[0],
    maxDate: '21/07/2001',
    minDate: '21/01/2001',
    date: '',
    month: '',
    hour: '',
    minute: '',
  },
  isSubmitting: false,
  error: '',
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_VALUE: {
      const { fieldName, value } = payload;
      return {
        ...state,
        values: {
          ...state.values,
          [fieldName]: value,
        },
      };
    }

    case SET_FORM_VALUE_PIE: {
      const { formValues } = payload;
      return {
        ...state,
        values: {
          ...state.values,
          date: formValues.date || '',
          month: formValues.month || '',
          hour: formValues.hour || '',
          minute: formValues.minute || '',
        },
      };
    }
    case CLEAR_FORM: {
      return initialState;
    }
    case RESTORE_STATE: {
      if (payload.chartForm) {
        return payload.chartForm;
      }
      return state;
    }
    case LOAD_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
}
