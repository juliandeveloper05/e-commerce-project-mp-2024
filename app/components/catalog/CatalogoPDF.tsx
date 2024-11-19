import React from 'react';

const productos = [
  {
    id: 1,
    nombre: 'Pantufla Bob Esponja',
    precio: 8500,
    imagen: '/productCard/pantufla3.jpg',
    tallas: ['CH', 'MD', 'GR'],
  },
  {
    id: 2,
    nombre: 'Pantufla Kitty',
    precio: 8500,
    imagen: '/productCard/pantufla1.jpg',
    tallas: ['CH', 'MD', 'GR'],
  },
];

const CatalogoWeb = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 print:bg-white">
      {/* Portada */}
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <img
          src="/maria-pancha-logo.jpg"
          alt="MP Logo"
          className="h-40 w-40 rounded-full object-cover shadow-lg"
        />
        <h1 className="mt-8 text-4xl font-bold text-purple-600">
          MP Pantuflones
        </h1>
        <p className="mt-4 text-xl text-gray-600">Catálogo 2024</p>
      </div>

      {/* Productos */}
      <div className="p-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-purple-600">
          Nuestra Colección
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="overflow-hidden rounded-lg bg-white p-4 shadow-lg print:break-inside-avoid"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-64 w-full rounded-lg object-cover"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {producto.nombre}
                </h3>
                <p className="mt-2 text-xl font-bold text-purple-600">
                  ${producto.precio}
                </p>
                <div className="mt-2 flex gap-2">
                  {producto.tallas.map((talla) => (
                    <span
                      key={talla}
                      className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pie de página */}
      <footer className="mt-16 bg-purple-600 p-8 text-center text-white">
        <h3 className="text-xl font-bold">MP María Pancha Pantuflones</h3>
        <div className="mt-4 space-y-2">
          <p>WhatsApp: +54 9 11 2662-5292</p>
          <p>Instagram: @pantuflonesmariapancha</p>
          <p>Facebook: MP María Pancha</p>
        </div>
      </footer>

      <button
        onClick={() => window.print()}
        className="fixed bottom-8 right-8 rounded-full bg-purple-600 px-6 py-3 text-white shadow-lg hover:bg-purple-700 print:hidden"
      >
        Generar PDF
      </button>
    </div>
  );
};

export default CatalogoWeb;
