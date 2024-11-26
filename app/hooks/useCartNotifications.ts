import { toast, ToastOptions } from 'react-hot-toast';

export const useCartNotifications = () => {
  const defaultOptions: ToastOptions = {
    duration: 2000,
    position: 'bottom-right',
  };

  const showAddedToCart = (itemId: string, size: string) => {
    toast.success('Producto agregado al carrito', {
      ...defaultOptions,
      id: `cart-add-${itemId}-${size}`, // ID único para prevenir duplicados
    });
  };

  const showRemovedFromCart = (itemId: string, size: string) => {
    toast.success('Producto eliminado del carrito', {
      ...defaultOptions,
      id: `cart-remove-${itemId}-${size}`,
    });
  };

  const showQuantityError = () => {
    toast.error('La cantidad debe ser al menos 1', defaultOptions);
  };

  const showUpdateError = () => {
    toast.error('Error al actualizar la cantidad', defaultOptions);
  };

  const showClearCartSuccess = () => {
    toast.success('Carrito vaciado', defaultOptions);
  };

  const showError = (message: string) => {
    toast.error(message, defaultOptions);
  };

  return {
    showAddedToCart,
    showRemovedFromCart,
    showQuantityError,
    showUpdateError,
    showClearCartSuccess,
    showError,
  };
};
