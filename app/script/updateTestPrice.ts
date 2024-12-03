import { dbConnect } from '../utils/db';
import Product from '../model/Product';

async function updatePrice() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    const result = await Product.updateOne(
      { name: 'Pantufla Ojo Turco' },
      { $set: { price: 100 } },
    );

    if (result.modifiedCount > 0) {
      const updatedProduct = await Product.findOne({
        name: 'Pantufla Ojo Turco',
      });
      console.log('Updated product:', updatedProduct);
    } else {
      const existingProduct = await Product.findOne({
        name: 'Pantufla Ojo Turco',
      });
      console.log('Current product:', existingProduct);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

updatePrice();
