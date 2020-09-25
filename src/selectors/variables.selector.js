import { createSelector } from 'reselect';

export const variablesSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.variables,
);

export const unitsSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.units,
);

export const filterSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.filter,
);

export const plottedVariablesSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.plottedVariable,
);

export const selectedPlottedSelector = createSelector(
  (state) => state.variables,
  (variables) => variables.selectedPlottedVariable,
);
