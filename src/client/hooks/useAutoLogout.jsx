import { useEffect, useRef } from 'react';

import { handleLogout } from '@/helpers';

export const useAutoLogout = () => {
  const logoutTimerIdRef = useRef(null);

  useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === 'hidden') {
        const timeOutId = window.setTimeout(handleLogout, 60 * 60 * 1000);

        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };

    document.addEventListener('visibilitychange', autoLogout);

    return () => {
      document.removeEventListener('visibilitychange', autoLogout);
    };
  }, []);
};
