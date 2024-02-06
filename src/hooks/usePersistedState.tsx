import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const usePersistedState = <T,>(
  localStorageKey: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const localStorageItem = localStorage.getItem(localStorageKey);
    if (localStorageItem === null) return defaultValue;
    try {
      return JSON.parse(localStorageItem);
    } catch (err) {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
};
