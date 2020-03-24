import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import useCSV from './useCSV'
import MyChart from './MyChart'

const mem = (s) => {
  const m = parseFloat(s) / 1000.0      // in k units not meg
  return m;    // Math.round( m * 100 ) / 100;
}

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

  return [
            {
              label: 'Download',
              data: down
            },
            {
              label: 'Upload',
              data: up
            }
        ];
}


const App = () => {

  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  const [status, data] = useCSV("./speedtest-cli.csv");
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const gDat = buildGraphData(data)
    setGraphData(gDat)
  }, [data]);


  if (status !== "Complete" || graphData === null)
    return <span>{status}</span>            // report Loading... or error

    console.log('App render:', graphData);


  return (
    <div ref={targetRef}>
      <p>{dimensions.width} x {dimensions.height}</p>
      <MyChart data={graphData} dim={dimensions} />
    </div>
  );
}

export default App;
