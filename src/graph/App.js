import React, { useState, useEffect } from 'react';

import useCSV from './useCSV'
import MyChart from './MyChart'
import { buildGraphData } from './buildGraphData'
import Stats from './Stats'

const App = () => {

  const [status, data] = useCSV("./speedtest-cli.csv");
  const [graphData, setGraphData] = useState(null);
  const [sampleSize, setSampleSize] = useState(null);

  useEffect(() => {
    const [gDat, sampleSize] = buildGraphData(data)
    setGraphData(gDat)
    setSampleSize(sampleSize)
  }, [data]);

  if (status !== "Complete" || graphData === null)
    return <span>{status}</span>            // report Loading... or error

  return (
    <div>
      <Stats data={graphData} total={sampleSize}/>
      <MyChart data={graphData} />
    </div>
  );
}

export default App;
