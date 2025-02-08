'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

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
  userId?: string;
  userEmail?: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { id: string; size: string; quantity: number };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }
  | { type: 'SET_USER'; payload: { userId: string; userEmail: string } }
  | { type: 'REMOVE_USER' };

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
};

const CartContext = createContext<{
  items: CartItem[];
  itemCount: number;
  total: number;
  userId?: string;
  userEmail?: string;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
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
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      if (state.userId) {
        localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newState));
      }

      return newState;
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        (item) =>
          !(
            item._id === action.payload.id && item.size === action.payload.size
          ),
      );

      const newState = {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      if (state.userId) {
        localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newState));
      }

      return newState;
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item._id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );

      const newState = {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      if (state.userId) {
        localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newState));
      }

      return newState;
    }

    case 'SET_USER': {
      const savedCart = localStorage.getItem(`cart_${action.payload.userId}`);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        return {
          ...parsedCart,
          userId: action.payload.userId,
          userEmail: action.payload.userEmail,
        };
      }
      return {
        ...initialState,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
      };
    }

    case 'REMOVE_USER': {
      if (state.userId) {
        localStorage.setItem(
          `cart_${state.userId}`,
          JSON.stringify({
            ...state,
            userId: undefined,
            userEmail: undefined,
          }),
        );
      }
      return initialState;
    }

    case 'CLEAR_CART': {
      if (state.userId) {
        localStorage.removeItem(`cart_${state.userId}`);
      }
      return initialState;
    }

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      dispatch({
        type: 'SET_USER',
        payload: {
          userId: session.user.id,
          userEmail: session.user.email || '',
        },
      });
    } else {
      dispatch({ type: 'REMOVE_USER' });
    }
  }, [session]);

  const addItem = async (item: CartItem) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: item });
      toast.success('Producto agregado al carrito');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error al agregar al carrito');
    }
  };

  const removeItem = (id: string, size: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error al eliminar el producto');
    }
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      toast.error('La cantidad debe ser al menos 1');
      return;
    }

    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error al actualizar la cantidad');
    }
  };

  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Carrito vaciado');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error al vaciar el carrito');
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount: state.itemCount,
        total: state.total,
        userId: state.userId,
        userEmail: state.userEmail,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
