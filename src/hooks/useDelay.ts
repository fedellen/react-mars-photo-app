import { useEffect, useState } from 'react';
import { useMounted } from './useMounted';

/** Takes a function and returns the trigger function */
export default function useDelay(delayedFunction: () => void) {
  const componentIsMounted = useMounted();

  const [delayEffect, setDelayEffect] = useState(false);
  const [delay, setDelay] = useState(100); // 100ms default

  useEffect(() => {
    if (!delayEffect || !componentIsMounted.current) return;
    setDelayEffect(false);

    setTimeout(() => {
      if (!componentIsMounted.current) return;
      else {
        // Run the delayed function if still mounted
        delayedFunction();
      }
    }, delay);
  }, [delayEffect, delayedFunction, delay, componentIsMounted]);

  /** Triggers function after specified delay. Default is 100ms */
  const sendDelay = (delay = 100) => {
    if (!componentIsMounted.current) return;
    setDelay(delay);
    setDelayEffect(true);
  };

  return sendDelay;
}
