// A good solution for the chart here is to create it using a Canvas, but Canvases require quite
// the effort to setup and I usually rely on on 3p libraries like Chart.js. But since the task require
// the chart to be created from scratch, I chose to do it using html elements and flex-box for responsivenes
import React from 'react';

// Styled-Components
import { ChartContainer, Bar, XAxis, YAxis, Legend, LegendLabel } from './dataChart.styled';

const DataChart = ({ bars }: {bars: number}) => (
  <ChartContainer>
    {[...Array(bars)].map((_, i) => (
      <div key={i.toString()} className="chart-container__bar-container">
        <Bar color="green" height={0.5} />
        <Bar color="yellow" height={-0.75} />
      </div>
    ))}

    <XAxis>
      {[...Array(bars)].map((_, i) => (
        <div key={i.toString()} className="x-axis__ticks">
          {i}
        </div>
      ))}
    </XAxis>

    {/* Not to spend too much time into creating all the y ticks, I only made the 1 and -1 ticks */}
    <YAxis />

    <Legend>
      <LegendLabel color="green">
        Q1
      </LegendLabel>
      <LegendLabel color="yellow">
        Q2
      </LegendLabel>
    </Legend>
  </ChartContainer>
);
export default DataChart;
