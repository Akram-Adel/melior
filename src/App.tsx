import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { Screen } from 'styledComponents';
import { InputDates, DataChart } from 'components';

function App() {
  // State
  // -- Dates
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(moment());
  // -- Chart
  const [bars, setBars] = useState(10);

  useEffect(() => {
    const resizeEventHandler = (e: any) => windowResizeHandler(bars, e.target.screen.availWidth);
    window.addEventListener('resize', resizeEventHandler);

    return () => {
      window.removeEventListener('resize', resizeEventHandler);
    };
  }, [bars]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen className="App">
      <InputDates {...{ startDate, endDate, setStartDate, setEndDate }} />
      <DataChart {...{ bars }} />
    </Screen>
  );

  function windowResizeHandler(barsRef: number, size: number) {
    if (size >= 992) {
      (barsRef !== 10) && setBars(10);
    } else if (size >= 768) {
      (barsRef !== 6) && setBars(6);
    } else {
      setBars(4);
    }
  }
}

export default App;
