import { useRef, useEffect } from "react";

export const useAutoLogout = (
  tokenExpTime: Date | null,
  onExpire: () => void,
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!tokenExpTime) return;

    const remainingTime = tokenExpTime.getTime() - new Date().getTime();

    if (remainingTime <= 0) {
      onExpire();
      return;
    }

    timerRef.current = setTimeout(onExpire, remainingTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [tokenExpTime, onExpire]);
};
