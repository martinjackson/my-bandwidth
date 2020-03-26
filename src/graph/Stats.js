import React from 'react';

const Stats = ({data, total}) => {

  const percent = (n, d) => ( (100*n/d).toFixed(1)+'%' )
  const stats = data.map( (d,i) => (<p key={i}>{d.label}: {d.data.length} {percent(d.data.length, total)} </p>) )

  return <>{stats}</>
}

export default Stats;