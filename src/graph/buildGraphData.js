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
  const downGood = down.filter((v) => v[1] >= 9000);
  const downSlow = down.filter((v) => v[1] < 9000);

  const grData = [
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

  return [grData, end-start]
};
