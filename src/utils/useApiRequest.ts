import {useEffect, useState} from 'react';
import CancellationToken from '../utils/CancellationToken';
import {getExceptionMessage} from './getExceptionMessage';

type ErrorInfo = {
  message: string;
  exception: unknown;
}

export default function useApiRequest<T>(action: () => Promise<T>, dependencies: unknown[]): {
  isLoading: boolean;
  error: ErrorInfo | null;
  data: Readonly<T> | null;
  reload: () => void;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorInfo | null>(null);

  const reload = (data?: T) => {
    if (data != null) {
      setData(data);
      return () => {
      };
    }

    setIsLoading(true);
    setError(null);

    const token = new CancellationToken();

    action().then((r) => {
      if (token.continue()) {
        setData(r);
        setIsLoading(false);
      }
    }).catch((ex: unknown) => {
      getExceptionMessage(ex).then((msg) => {
        if (token.continue()) {
          setError({
            message: msg,
            exception: ex,
          });
          setIsLoading(false);
        }
      });
    });

    return () => token.cancel();
  };

  useEffect(() => reload(), dependencies ?? []);

  return {
    isLoading,
    data,
    error,
    reload,
  };
}
