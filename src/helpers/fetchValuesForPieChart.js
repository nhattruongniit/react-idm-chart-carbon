import isNumber from 'lodash/isNumber';

function findMatchingVariableValue(dateTime, variableValues) {
  return variableValues.find((variableValue) => {
    const { month, date, hour, minute } = dateTime;
    const variableDate = new Date(variableValue.datetime);
    const matchingDate = new Date(
      variableDate.getFullYear(),
      isNumber(month) ? Number(month) - 1 : variableDate.getMonth(),
      isNumber(date) ? Number(date) - 1 : variableDate.getDate(),
      isNumber(hour) ? Number(hour) - 1 : variableDate.getHours(),
      isNumber(minute) ? Number(minute) - 1 : variableDate.getMinutes(),
      0,
      0,
    );
    return variableDate.getTime() === matchingDate.getTime();
  });
}

export default async function fetchValuesForPieChart(getState) {
  const { values } = getState().chartForm;
  const { plottedVariable } = getState().variables;
  const chartData = [];
  const labels = {};

  plottedVariable.forEach((variable) => {
    variable.variableValues = [
      {
        datetime: '2001-01-21 00:00:00',
        max_datetime: null,
        max_value: null,
        min_datetime: null,
        min_value: null,
        output_variable_id: 1,
        value: '12.722719046658695',
      },
    ];
  });

  // type simple
  plottedVariable.forEach((variable) => {
    const variableValue = findMatchingVariableValue(values, variable.variableValues);

    if (variableValue) {
      chartData.push({
        group: variable.full_name,
        value: Number(variableValue.value * Math.random(1, 100)),
      });
      labels[variable.full_name] = variable.bgColor;
    }
  });

  return {
    chartValues: chartData,
    labels,
  };
}
