import React from 'react'
import Box from './Box'
import { Chart } from 'react-charts'

const MyChart = (props) => {

const series = React.useMemo(
  () => ({
    type: 'bubble',
    showPoints: false
  }),
  []
)
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        position: 'bottom',
        type: 'time',
        show: true
      },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const lineChart = (<Box>
                      <Chart data={props.data} axes={axes}  series={series} tooltip />
                    </Box>)

  return lineChart
}


export default MyChart;