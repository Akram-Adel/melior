/* eslint-disable no-undef */
import moment, { Moment } from 'moment';
import { datePartitionHandler } from './App';

// Choices
// const choices = [{ id: 4, text: 'Good' }, { id: 6, text: 'Neutral' }, { id: 1, text: 'Bad' }];
// const choicesShuffled = [{ id: 1, text: 'Good' }, { id: 6, text: 'Neutral' }, { id: 4, text: 'Bad' }];

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
