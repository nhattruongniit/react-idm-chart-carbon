/* eslint default-case: "off" */
/* eslint no-loop-func: "off" */

// mock api
import { dataVariableLineChart } from 'mockData';

// libs
import cloneDeep from 'lodash/cloneDeep';

export function getSelectedVariables(getState) {
  const { plottedVariable, selectedPlottedVariable } = getState().variables;
  const result = Object.keys(selectedPlottedVariable)
    .filter((variableId) => {
      return variableId && selectedPlottedVariable[variableId] === true;
    })
    .map((variableId) => {
      const variable = plottedVariable.find((variable) => String(variable.id) === variableId);
      return cloneDeep(variable);
    });
  return result;
}

async function prepareChartVariables(getState) {
  const variables = getSelectedVariables(getState);
  const variableValues = [...dataVariableLineChart];

  return {
    variables,
    variableValues,
  };
}

function mappingDataByHourly(variables, variableValues) {
  const results = {};
  const days = {};

  const variablesHash = variables.reduce((hash, variable) => {
    hash[variable.id] = variable.full_name;
    return hash
  }, {});

  // flatten variableValues
  const listData = variableValues.flat();

  if (listData.length === 0) {
    return {
      days,
      results
    }
  }

  listData.forEach(data => {
    const date = data.datetime.split(' ')[0];
    if(!results[date]) {
      days[date] = true;
      results[date] = {
        name: date,
        chartData: []
      }
    }
    results[date].chartData.push({
      date: data.datetime,
      group: variablesHash[data.output_variable_id],
      value: Number(data.value)
    })
  })

  return {
    days,
    results
  }
}

function organizeChartData(variables, variableValues) {
  if (variables.length === 0) {
    throw new Error('Please choose variables');
  } else if (variableValues.length === 0 || variableValues[0].length === 0) {
    throw new Error('Please choose another date');
  }
  const labels = {};
  const chartValues = [];

  // labels
  variables.forEach(variable => labels[variable.full_name] = variable.bgColor)

  const { days, results } = mappingDataByHourly(variables, variableValues);
  Object.keys(days).forEach(day => chartValues.push(results[day]))

  return {
    labels,
    chartValues,
  };
}

export default async function fetchValuesForLineChart(getState) {
  const { variableValues, variables } = await prepareChartVariables(getState);

  const { labels, chartValues } = organizeChartData(variables, variableValues, getState);

  return { labels, chartValues };
}
