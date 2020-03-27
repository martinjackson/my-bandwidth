const mem = (s) => (parseFloat(s) / 1000.0); // in k units not meg

export const buildGraphData = (data) => {
  if (!data)
    return [null, 0];

  const TIME = 3;
  const DOWNLOAD = 6;
  const UPLOAD = 7;

  let start = 1;
  let end = data.length - 1;
  if (data[end].length < 10)
    end--;
  data = data.slice(start, end); // remove header and last entry if a blank line

  const down = data.map((v, i) => [new Date(v[TIME]), mem(v[DOWNLOAD])]);
  const up = data.map((v, i) => [new Date(v[TIME]), mem(v[UPLOAD])]);

  const cutOverDate = new Date("2020-03-26T15:30:01.719551Z");

  const downGood10 = down.filter((v) => v[1] >= 9000 && v[0] < cutOverDate);
  const downSlow10 = down.filter((v) => v[1] < 9000 && v[0] < cutOverDate);
  const up10 = up.filter((v) => v[0] < cutOverDate);

  const downGood20 = down.filter((v) => v[1] >= 19000 && v[0] >= cutOverDate);
  const downSlow20 = down.filter((v) => v[1] < 19000 && v[0] >= cutOverDate);
  const up20 = up.filter((v) => v[0] > cutOverDate);


  const grData = [
    {
      label: 'Download Good 10Mps',
      data: downGood10,
      totalCount: downGood10.length + downSlow10.length
    },
    {
      label: 'Download Slow 10Mps',
      data: downSlow10,
      totalCount: downGood10.length + downSlow10.length
    },
    {
      label: 'Upload 1Mps',
      data: up10,
      totalCount: up10.length
    },

    {
      label: 'Download Good 20Mps',
      data: downGood20,
      totalCount: downGood20.length + downSlow20.length
    },
    {
      label: 'Download Slow 20Mps',
      data: downSlow20,
      totalCount: downGood20.length + downSlow20.length
    },
    {
      label: 'Upload 2Mps',
      data: up20,
      totalCount: up20.length
    }

  ];

  return grData;
};
