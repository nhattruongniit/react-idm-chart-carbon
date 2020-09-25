import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// carbon core
import { SelectItem } from 'carbon-components-react';

// components
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import NumberField from 'components/NumberField';
import ButtonField from 'components/ButtonField';

// actions
import { submitForm, clearForm } from 'reducer/chartForm.reducer';

// selectors
import { chartSelector } from 'selectors/chart.selector';

const types = ['Simple', 'Two level'];

const ChartForm = () => {
  const [datePie, setDatePie] = useState({});
  const dispatch = useDispatch();
  const chart = useSelector(chartSelector);

  const handleApply = () => {
    dispatch(submitForm(datePie));
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  const onChangeDate = (e, type) => {
    setDatePie({
      ...datePie,
      [type]: e.target.value,
    });
  };

  return (
    <>
      <DateStyled>
        <SelectField id="select-variables-type" labelText="Type" width="33%">
          {types.map((item, idx) => (
            <SelectItem key={idx} value={item} text={item} />
          ))}
        </SelectField>
        <TextField id="text-month-field" type="number" placeholder="mm" labelText="Date" name="month" width="65px" onChange={(e) => onChangeDate(e, 'month')} />
        <TextField id="text-day-field" type="number" placeholder="dd" labelText="day" name="day" width="65px" hideLabel onChange={(e) => onChangeDate(e, 'date')} />
        <TextField id="text-day-field" type="number" placeholder="hh" labelText="Time" name="day" width="65px" onChange={(e) => onChangeDate(e, 'hour')} />
        <TextField id="text-day-field" type="number" placeholder="mm" labelText="minute" name="day" width="65px" hideLabel onChange={(e) => onChangeDate(e, 'minute')} />
      </DateStyled>
      <SectionStyled>
        {chart.type === 'pie' ? null : <NumberField id="number-section-field" label="Sections" value={0} width="100px" />}
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
