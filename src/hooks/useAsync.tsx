import { useCallback, useState } from 'react';

type AsyncFunction<T> = () => Promise<T>;

type Status = 'idle' | 'pending' | 'success' | 'error';

export function useAsync<T>(asyncFunction: AsyncFunction<T>) {
  const [status, setStatus] = useState<Status>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
    } catch (error) {
      setError(error);
      setStatus('error');
    }
  }, [asyncFunction]);

  return { execute, status, value, error };
}
