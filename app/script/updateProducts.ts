import { dbConnect } from '../utils/db';
import Product from '../model/Product';

async function updateProducts() {
  try {
    await dbConnect();

    // Actualizar las rutas de imágenes que usan /productCard/ a /products/
    const result = await Product.updateMany(
      { imageSrc: { $regex: '/productCard/' } },
      [
        {
          $set: {
            imageSrc: {
              $replaceOne: {
                input: '$imageSrc',
                find: '/productCard/',
                replacement: '/products/',
              },
            },
          },
        },
      ],
    );

    // Añadir descripción por defecto a productos que no la tienen
    await Product.updateMany(
      { description: { $exists: false } },
      {
        $set: {
          description:
            'Pantuflas cómodas y suaves, perfectas para el uso diario. Diseñadas con materiales de alta calidad y suela antideslizante para mayor seguridad.',
        },
      },
    );

    console.log(`Updated ${result.modifiedCount} image paths`);

    // Verificar la actualización
    const products = await Product.find({});
    console.log('Current products:', JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    process.exit(0);
  }
}

updateProducts();
