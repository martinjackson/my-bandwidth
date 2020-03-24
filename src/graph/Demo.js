
// Taken from https://github.com/tobiaslins/frappe-charts-react-example

import React from "react";
import "./Demo.css";

import Graph from "./Graph";

/*
const randomData = () =>
  Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
*/


function Demo(props) {

  const {time, temp, humid} = props;

  if (time.length < 2)
     return <div>dataset too small for graph</div>

    return (
      <div>
        <Graph
          title="Bar Chart"
          type="bar"
          height={200}
          data={{
            labels: time, // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [{color: "light-blue", chartType:'bar', values: humid}]
          }}
          onSelect={a => console.log(a.index)}
        />
        <Graph
          title="Line Chart"
          type="line"
          height={200}
          data={{
            labels: time, // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [{color: "light-blue", chartType:'line', values: temp}]
          }}
          show_dots={false}
          heatline
          region_fill
        />
      </div>
    );
}


export default Demo;
