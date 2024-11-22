'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { debugLocalStorage } from '@/app/utils/debugStorage';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imageSrc: string;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { id: string; size: string; quantity: number };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const CartContext = createContext<
  | {
      items: CartItem[];
      itemCount: number;
      total: number;
      addItem: (item: CartItem) => void;
      removeItem: (id: string, size: string) => void;
      updateQuantity: (id: string, size: string, quantity: number) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log('CartReducer - Action:', action.type);
  console.log('CartReducer - Current State:', state);

  switch (action.type) {
    case 'ADD_ITEM': {
      if (!state.items) {
        console.warn('Items array is undefined, initializing empty array');
        state.items = [];
      }

      console.log('Adding item:', action.payload);
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size,
      );

      let newItems;
      if (existingItemIndex >= 0) {
        console.log('Item exists, updating quantity');
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      } else {
        console.log('Adding new item');
        newItems = [...state.items, action.payload];
      }

      const newState = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      console.log('New state after addition:', newState);
      debugLocalStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    }

    case 'REMOVE_ITEM': {
      if (!state.items) return state;

      const newItems = state.items.filter(
        (item) =>
          !(
            item._id === action.payload.id && item.size === action.payload.size
          ),
      );

      const newState = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      debugLocalStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    }

    case 'UPDATE_QUANTITY': {
      if (!state.items) return state;

      const newItems = state.items.map((item) =>
        item._id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );

      const newState = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      debugLocalStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    }

    case 'LOAD_CART':
      return action.payload;

    case 'CLEAR_CART':
      debugLocalStorage.removeItem('cart');
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    console.log('CartProvider - Initializing');
    try {
      const savedCart = debugLocalStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('CartProvider - Loading saved cart:', parsedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      debugLocalStorage.removeItem('cart');
    }
  }, []);

  const addItem = (item: CartItem) => {
    console.log('CartProvider - Adding item:', item);
    try {
      dispatch({ type: 'ADD_ITEM', payload: item });
      toast.success('Producto agregado al carrito');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error al agregar al carrito');
    }
  };

  const removeItem = (id: string, size: string) => {
    console.log('CartProvider - Removing item:', { id, size });
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
    toast.success('Producto eliminado del carrito');
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      toast.error('La cantidad debe ser al menos 1');
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Carrito vaciado');
  };

  const value = {
    items: state.items,
    itemCount: state.itemCount,
    total: state.total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
