import { useState } from "react";

export function useLocalStorage(key, initialData) {
  const [storedValue, setStoredValue] = useState(() => {
    const existingData = localStorage.getItem(key);
    return existingData ? JSON.parse(existingData) : initialData;
  });

  const updateLocalStorage = (newValue) => {
    if (typeof newValue === "function") {
      localStorage.setItem(key, JSON.stringify(newValue(storedValue)));
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
    setStoredValue(newValue);
  };

  return [storedValue, updateLocalStorage];
}
