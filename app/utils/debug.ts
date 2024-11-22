export const debugLocalStorage = {
  setItem: (key: string, value: string) => {
    console.log(`Setting ${key} in localStorage:`, value);
    localStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    console.log(`Getting ${key} from localStorage:`, value);
    return value;
  },
};
