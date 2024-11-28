'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Send, MessageCircle, Mail, MapPin } from 'lucide-react';

interface ContactOption {
  title: string;
  description: string;
  whatsapp: string;
  instagram?: string;
}

interface ContactOptions {
  customer: ContactOption;
  technical: ContactOption;
}

const ContactSection = () => {
  const [selectedOption, setSelectedOption] = useState<
    'customer' | 'technical'
  >('customer');

  const contactOptions: ContactOptions = {
    customer: {
      title: 'Atención al Cliente',
      description: 'Consultas sobre productos y pedidos',
      whatsapp: '5491126625292',
      instagram: 'pantuflonesmariapancha',
    },
    technical: {
      title: 'Soporte Técnico',
      description: 'Ayuda con el sitio web',
      whatsapp: '5491130666369',
    },
  };

  const selected = contactOptions[selectedOption];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-xl"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Contactanos
            </h1>
            <p className="text-lg text-gray-600">
              Estamos aquí para ayudarte en lo que necesites
            </p>
          </div>

          {/* Contact Options */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {/* Customer Service */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOption('customer')}
              className={`cursor-pointer rounded-xl p-6 transition-all ${
                selectedOption === 'customer'
                  ? 'bg-purple-50 ring-2 ring-purple-500'
                  : 'bg-gray-50 hover:bg-purple-50/50'
              }`}
            >
              <MessageCircle className="mb-4 h-8 w-8 text-purple-600" />
              <h3 className="mb-2 text-xl font-semibold">
                Atención al Cliente
              </h3>
              <p className="text-gray-600">
                Consultas sobre productos, pedidos y envíos
              </p>
            </motion.div>

            {/* Technical Support */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOption('technical')}
              className={`cursor-pointer rounded-xl p-6 transition-all ${
                selectedOption === 'technical'
                  ? 'bg-purple-50 ring-2 ring-purple-500'
                  : 'bg-gray-50 hover:bg-purple-50/50'
              }`}
            >
              <Send className="mb-4 h-8 w-8 text-purple-600" />
              <h3 className="mb-2 text-xl font-semibold">Soporte Técnico</h3>
              <p className="text-gray-600">
                Ayuda con problemas técnicos del sitio
              </p>
            </motion.div>
          </div>

          {/* Contact Details */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {selected.title}
            </h3>
            <p className="text-gray-600">{selected.description}</p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${selected.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-green-500 px-6 py-4 text-white transition-all hover:bg-green-600"
              >
                <FaWhatsapp className="h-6 w-6" />
                <span>WhatsApp</span>
              </motion.a>

              {/* Instagram Button - Only for Customer Service */}
              {selected.instagram && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://instagram.com/${selected.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white transition-all hover:opacity-90"
                >
                  <FaInstagram className="h-6 w-6" />
                  <span>Instagram</span>
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Email and Location Section */}
          <div className="mt-8 w-full rounded-xl bg-gray-50 p-4 sm:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-6 w-6 flex-shrink-0 text-purple-600" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <a
                    href="mailto:gabrielafannyescobar@gmail.com"
                    className="break-all text-gray-600 transition-colors hover:text-purple-600"
                  >
                    gabrielafannyescobar@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Ubicación</h4>
                  <p className="text-gray-600">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
