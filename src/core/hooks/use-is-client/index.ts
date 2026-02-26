import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClient(true);
  }, []);

  return isClient;
}
