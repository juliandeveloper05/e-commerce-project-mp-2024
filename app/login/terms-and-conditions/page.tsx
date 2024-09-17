'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Términos y Condiciones
          </h1>
          <Link
            href="http://localhost:3000/login"
            className="flex items-center text-white transition-colors duration-200 hover:text-yellow-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Volver al login
          </Link>
        </div>
        <div className="px-6 py-8">
          <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar los servicios de Maria Pancha, usted acepta
              estar sujeto a estos Términos y Condiciones. Si no está de acuerdo
              con alguna parte de estos términos, no podrá acceder al servicio.
            </p>

            <h2>2. Cambios en los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar o reemplazar estos Términos
              en cualquier momento. Es su responsabilidad revisar estos Términos
              periódicamente para cambios.
            </p>

            <h2>3. Privacidad y Protección de Datos</h2>
            <p>
              Su uso de nuestros servicios está también sujeto a nuestra
              Política de Privacidad. Al utilizar nuestros servicios, usted
              consiente a nuestras prácticas de privacidad.
            </p>

            <h2>4. Cuenta de Usuario</h2>
            <p>
              Usted es responsable de mantener la confidencialidad de su cuenta
              y contraseña. Notifíquenos inmediatamente sobre cualquier uso no
              autorizado de su cuenta.
            </p>

            <h2>5. Propiedad Intelectual</h2>
            <p>
              El contenido, características y funcionalidad son propiedad de
              Maria Pancha y están protegidos por leyes internacionales de
              derechos de autor, marcas registradas, patentes, secretos
              comerciales y otros derechos de propiedad intelectual o derechos
              de propiedad.
            </p>

            <h2>6. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso Maria Pancha, sus directores, empleados, socios,
              agentes, proveedores o afiliados serán responsables por cualquier
              daño indirecto, incidental, especial, consecuente o punitivo.
            </p>

            <h2>7. Ley Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              de [tu país/estado], sin tener en cuenta sus disposiciones sobre
              conflictos de leyes.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 sm:px-10">
          <p className="text-xs leading-5 text-gray-500">
            Al utilizar nuestros servicios, usted acepta estos Términos y
            Condiciones. Para cualquier pregunta, contacte a nuestro equipo de
            soporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
