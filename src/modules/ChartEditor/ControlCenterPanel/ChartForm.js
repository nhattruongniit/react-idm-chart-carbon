import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// libs
import moment from 'moment';

// carbon core
import { SelectItem, DatePicker, DatePickerInput } from 'carbon-components-react';

// configs
import * as CONSTANTS from 'configs/constant';

// components
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
// import NumberField from 'components/NumberField';
import ButtonField from 'components/ButtonField';

// actions
import { submitForm, clearForm, setValue } from 'reducer/chartForm.reducer';

// selectors
import { chartSelector } from 'selectors/chart.selector';
import { formValuesSelector } from 'selectors/chartForm.selector';

const ChartForm = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const formValues = useSelector(formValuesSelector);
  const chart = useSelector(chartSelector);
  const showDatetime = chart.type === 'pie' || chart.type === 'radar';

  const handleApply = () => {
    dispatch(submitForm(form));
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  const onChangeDate = (e, type) => {
    setForm({
      ...form,
      [type]: e.target.value,
    });
  };

  return (
    <>
      <DateStyled>
        {chart.type === 'pie' && (
          <SelectField id="select-variables-type" labelText="Type" width="33%">
            {CONSTANTS.CHART_FORM_TYPES.map((item, idx) => (
              <SelectItem key={idx} value={item} text={item} />
            ))}
          </SelectField>
        )}

        {showDatetime && (
          <>
            <TextField id="text-month-field" type="number" placeholder="mm" labelText="Date" name="month" width="65px" onChange={(e) => onChangeDate(e, 'month')} />
            <TextField id="text-day-field" type="number" placeholder="dd" labelText="day" name="day" width="65px" hideLabel onChange={(e) => onChangeDate(e, 'date')} />
            <TextField id="text-day-field" type="number" placeholder="hh" labelText="Time" name="day" width="65px" onChange={(e) => onChangeDate(e, 'hour')} />
            <TextField id="text-day-field" type="number" placeholder="mm" labelText="minute" name="day" width="65px" hideLabel onChange={(e) => onChangeDate(e, 'minute')} />
          </>
        )}

        {chart.type === 'line' && formValues.maxDate !== '' && formValues !== '' && (
          <DatePicker
            light
            id="chart-range"
            name="datePicker"
            datePickerType="range"
            dateFormat="d/m/Y"
            minDate={formValues.minDate}
            maxDate={formValues.maxDate}
            onChange={(dates) => {
              dispatch(setValue('startDate', dates[0]));
              if (dates.length > 1) dispatch(setValue('endDate', dates[1]));
            }}
          >
            <DatePickerInput id="chart-range-start" labelText="Start" value={moment(formValues.startDate).format('DD/MM/YYYY')} />
            <DatePickerInput id="chart-range-end" labelText="End" value={moment(formValues.endDate).format('DD/MM/YYYY')} />
          </DatePicker>
        )}

        {chart.type === 'line' && (
          <SelectField id="select-step" labelText="Steps" width="32%" onChange={(e) => dispatch(setValue('steps', e.target.value))}>
            {CONSTANTS.CHART_FORM_STEPS.map((item, idx) => (
              <SelectItem key={idx} value={item} text={item} />
            ))}
          </SelectField>
        )}
      </DateStyled>
      <SectionStyled>
        {/* <NumberField id="number-section-field" label="Sections" value={0} width="100px" /> */}
        {chart.type === 'line' && (
          <SelectField
            id="select-point-type"
            defaultValue={CONSTANTS.CHART_FORM_POINTS[0]}
            labelText="Max Number of Data Points"
            width="36%"
            onChange={(e) => dispatch(setValue('maximumDatePoints', Number(e.target.value)))}
          >
            {CONSTANTS.CHART_FORM_POINTS.map((item, idx) => (
              <SelectItem key={idx} value={item} text={item.toString()} />
            ))}
          </SelectField>
        )}

        <ActionField>
          <ButtonField text="Apply" onClick={handleApply} />
          <ButtonField text="Reset" onClick={handleClear} />
        </ActionField>
      </SectionStyled>
    </>
  );
};

export default ChartForm;

const DateStyled = styled.div`
  display: flex;
  justify-content: space-between;

  & > div + div {
    margin-left: 3px;
  }

  .bx--label {
    font-size: 14px;
    font-weight: bold;
  }
`;

const SectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ActionField = styled.div`
  display: flex;
  align-self: flex-end;

  button + button {
    margin-left: 10px;
  }
`;
