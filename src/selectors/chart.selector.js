import { createSelector } from 'reselect';

export const chartSelector = (state) => state.chart;

export const chartValuesSelector = createSelector(
  (state) => state.chartValues,
  (chartValues) => chartValues.chartValues,
);

export const chartLabelsSelector = createSelector(
  (state) => state.chartValues,
  (chartValues) => chartValues.labels,
);

export const activePageSelector = createSelector(
  (state) => state.chartValues,
  (chartValues) => chartValues.activePage,
);

export const chartTypeSelector = createSelector(
  (state) => state.chart,
  (chart) => chart.type,
);
