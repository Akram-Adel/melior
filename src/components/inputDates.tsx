import React, { Dispatch, SetStateAction } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Moment } from 'moment';
import styled from 'styled-components';

// Styled-Components
// BTW -- I'm using BEM for class names here, so insted of creating a styled component for each element
// I create a styled component for each BEM block
const DatesContainer = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .dates-container__date {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    align-items: center;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

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
        <div>Start Date</div>
        <KeyboardDatePicker
          format="DD/MM/yyyy" maxDate={endDate}
          value={startDate} onChange={setStartDate} />
      </div>

      <div className="dates-container__date">
        <div>End Date</div>
        <KeyboardDatePicker
          format="DD/MM/yyyy" minDate={startDate}
          value={endDate} onChange={setEndDate} />
      </div>
    </DatesContainer>
  </MuiPickersUtilsProvider>
);
export default InputDates;
