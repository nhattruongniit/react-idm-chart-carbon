import { createSelector } from 'reselect';

const tabByIdSelector = (state) => state.tabs.tabById;
const tabArraySelector = (state) => state.tabs.tabArray;
export const activeTabIdSelector = (state) => state.tabs.activeTabId;

export const tabsSelector = createSelector(tabByIdSelector, tabArraySelector, (tabById, tabArray) => tabArray.map((id) => tabById[id]));

export const chartOptionTabSelector = createSelector(tabByIdSelector, activeTabIdSelector, (tabById, activeTabId) => tabById[activeTabId]);
