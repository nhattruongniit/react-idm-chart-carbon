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
