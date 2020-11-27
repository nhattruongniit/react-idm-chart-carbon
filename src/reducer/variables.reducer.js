// libs
import { uniq } from 'lodash';
import chroma from 'chroma-js';

// helpers
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs.reducer';

// TYPES
const FETCH_VARIABLES_START = 'VARIABLES/FETCH_VARIABLES_START';
const FETCH_VARIABLES_SUCCESS = 'VARIABLES/FETCH_VARIABLES_SUCCESS';
const SET_UNITS = 'VARIABLES/SET_UNITS';
const SET_FITLER_VARIABLE = 'VARIABLES/SET_FITLER_VARIABLE';
const RESET_FILTER_VARIABLE = 'VARIABLES/RESET_FILTER_VARIABLE';
const TOGGLE_PLOTTED_VARIABLE = 'VARIABLES/TOGGLE_PLOTTED_VARIABLE';

// ACTIONS
const fetchMock = async (data) => new Promise((resovle) => setTimeout(resovle(data), 3000));

export const fetchVariables = (variables) => async (dispatch) => {
  const res = await fetchMock(variables);

  console.log(res)

  const units = uniq(res.map((item) => item.units));
  dispatch({ type: FETCH_VARIABLES_START });

  dispatch({ type: SET_UNITS, payload: { units } });
  dispatch({ type: FETCH_VARIABLES_SUCCESS, payload: res });
};

export const setFilter = (type, value) => (dispatch) => {
  dispatch({
    type: SET_FITLER_VARIABLE,
    payload: {
      type,
      value,
    },
  });
};

export const resetFilter = () => (dispatch) => {
  dispatch({ type: RESET_FILTER_VARIABLE });
};

export const togglePlottedVariable = (variableId) => (dispatch, getState) => {
  const { plottedVariable, variables, selectedPlottedVariable } = getState().variables;
  const variable = variables.filter((item) => item.id === variableId)[0];

  let newPlotted = [...plottedVariable];
  let newSelectedPlotted = { ...selectedPlottedVariable };
  const isExists = newPlotted.findIndex((item) => item.id === variableId);

  if (isExists >= 0) {
    newPlotted.splice(isExists, 1);
    delete newSelectedPlotted[variableId];
  } else {
    newPlotted = [
      ...newPlotted,
      {
        ...variable,
        bgColor: chroma.random().hex(),
      },
    ];
    newSelectedPlotted = {
      ...selectedPlottedVariable,
      [variableId]: true,
    };
  }

  dispatch({ type: TOGGLE_PLOTTED_VARIABLE, payload: { newPlotted, newSelectedPlotted } });
};

// reducer
const initialState = {
  defaultVariables: [],
  variables: [],
  units: [],
  filter: {},
  plottedVariable: [],
  selectedPlottedVariable: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_VARIABLES_START: {
      return {
        ...state,
        defaultVariables: [],
        variables: [],
      };
    }
    case FETCH_VARIABLES_SUCCESS: {
      return {
        ...state,
        defaultVariables: payload,
        variables: payload,
      };
    }
    case SET_UNITS: {
      return {
        ...state,
        units: payload.units,
      };
    }
    case SET_FITLER_VARIABLE: {
      const variables = state.defaultVariables.filter((variable) => {
        let match = true;
        if (payload.type === 'step' && variable.type.toLowerCase() !== payload.value.toLowerCase()) {
          match = false;
        }
        if (payload.type === 'units' && variable.units.toLowerCase() !== payload.value.toLowerCase()) {
          match = false;
        }
        if (payload.type === 'keyword' && variable.full_name.toLowerCase().indexOf(payload.value.toLowerCase()) === -1) {
          match = false;
        }
        return match;
      });

      return {
        ...state,
        variables,
        filter: {
          ...state.filter,
          [payload.type]: payload.value,
        },
      };
    }
    case RESET_FILTER_VARIABLE: {
      return {
        ...state,
        variables: state.defaultVariables,
      };
    }
    case TOGGLE_PLOTTED_VARIABLE: {
      return {
        ...state,
        plottedVariable: payload.newPlotted,
        selectedPlottedVariable: payload.newSelectedPlotted,
      };
    }
    case RESTORE_STATE: {
      if (payload.variables) {
        return {
          ...state,
          defaultVariables: payload.variables.defaultVariables,
          variables: payload.variables.variables,
          selectedPlottedVariable: payload.variables.selectedPlottedVariable,
          plottedVariable: payload.variables.plottedVariable,
        };
      }
      return state;
    }
    case LOAD_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
