import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese el nombre del producto'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Por favor ingrese el slug del producto'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Por favor ingrese la descripción del producto'],
    },
    price: {
      type: Number,
      required: [true, 'Por favor ingrese el precio del producto'],
      min: [0, 'El precio no puede ser negativo'],
    },
    imageSrc: {
      type: String,
      required: [true, 'Por favor ingrese la URL de la imagen del producto'],
    },
    category: {
      type: String,
      required: [true, 'Por favor seleccione una categoría'],
    },
    stock: {
      type: Number,
      required: [true, 'Por favor ingrese el stock del producto'],
      min: [0, 'El stock no puede ser negativo'],
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
