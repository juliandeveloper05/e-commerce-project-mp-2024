// utils/debugStorage.ts

export const debugLocalStorage = {
  setItem: (key: string, value: string) => {
    try {
      console.log(`Setting ${key} in localStorage:`, value);
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  getItem: (key: string) => {
    try {
      const value = localStorage.getItem(key);
      console.log(`Getting ${key} from localStorage:`, value);
      return value;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      console.log(`Removing ${key} from localStorage`);
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },
};
