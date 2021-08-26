/* eslint default-case: "off" */
/* eslint no-loop-func: "off" */

// mock api
import { dataVariableLineChart } from 'mockData';

// libs
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

function getChartPeriodInfo(type) {
  switch (type) {
    case 'food':
    case 'runperiod':
    case 'timestep':
    case 'hourly': {
      return {
        label: 'Day',
        dateFormat: 'YYYY-MM-DD HH:mm',
        dateIncreaseValue: 1,
        dateIncreaseType: 'hour',
        periodLoopingCondition: (currentDateTime) => moment(currentDateTime).hour() !== 0,
      };
    }

    case 'daily': {
      return {
        label: 'Week',
        dateFormat: 'ddd DD MMM',
        dateIncreaseValue: 1,
        dateIncreaseType: 'day',
        periodLoopingCondition: (currentDateTime) => {
          return moment(currentDateTime).weekday() !== 1;
        },
      };
    }

    case 'monthly': {
      return {
        label: 'Year',
        dateFormat: 'MMM',
        dateIncreaseValue: 1,
        dateIncreaseType: 'month',
        periodLoopingCondition: (currentDateTime) => moment(currentDateTime).dayOfYear() !== 1,
      };
    }
  }
}

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

function organizeChartData(variables, variableValues) {
  if (variables.length === 0) {
    throw new Error('Please choose variables');
  } else if (variableValues.length === 0 || variableValues[0].length === 0) {
    throw new Error('Please choose another date');
  }

  const chartValues = [];
  const variableType = variables[0].type;

  let minDate = new Date();
  let maxDate = new Date(1900, 1, 1);

  variableValues.forEach((values) => {
    values.forEach((value) => {
      const date = new Date(value.datetime);
      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;
    });
  });

  let currentDateTime = new Date(minDate.getTime());
  let variableValueIndex = 0;
  let loopIndex = 1;

  const periodInfo = getChartPeriodInfo(variableType);

  while (currentDateTime < maxDate) {
    const resultItem = {
      name: periodInfo.label + ' ' + loopIndex,
      chartData: [],
    };
    let periodDateTime = new Date(currentDateTime.getTime());
    let periodIndex = 0;

    while (periodInfo.periodLoopingCondition(periodDateTime) === true || periodIndex === 0) {
      let periodChartData = {
        date: moment(periodDateTime).format(periodInfo.dateFormat),
      };

      variables.forEach((variable, variableIndex) => {
        const value = variableValues[variableIndex][variableValueIndex] && variableValues[variableIndex][variableValueIndex].value;
        periodChartData = {
          ...periodChartData,
          group: variable.full_name,
          value: Number(value) || 0,
        };
        resultItem.chartData.push(periodChartData); // data for line chart carbon design
      });

      variableValueIndex++;
      periodDateTime = moment(periodDateTime).add(periodInfo.dateIncreaseValue, periodInfo.dateIncreaseType).toDate();
      periodIndex++;
      // resultItem.chartData.push(periodChartData); data for rechartjs line chart
      currentDateTime = new Date(periodDateTime.getTime());
    }

    chartValues.push(resultItem);
    loopIndex++;
  }

  const labels = {};
  variables.forEach((variable) => {
    labels[variable.full_name] = variable.bgColor;
  });

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
