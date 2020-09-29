import { toast } from 'react-toastify';
import { fetchValuesForPieChart } from 'helpers';

import { setChartValues } from './chartValues.reducer';
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs.reducer';

// TYPES
const SET_FORM_VALUE_PIE = 'CHART_FORM/SET_FORM_VALUE_PIE';
const CLEAR_FORM = 'CHART_FORM/CLEAR_FORM';

// ACTIONS

export const submitForm = (formValues) => async (dispatch, getState) => {
  const { plottedVariable } = getState().variables;
  const chartType = getState().chart.type;
  let fetchValuesFn;

  if (plottedVariable.length === 0) {
    toast('Selected variables must have same type', {
      type: 'error',
    });
    return;
  }

  if (chartType === 'pie') {
    fetchValuesFn = fetchValuesForPieChart;
    dispatch({ type: SET_FORM_VALUE_PIE, payload: { formValues } });
  }

  const { chartValues, labels } = await fetchValuesFn(getState);

  dispatch(setChartValues(chartValues, labels));
};

export const clearForm = () => async (dispatch) => {
  dispatch({ type: CLEAR_FORM });
};

export const CHART_FORM_STEPS = ['daily', 'weekly', 'monthly'];

const initialState = {
  values: {
    // startDate: new Date(2001, 1, 1),
    // endDate: new Date(2002, 2, 2),
    startDate: '',
    endDate: '',
    maximumDatePoints: 0,
    steps: CHART_FORM_STEPS[0],
    maxDate: '',
    minDate: '',
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
