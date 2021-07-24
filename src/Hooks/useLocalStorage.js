import { useState } from "react";

function useLocalStorage(key, initialState) {
  const [storedValue, setValueStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      return initialState;
    }
  });
  const setValue = (value) => {
    try {
      setValueStored(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  return [storedValue,setValue];
}

export default useLocalStorage;
