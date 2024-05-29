import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(' not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
    
        const mockData = [
          { month: "2024-05", sum: 0.54, ho_name: "호텔 AA", ho_idx: "48" },
          { month: "2024-04", sum: 1.08, ho_name: "호텔 P", ho_idx: "63" },

        ];
        setData(mockData);
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); 
  }, [url]);

  return { data, loading, error };
}

export default useFetch;



