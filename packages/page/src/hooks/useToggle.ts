import { useState, useCallback } from 'react';

function useToggle(initStatus = false) {
  const [value, setValue] = useState(initStatus);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
}

export default useToggle;
