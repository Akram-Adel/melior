import React, { Dispatch, SetStateAction } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Moment } from 'moment';

import { DatesContainer } from './inputDates.styled';

type dateType = Moment | null;
type IProps = {
  startDate: dateType
  setStartDate: Dispatch<SetStateAction<dateType>>
  endDate: dateType
  setEndDate: Dispatch<SetStateAction<dateType>>
}

const InputDates = ({ startDate, endDate, setStartDate, setEndDate }: IProps) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <DatesContainer>
      <div className="dates-container__date">
        <div>
          Start Date
        </div>
        <KeyboardDatePicker
          format="DD/MM/yyyy" maxDate={endDate}
          value={startDate} onChange={setStartDate} />
      </div>

      <div className="dates-container__date">
        <div>
          End Date
        </div>
        <KeyboardDatePicker
          format="DD/MM/yyyy" minDate={startDate}
          value={endDate} onChange={setEndDate} />
      </div>
    </DatesContainer>
  </MuiPickersUtilsProvider>
);
export default InputDates;
