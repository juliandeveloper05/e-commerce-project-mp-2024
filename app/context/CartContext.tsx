'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { debugLocalStorage } from '@/app/utils/debugStorage';

// Tipos
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

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
};

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (!state.items) {
        state.items = [];
      }

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size,
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      } else {
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

    case 'CLEAR_CART':
      debugLocalStorage.removeItem('cart');
      return initialState;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const savedCart = debugLocalStorage.getItem('cart');
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      debugLocalStorage.removeItem('cart');
    }
  }, []);

  const addItem = async (item: CartItem) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: item });
      toast.success('Producto agregado al carrito', {
        id: `add-${item._id}-${item.size}`,
        duration: 2000,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error al agregar al carrito', {
        id: `add-error-${item._id}-${item.size}`,
      });
    }
  };

  const removeItem = (id: string, size: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
      // Eliminamos la notificación de aquí para evitar duplicados
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error al eliminar el producto', {
        id: `remove-error-${id}-${size}`,
      });
    }
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      toast.error('La cantidad debe ser al menos 1', {
        id: `quantity-error-${id}-${size}`,
      });
      return;
    }

    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error al actualizar la cantidad', {
        id: `update-error-${id}-${size}`,
      });
    }
  };

  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Carrito vaciado', {
        id: 'clear-cart',
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error al vaciar el carrito', {
        id: 'clear-cart-error',
      });
    }
  };

  const value: CartContextType = {
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
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Hook opcional para manejar las notificaciones del carrito
export const useCartNotifications = () => {
  return {
    notifyAdded: (id: string, size: string) => {
      toast.success('Producto agregado al carrito', {
        id: `add-${id}-${size}`,
        duration: 2000,
        position: 'bottom-right',
      });
    },
    notifyRemoved: (id: string, size: string) => {
      toast.success('Producto eliminado del carrito', {
        id: `remove-${id}-${size}`,
        duration: 2000,
        position: 'bottom-right',
      });
    },
    notifyError: (message: string, id: string) => {
      toast.error(message, {
        id,
        duration: 2000,
        position: 'bottom-right',
      });
    },
  };
};
