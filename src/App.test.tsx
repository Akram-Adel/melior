/* eslint-disable no-undef */
import { IQuestionsApi, IReviewsApi } from 'interfaces/api';
import moment, { Moment } from 'moment';
import { reviewPartitionHandler, datePartitionHandler, isDateInPartition } from './App';

// Questions
const questions: IQuestionsApi[keyof IQuestionsApi] = [
  {
    id: 2,
    text: '',
    choices: [{ id: 4, text: 'Good' }, { id: 6, text: 'Neutral' }, { id: 1, text: 'Bad' }],
  },
  {
    id: 4,
    text: '',
    choices: [{ id: 4, text: 'Good' }, { id: 6, text: 'Neutral' }, { id: 1, text: 'Bad' }],
  },
];

describe('datePartitionHandler with 10 bars', () => {
  let startDate;
  let endDate;
  const bars = 10;
  const format = 'DD-MM';

  function testablePartition(_startDate: Moment, _endDate: Moment): Array<{from: string, to: string}> {
    return (datePartitionHandler(_startDate, _endDate, bars)
      .map((p) => ({ from: p.from.format(format), to: p.to.format(format) })));
  }

  it('handles the same day', () => {
    startDate = moment();
    endDate = moment();
    expect(testablePartition(startDate, endDate))
      .toEqual([{ from: startDate.format(format), to: endDate.format(format) }]);
  });

  it('handles four days', () => {
    startDate = moment();
    endDate = moment().add(3, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
      ]);
  });

  it('handles 20 days', () => {
    startDate = moment();
    endDate = moment().add(19, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
      ]);
  });

  it('handles 11 days', () => {
    startDate = moment();
    endDate = moment().add(10, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
      ]);
  });

  it('handles 30 days', () => {
    startDate = moment();
    endDate = moment().add(29, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
      ]);
  });

  it('handles 31 days', () => {
    startDate = moment();
    endDate = moment().add(30, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(3, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
      ]);
  });
});

describe('datePartitionHandler with 4 bars', () => {
  let startDate;
  let endDate;
  const bars = 4;
  const format = 'DD-MM';

  function testablePartition(_startDate: Moment, _endDate: Moment): Array<{from: string, to: string}> {
    return (datePartitionHandler(_startDate, _endDate, bars)
      .map((p) => ({ from: p.from.format(format), to: p.to.format(format) })));
  }

  it('handles 8 days', () => {
    startDate = moment();
    endDate = moment().add(7, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(1, 'days').format(format) },
      ]);
  });

  it('handles 5 days', () => {
    startDate = moment();
    endDate = moment().add(4, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(1, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.format(format) },
      ]);
  });

  it('handles 12 days', () => {
    startDate = moment();
    endDate = moment().add(11, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
      ]);
  });

  it('handles 13 days', () => {
    startDate = moment();
    endDate = moment().add(12, 'days');
    expect(testablePartition(startDate, endDate))
      .toEqual([
        { from: startDate.format(format), to: startDate.add(3, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
        { from: startDate.add(1, 'days').format(format), to: startDate.add(2, 'days').format(format) },
      ]);
  });
});

describe('isDateInPartition works', () => {
  const date = moment().add(10, 'seconds');

  it('return true when date is in partition - single day partition', () => {
    expect(isDateInPartition(date.format(), { from: moment(), to: moment() }))
      .toBeTruthy();
  });

  it('return true when date is in partition - two days partition case', () => {
    expect(isDateInPartition(date.format(), { from: moment(), to: moment().add(1, 'day') }))
      .toBeTruthy();
  });

  it('return true when date is in partition - three days partion case', () => {
    expect(isDateInPartition(date.format(), { from: moment().subtract(1, 'd'), to: moment().add(1, 'd') }))
      .toBeTruthy();
  });

  it('return false when date is before partition', () => {
    expect(isDateInPartition(date.format(), { from: date.add(1, 'day'), to: date.add(1, 'day') }))
      .toBeFalsy();
  });

  it('return false when date is after partition', () => {
    expect(isDateInPartition(moment().add(10, 'days').format(), { from: date, to: date.add(1, 'day') }))
      .toBeFalsy();
  });
});

describe('reviewPartitionHandler with 10 bars', () => {
  let results: IReviewsApi['line_chart_data'];
  const startDate = moment();
  const endDate = moment().add(9, 'days');
  const endDateExtended = moment().add(19, 'days');
  const bars = 10;

  function testablePartition(_results: IReviewsApi['line_chart_data'])
  : Array<{qOne: number, qTwo: number}> {
    return (reviewPartitionHandler(_results, questions, startDate, endDate, bars)
      .map((p) => ({ qOne: p.qOne, qTwo: p.qTwo })));
  }
  function testablePartitionExtended(_results: IReviewsApi['line_chart_data'])
  : Array<{qOne: number, qTwo: number}> {
    return (reviewPartitionHandler(_results, questions, startDate, endDateExtended, bars)
      .map((p) => ({ qOne: p.qOne, qTwo: p.qTwo })));
  }

  it('handles empty result', () => {
    results = [];
    const toEqual = [
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('handles one result', () => {
    results = [
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('handles one result in the middle', () => {
    results = [
      {
        submitted_at: moment().add(1, 'days').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 0, qTwo: 0 },
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
  });

  it('handles one result in the middle - two days per partition', () => {
    results = [
      {
        submitted_at: moment().add(1, 'days').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('handles two results in the same day', () => {
    results = [
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('handles two results in the same day in the middle', () => {
    results = [
      {
        submitted_at: moment().add(1, 'days').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
      {
        submitted_at: moment().add(1, 'days').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 0, qTwo: 0 },
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
  });

  it('handles two results in the same day in the middle - two days per partition', () => {
    results = [
      {
        submitted_at: moment().add(1, 'days').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
      {
        submitted_at: moment().add(1, 'days').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('hande two results one after the other', () => {
    results = [
      {
        submitted_at: moment().add(1, 'day').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 1, qTwo: 1 },
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
  });

  it('hande two results one after the other - two days per partition', () => {
    results = [
      {
        submitted_at: moment().add(1, 'day').add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
    ];
    const toEqual = [
      { qOne: 1, qTwo: 1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('calculates the average correctly', () => {
    results = [
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 4 }, { question: 4, choice: 4 }],
      },
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 6 }, { question: 4, choice: 1 }],
      },
    ];
    const toEqual = [
      { qOne: 0.5, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });

  it('calculates the negative values correctly', () => {
    results = [
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 1 }, { question: 4, choice: 1 }],
      },
      {
        submitted_at: moment().add(10, 'seconds').format(),
        answers: [{ question: 2, choice: 6 }, { question: 4, choice: 1 }],
      },
    ];
    const toEqual = [
      { qOne: -0.5, qTwo: -1 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
      { qOne: 0, qTwo: 0 },
    ];
    expect(testablePartition(results)).toEqual(toEqual);
    expect(testablePartitionExtended(results)).toEqual(toEqual);
  });
});
