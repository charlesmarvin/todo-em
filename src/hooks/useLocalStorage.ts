import React from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: Function | T) => void] {
  const [storedValue, setStoredValue] = React.useState(initialValue);
  React.useEffect(() => {
    const data = window.localStorage.getItem(key);
    if (data) {
      setStoredValue(JSON.parse(data));
    }
  }, [key]);

  const setValue = (value: Function | T) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
      alert(
        "There was an error accessing your browser's local storage. Please ensure your browser supports local storage."
      );
    }
  };

  return [storedValue, setValue];
}
