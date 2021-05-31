import { useEffect, useRef, MutableRefObject } from "react";

/** Contains true if the component is mounted */
export const useMounted = (): MutableRefObject<boolean> => {
  // On component mount, set to true
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      // On component un-mount, set to false
      componentIsMounted.current = false;
    };
  }, []);

  return componentIsMounted;
};
