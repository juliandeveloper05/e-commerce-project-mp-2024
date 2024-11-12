import mongoose from 'mongoose';

// Interfaz para el objeto size
interface Size {
  size: string;
}

// Interfaz principal del producto
export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  slug: string;
  imageSrc: string;
  imageSwiper?: string[];
  description?: string;
  sizes?: Size[];
}

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese el nombre del producto'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Por favor ingrese el precio del producto'],
      min: [0, 'El precio no puede ser negativo'],
    },
    slug: {
      type: String,
      required: [true, 'Por favor ingrese el slug del producto'],
      unique: true,
      trim: true,
    },
    imageSrc: {
      type: String,
      required: [true, 'Por favor ingrese la URL de la imagen del producto'],
    },
    imageSwiper: {
      type: [String],
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    sizes: {
      type: [sizeSchema],
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
