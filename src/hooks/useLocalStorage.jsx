// import { useState } from "react";

// export function useLocalStorage(key, initialData) {
//   const [storedValue, setStoredValue] = useState(() => {
//     const existingData = localStorage.getItem(key);
//     return existingData ? JSON.parse(existingData) : initialData;
//   });

//   const updateLocalStorage = (newValue) => {
//     if (typeof newValue === "function") {
//       localStorage.setItem(key, JSON.stringify(newValue(storedValue)));
//     } else {
//       localStorage.setItem(key, JSON.stringify(newValue));
//     }
//     setStoredValue(newValue);
//   };

//   return [storedValue, updateLocalStorage];
// }



import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // State to store the value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check if the key exists in localStorage
      const item = window.localStorage.getItem(key);
      // Parse and return the item or return the initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, storedValue]);

  // Return both the state and a setter function
  return [storedValue, setStoredValue];
}
