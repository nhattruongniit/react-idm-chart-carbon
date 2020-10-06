import { createSelector } from 'reselect';

export const formValuesSelector = createSelector(
  (state) => state.chartForm,
  (chartForm) => chartForm.values,
);

export const formChartTypeSelector = createSelector(
  (state) => state.chartForm,
  (chartForm) => chartForm.chartType,
);
