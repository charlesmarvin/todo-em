import React from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: Function | T) => void] {
  const [storedValue, setStoredValue] = React.useState(initialValue);
  React.useEffect(() => {
    const data = window.localStorage.getItem(key);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // TODO(marvin) remove the following after users migrate!
        if (
          !parsedData.activeView ||
          typeof parsedData.activeView === "string"
        ) {
          console.log("Migration view persistence schema");
          parsedData.activeView = {
            view: parsedData.activeView > 0 ? parsedData.activeView : 1,
            priority:
              parsedData.activePriority > 0 ? parsedData.activePriority : 1,
          };
        }
        setStoredValue(parsedData);
      } catch (error) {
        console.warn({ data, error });
        alert(
          "There was an issue reading your stored TODOs. It's likely the data has been corrupted. The stored data has been written to your browser console."
        );
        window.localStorage.removeItem(key);
      }
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
