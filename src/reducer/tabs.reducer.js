import _ from 'lodash';


// mock api
import { variables } from 'mockData';

import { fetchVariables } from './variables.reducer';

// TYPES
const ADD_TAB = 'TABS/ADD_TAB';
const CLOSE_TAB = 'TABS/CLOSE_TAB';
const SET_ACTIVE_TAB = 'TABS/SET_ACTIVE_TAB';
const SET_TAB_OPTION = 'TABS/SET_TAB_OPTION';
const SAVE_STATE_DATA = 'TABS/SAVE_STATE_DATA';

export const LOAD_INITIAL_STATE = 'TABS/LOAD_INITIAL_STATE';
export const RESTORE_STATE = 'TABS/RESTORE_STATE';

// ACTIONS

export function loadInitialState() {
  return {
    type: LOAD_INITIAL_STATE,
  };
}

const getAllState = (getState) => {
  const { variables, chart, chartForm, chartValues } = getState();
  const saveState = {
    variables,
    chart,
    chartForm,
    chartValues,
  };

  return saveState;
};

export const addTab = () => (dispatch, getState) => {
  const currentTabId = getState().tabs.activeTabId;
  const saveState = getAllState(getState);

  dispatch({ type: SAVE_STATE_DATA, payload: { tabId: currentTabId, saveState } });
  dispatch({ type: ADD_TAB });
  dispatch({ type: LOAD_INITIAL_STATE });
  dispatch(fetchVariables(variables));
};

export const switchTab = (tabId) => (dispatch, getState) => {
  const tab = getState().tabs.tabById[tabId];
  const currentTabId = getState().tabs.activeTabId;
  const saveState = getAllState(getState);

  dispatch({ type: SAVE_STATE_DATA, payload: { tabId: currentTabId, saveState } });
  dispatch({ type: SET_ACTIVE_TAB, payload: { tabId } });
  dispatch({ type: RESTORE_STATE, payload: tab.state });
};

export const closeTab = (tabId) => (dispatch, getState) => {
  let nextActiveTabId = null;
  const tabIndex = getState().tabs.tabArray.indexOf(tabId);

  if (tabIndex > 0) {
    nextActiveTabId = getState().tabs.tabArray[tabIndex - 1];
  }

  if (!nextActiveTabId) return;

  const nextTab = getState().tabs.tabById[nextActiveTabId];

  dispatch({ type: SET_ACTIVE_TAB, payload: { tabId: nextActiveTabId } });
  dispatch({ type: CLOSE_TAB, payload: { tabId } });
  dispatch({ type: RESTORE_STATE, payload: nextTab.state });
};

export function setTabOption(tabId, optionName, value) {
  return {
    type: SET_TAB_OPTION,
    payload: { tabId, optionName, value },
  };
}

// REDUCER
const initialState = {
  tabArray: [999],
  tabById: {
    999: {
      id: 999,
      name: 'Tab 1',
      reRenderId: 1, // use to reRender
      state: {},
      options: {
        legend: true,
        tooltip: true,
      },
    },
  },
  activeTabId: 999,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TAB: {
      const id = Number(_.uniqueId());
      const name = `Tab ${id + 1}`;
      return {
        ...state,
        activeTabId: id,
        tabArray: [...state.tabArray, id],
        tabById: {
          ...state.tabById,
          [id]: {
            id,
            name,
            state: {},
            options: {
              legend: true,
              tooltip: true,
            },
          },
        },
      };
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTabId: payload.tabId,
      };
    }
    case CLOSE_TAB: {
      const { tabId } = payload;
      delete state.tabById[tabId];

      return {
        ...state,
        tabArray: state.tabArray.filter((id) => id !== tabId),
        tabById: { ...state.tabById },
      };
    }
    case SET_TAB_OPTION: {
      const { tabId, optionName, value } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            reRenderId: Date.now(),
            options: {
              ...state.tabById[tabId].options,
              [optionName]: value,
            },
          },
        },
      };
    }
    case SAVE_STATE_DATA: {
      const { tabId, saveState } = payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            state: saveState,
          },
        },
      };
    }
    default:
      return state;
  }
}
