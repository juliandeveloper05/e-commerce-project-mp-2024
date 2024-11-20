// model/Product.ts
import mongoose from 'mongoose';

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
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
    },
    imageSrc: {
      type: String,
      required: [true, 'Image source is required'],
    },
    imageSwiper: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    sizes: {
      type: [sizeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
