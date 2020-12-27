import styled from 'styled-components';

// BTW -- I'm using BEM for class names here, so insted of creating a styled component for each element
// I create a styled component for each BEM block

export const ChartContainer = styled.div`
  height: calc(100vh - 7rem);
  padding-left: 1.5rem;
  padding-top: 4rem;
  box-sizing: border-box;
  background-color: #ddd;
  display: flex;
  position: relative;

  .chart-container__bar-container {
    flex-grow: 1;
    display: flex;
    justify-content: space-evenly;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-right: 1px solid #aaa;
    align-items: center;
  }
`;

export const Bar = styled.div<{height: number}>`
  width: 25%;
  height: ${(props) => Math.abs(props.height) * 50}%;
  background-color: ${(props) => props.color || 'green'};
  transform: ${(props) => (props.height < 0 ? 'translateY(50%)' : 'translateY(-50%)')};
  transition: height 0.5s;
`;

export const XAxis = styled.div`
  position: absolute;
  width: calc(100% - 1.5rem);
  top: calc(50% + 2rem);
  left: 1.5rem;
  display: flex;
  justify-content: space-evenly;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #000;
  }

  .x-axis__ticks {
    flex-grow: 1;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const YAxis = styled.div`
  position: absolute;
  height: calc(100% - 4rem);
  width: 1px;
  background-color: #000;

  &::before {
    content: '1';
    position: absolute;
    left: -1.5rem;
    font-size: 1.4rem;
    font-weight: 600;
  }

  &::after {
    content: '-1';
    position: absolute;
    left: -1.5rem;
    bottom: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const Legend = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LegendLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  height: 2rem;
  max-width: calc(50% - 6rem);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2rem;
    height: 2rem;
    left: 0rem;
    background-color: ${(props) => props.color || 'green'};
  }
`;
