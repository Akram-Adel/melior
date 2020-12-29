import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { MeliorApi } from 'services';
import { IReviewsApi, IQuestionsApi, IReviewAnswer } from 'interfaces/api';

import { Screen } from 'styledComponents';
import { InputDates, DataChart } from 'components';
import { IReviewPartition } from 'components/dataChart';

function App() {
  // State
  // -- Dates
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(moment());
  // -- Chart
  const [bars, setBars] = useState(getBarNumsFromWindowSize(window.screen.availWidth));
  const [questionsResp, setQuestionsResp] = useState<IQuestionsApi[keyof IQuestionsApi]>([]);
  const [reviews, setReviews] = useState<IReviewPartition[]>([]);

  // API -- IQuestionsApi & IReviewsApi
  useEffect(() => {
    (async () => {
      let questionsApi = questionsResp;

      if (questionsResp.length === 0) {
        const res = await MeliorApi.get<IQuestionsApi>('/questions');
        // Since I only care about English values here
        setQuestionsResp(res.data.en);
        questionsApi = res.data.en;
      }

      const res = await MeliorApi.get<IReviewsApi>('/branches/1/progress', {
        params: {
          date_from: startDate?.format('YYYY-MM-DD'),
          date_to: endDate?.format('YYYY-MM-DD'),
        },
      });

      setReviews(reviewPartitionHandler(
        res.data.line_chart_data,
        questionsApi,
        startDate || moment(),
        endDate || moment(),
        bars,
      ));
    })();
  }, [startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

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
        reviewPartitions={reviews} />
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

export function reviewPartitionHandler(
  reviewsApi: IReviewsApi['line_chart_data'],
  questionsApi: IQuestionsApi[keyof IQuestionsApi],
  startDate: Moment,
  endDate: Moment,
  bars: number,
): Array<{from: Moment, to: Moment, qOne: number, qTwo: number}> {
  const reviewPartitions: Array<{from: Moment, to: Moment, qOne: number, qTwo: number}> = [];
  const datePartitions = datePartitionHandler(startDate, endDate, bars);
  const _reviews = (reviewsApi) || [];

  datePartitions.forEach((d) => {
    let numReviewsInPartition = 0;
    let qOne = 0;
    let qTwo = 0;

    for (let i = 0; i < _reviews.length; i += 1) {
      if (isDateInPartition(_reviews[i].submitted_at, d)) {
        qOne += getChoiceWeightofQuestionId(2, _reviews[i].answers, questionsApi);
        qTwo += getChoiceWeightofQuestionId(4, _reviews[i].answers, questionsApi);
        numReviewsInPartition += 1;
      }
    }

    if (numReviewsInPartition) {
      qOne /= numReviewsInPartition;
      qTwo /= numReviewsInPartition;
    }
    reviewPartitions.push({ ...d, qOne, qTwo });
  });

  return reviewPartitions;
}

export function datePartitionHandler(
  startDate: Moment,
  endDate: Moment,
  bars: number,
): Array<{from: Moment, to: Moment}> {
  // Adding half a day overcomes the problem of having the next day differs to zero from today
  const datePartitions: Array<{from: Moment, to: Moment}> = [];
  const dateDiff = moment(endDate).add('12', 'hours').diff(startDate, 'days');

  const daysPerPartition = Math.floor((dateDiff + 1) / bars);
  let remainderDays = (daysPerPartition) ? (dateDiff + 1) % bars : 0;

  for (let i = 0; i <= dateDiff; i += 1) {
    // either 0 or (value - 1)
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

export function isDateInPartition(date: string, partition: {from: Moment, to: Moment}): boolean {
  // we add one day here to include the 24hours of that day
  const _to = moment(partition.to).add(1, 'days');
  const _date = moment(date);

  return (_date.isSameOrAfter(partition.from, 'day')
    && _date.isBefore(_to, 'day'));
}

function getChoiceWeightofQuestionId(
  qId: number,
  answers: IReviewAnswer[],
  questionsApi: IQuestionsApi[keyof IQuestionsApi],
): number {
  const question = questionsApi.find((q) => q.id === qId);
  const answer = answers.find((a) => a.question === qId);
  if (!question || !answer) { return 0; }

  const qChoice = question.choices.find((c) => c.id === answer.choice);
  if (!qChoice || qChoice.text === 'Neutral') {
    return 0;
  } if (qChoice.text === 'Bad') {
    return -1;
  }
  return 1;
}

export default App;
