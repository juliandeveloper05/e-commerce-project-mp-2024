'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  MapPin,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '@/app/context/CartContext';
import type { CartItem } from '@/app/types/cart';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  userEmail: string;
}

const CheckoutForm = ({ items, total, userEmail }: CheckoutFormProps) => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    comentarios: '',
  });

  const formatMensajeWhatsApp = () => {
    const listaProductos = items
      .map(
        (item) =>
          `• ${item.name} (Talla: ${item.size}) x${item.quantity} - $${
            item.price * item.quantity
          }`,
      )
      .join('\n');

    const mensaje = `*🛍️ Nuevo Pedido - Maria Pancha*
------------------
*👤 Cliente:* ${formData.nombre}
*📧 Email:* ${userEmail}
*📱 Teléfono:* ${formData.telefono}
*📍 Dirección:* ${formData.direccion}

*📝 Productos:*
${listaProductos}

*💰 Total:* $${total}

*📌 Comentarios:*
${formData.comentarios || 'Sin comentarios'}

_Pedido generado desde la tienda online_`;

    return encodeURIComponent(mensaje);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.telefono || !formData.direccion) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Crear orden en la base de datos
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          customerInfo: formData,
          userEmail,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Error al crear el pedido');
      }

      const { orderId } = await orderResponse.json();

      // 2. Enviar email de confirmación
      const emailResponse = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          orderDetails: {
            orderNumber: orderId,
            total,
            customerInfo: formData,
            items,
          },
        }),
      });

      if (!emailResponse.ok) {
        console.error('Error al enviar email, pero continuamos el proceso');
      }

      // 3. Limpiar carrito
      clearCart();

      // 4. Abrir WhatsApp
      const whatsappMessage = formatMensajeWhatsApp();
      window.open(
        `https://wa.me/5491126625292?text=${whatsappMessage}`,
        '_blank',
      );

      // 5. Redirigir a página de éxito
      router.push('/pedido-exitoso');
    } catch (error) {
      console.error('Error procesando pedido:', error);
      toast.error('Hubo un error al procesar tu pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <CheckCircle className="h-4 w-4 text-purple-500" />
          Nombre Completo*
        </label>
        <input
          type="text"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full rounded-lg border-2 border-purple-100 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          placeholder="Tu nombre completo"
        />
      </div>

      {/* Teléfono */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <PhoneCall className="h-4 w-4 text-purple-500" />
          Teléfono de Contacto*
        </label>
        <input
          type="tel"
          required
          value={formData.telefono}
          onChange={(e) =>
            setFormData({ ...formData, telefono: e.target.value })
          }
          className="w-full rounded-lg border-2 border-purple-100 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          placeholder="Tu número de teléfono"
        />
      </div>

      {/* Dirección */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 text-purple-500" />
          Dirección de Envío*
        </label>
        <textarea
          required
          value={formData.direccion}
          onChange={(e) =>
            setFormData({ ...formData, direccion: e.target.value })
          }
          className="w-full rounded-lg border-2 border-purple-100 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          rows={3}
          placeholder="Dirección completa para el envío"
        />
      </div>

      {/* Comentarios */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MessageSquare className="h-4 w-4 text-purple-500" />
          Comentarios Adicionales
        </label>
        <textarea
          value={formData.comentarios}
          onChange={(e) =>
            setFormData({ ...formData, comentarios: e.target.value })
          }
          className="w-full rounded-lg border-2 border-purple-100 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          rows={3}
          placeholder="¿Alguna especificación para tu pedido?"
        />
      </div>

      {/* Resumen del pedido */}
      <div className="rounded-lg bg-purple-50 p-4">
        <h3 className="mb-2 font-medium text-purple-900">Resumen del Pedido</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Envío</span>
            <span className="text-green-600">Gratis</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-purple-200 pt-2">
            <span className="font-medium text-purple-900">Total</span>
            <span className="font-bold text-purple-900">${total}</span>
          </div>
        </div>
      </div>

      {/* Botón de envío */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-green-500 px-6 py-3 text-white shadow-lg transition-all hover:bg-green-600 disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          <Send className="h-5 w-5" />
          {isSubmitting ? 'Procesando...' : 'Continuar en WhatsApp'}
        </span>
      </motion.button>

      <p className="text-center text-sm text-gray-500">
        Al continuar, serás redirigido a WhatsApp para finalizar tu pedido
      </p>
    </form>
  );
};

export default CheckoutForm;
