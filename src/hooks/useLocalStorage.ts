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
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
