import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { MeliorApi } from 'services';
import { IReviewsApi, IQuestionsApi } from 'interfaces/api';

import { Screen } from 'styledComponents';
import { InputDates, DataChart } from 'components';

function App() {
  // State
  // -- Dates
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(moment());
  // -- Chart
  const [bars, setBars] = useState(getBarNumsFromWindowSize(window.screen.availWidth));

  // API -- IQuestionsApi
  const [questionsResp, setQuestionsResp] = useState<IQuestionsApi[keyof IQuestionsApi]>([]);
  useEffect(() => {
    (async () => {
      const res = await MeliorApi.get<IQuestionsApi>('/questions');
      setQuestionsResp(res.data.en); // Since I only care about English values here
    })();
  }, []);

  // API -- IReviewsApi
  useEffect(() => {
    (async () => {
      const res = await MeliorApi.get<IReviewsApi>('/branches/1/reviews', {
        params: {
          date_from: startDate?.format('YYYY-MM-DD'),
          date_to: endDate?.format('YYYY-MM-DD'),
        },
      });
      console.log(res.data);
    })();
  }, [startDate, endDate]);

  // Window Resize Handler
  useEffect(() => {
    const resizeEventHandler = (e: any) => windowResizeHandler(e.target.screen.availWidth);
    window.addEventListener('resize', resizeEventHandler);

    return () => {
      window.removeEventListener('resize', resizeEventHandler);
    };
  }, [bars]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen className="App">
      <InputDates {...{ startDate, endDate, setStartDate, setEndDate }} />
      <DataChart
        {...{ bars, questionsResp }}
        datePartitions={datePartitionHandler(startDate || moment(), endDate || moment(), bars)} />
    </Screen>
  );

  function windowResizeHandler(size: number) {
    const barNums = getBarNumsFromWindowSize(size);
    (bars !== barNums) && setBars(barNums);
  }

  function getBarNumsFromWindowSize(size: number): number {
    return (size >= 992) ? 10
      : (size >= 768) ? 6
        : 4;
  }
}

export function datePartitionHandler(startDate: Moment, endDate: Moment, bars: number)
: Array<{from: Moment, to: Moment}> {
  // Adding half a day overcomes the problem of having the next day differs to zero from today
  const dateDiff = moment(endDate).add('12', 'hours').diff(startDate, 'days');
  const datePartitions: Array<{from: Moment, to: Moment}> = [];

  const daysPerPartition = Math.floor((dateDiff + 1) / bars);
  let remainderDays = (daysPerPartition) ? (dateDiff + 1) % bars : 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= dateDiff; i++) {
    // either 0 or value - 1
    let daysToAddToStartDate = (daysPerPartition) ? (daysPerPartition - 1) : daysPerPartition;
    if (remainderDays > 0) {
      daysToAddToStartDate += 1;
      remainderDays -= 1;
    }

    datePartitions.push({
      from: moment(startDate).add(i, 'days'),
      to: moment(startDate).add((daysToAddToStartDate + i), 'days'),
    });

    i += daysToAddToStartDate;
  }

  return datePartitions;
}

export default App;
