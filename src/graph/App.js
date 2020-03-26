import React, { useState, useEffect } from 'react';

import useCSV from './useCSV'
import MyChart from './MyChart'

const mem = (s) => ( parseFloat(s) / 1000.0 )   // in k units not meg

const buildGraphData = (data) => {

  if (!data)
     return null

  const TIME = 3
  const DOWNLOAD = 6
  const UPLOAD = 7

  let start = 1
  let end = data.length - 1
  if (data[end].length < 10)
     end--

  data = data.slice(start,end)   // remove header and last entry if a blank line

  const down = data.map( (v, i) => [ new Date(v[TIME]), mem(v[DOWNLOAD]) ] )
  const up   = data.map( (v, i) => [ new Date(v[TIME]), mem(v[UPLOAD])   ] )

  const downGood = down.filter( (v) => v[1] >= 9000)
  const downSlow = down.filter( (v) => v[1] < 9000)

  return [
            {
              label: 'Download Good',
              data: downGood
            },
            {
              label: 'Download Slow',
              data: downSlow
            },
            {
              label: 'Upload',
              data: up
            }
        ];
}


const App = () => {

  const [status, data] = useCSV("./speedtest-cli.csv");
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const gDat = buildGraphData(data)
    setGraphData(gDat)
  }, [data]);

  if (status !== "Complete" || graphData === null)
    return <span>{status}</span>            // report Loading... or error

  const counts = graphData.map( d => d.data.length )
  const total = Math.max(...counts)
  console.log('counts:', counts, 'Total:', total);

  const percent = (n, d) => ( (100*n/d).toFixed(1)+'%' )
  const stats = graphData.map( (d,i) => (<p key={i}>{d.label}: {d.data.length} {percent(d.data.length, total)} </p>) )

  return (
    <div>
      {stats}
      <MyChart data={graphData} />
    </div>
  );
}

export default App;
