import { useState, useEffect } from 'react';
import Papa from 'papaparse'

function useCSV(url) {
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {

    Papa.parse(url, {
      download: true,
      before: function() {
        setStatus("Loading...")
      },
      error: function(err, file, inputElem, reason) {
        setStatus(err+' '+file+' '+reason)
      },
      complete: function(results) {
        console.log(`parsing ${url} complete.`);
        setData(results.data)
        setStatus("Complete")
      }
    });
  }, [url]);

  return [status, data]
}

export default useCSV