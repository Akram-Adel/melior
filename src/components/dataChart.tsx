// A good solution for the chart here is to create it using a Canvas, but Canvases require quite
// the effort to setup and I usually rely on on 3p libraries like Chart.js. But since the task require
// the chart to be created from scratch, I chose to do it using html elements and flex-box for responsivenes
import React from 'react';
import { Moment } from 'moment';

import { IQuestionsApi } from 'interfaces/api';

import { ChartContainer, Bar, XAxis, YAxis, Legend, LegendLabel } from './dataChart.styled';

export type IReviewPartition = { from: Moment, to: Moment, qOne: number, qTwo: number }
type IProps = {
  bars: number
  questionsResp: IQuestionsApi[keyof IQuestionsApi]
  reviewPartitions: IReviewPartition[]
}

const DataChart = ({ bars, questionsResp, reviewPartitions }: IProps) => (
  <ChartContainer>
    {[...Array(bars)].map((_, i) => (
      <div key={i.toString()} className="chart-container__bar-container">
        <Bar color="green" height={reviewPartitions[i]?.qOne || 0} />
        <Bar color="yellow" height={reviewPartitions[i]?.qTwo || 0} />
      </div>
    ))}

    <XAxis>
      {[...Array(bars)].map((_, i) => (
        <div key={i.toString()} className="x-axis__ticks">
          {reviewPartitions[i]
            && `${reviewPartitions[i].from.format('DD-MM')} ~ ${reviewPartitions[i].to.format('DD-MM')}`}
        </div>
      ))}
    </XAxis>

    {/* Not to spend too much time into creating all the y ticks, I only made the 1 and -1 ticks */}
    <YAxis />

    <Legend>
      <LegendLabel color="green">
        {questionsResp.find((q) => q.id === 2)?.text || ''}
      </LegendLabel>
      <LegendLabel color="yellow">
        {questionsResp.find((q) => q.id === 4)?.text || ''}
      </LegendLabel>
    </Legend>
  </ChartContainer>
);
export default DataChart;
