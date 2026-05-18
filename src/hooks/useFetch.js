import { useState, useEffect } from 'react';

const API_BASE = 'https://4f8ebe37-e7e2-45bf-8b41-4a5747219b85.mock.pstmn.io';

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = endpoint ? `${API_BASE}${endpoint}` : null;
  // Serialize options to use as dependency key
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, optionsKey]);

  return { data, loading, error };
}
