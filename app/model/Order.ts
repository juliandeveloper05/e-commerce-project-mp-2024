import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  reference_id: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending',
  },
  paymentId: String,
  paymentDetails: mongoose.Schema.Types.Mixed,
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      size: String,
    },
  ],
  buyer: {
    id: String,
    email: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
