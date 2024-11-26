// context/FavoritesContext.tsx
'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/product';
import { debugLocalStorage } from '../utils/debugStorage';

interface FavoritesState {
  items: Product[];
}

type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: FavoritesState };

const initialState: FavoritesState = {
  items: [],
};

// Creamos el contexto con su tipo
const FavoritesContext = createContext<{
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
} | null>(null);

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case 'LOAD_FAVORITES':
      return action.payload;
    default:
      return state;
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    const savedFavorites = debugLocalStorage.getItem('favorites');
    if (savedFavorites) {
      dispatch({
        type: 'LOAD_FAVORITES',
        payload: JSON.parse(savedFavorites),
      });
    }
  }, []);

  const value = {
    favorites: state.items,
    addToFavorites: (product: Product) => {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    },
    removeFromFavorites: (productId: string) => {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
    },
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
