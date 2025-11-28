import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Ошибка чтения localStorage по ключу', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Ошибка записи localStorage по ключу', key, error);
    }
  }, [key, storedValue]);

  const setValue = (value) => {
    try {
      setStoredValue((prev) => {
        const valueToStore =
          value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error('Ошибка записи localStorage по ключу', key, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
