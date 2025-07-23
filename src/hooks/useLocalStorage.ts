import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// API Key management hook
export function useApiKey() {
  const [apiKey, setApiKey] = useLocalStorage<string>('openai-api-key', '');
  const [isValid, setIsValid] = useState(false);

  const validateApiKey = (key: string): boolean => {
    return key.startsWith('sk-') && key.length > 20;
  };

  const saveApiKey = (key: string) => {
    const valid = validateApiKey(key);
    setIsValid(valid);
    if (valid) {
      setApiKey(key);
    }
    return valid;
  };

  const clearApiKey = () => {
    setApiKey('');
    setIsValid(false);
  };

  // Validate on mount
  useEffect(() => {
    setIsValid(validateApiKey(apiKey));
  }, [apiKey]);

  return {
    apiKey,
    isValid,
    saveApiKey,
    clearApiKey,
    validateApiKey
  };
}