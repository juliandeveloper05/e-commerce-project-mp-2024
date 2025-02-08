
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  reference_id: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending_payment', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending_payment'
  },
  items: [{
    _id: String,
    name: String,
    price: Number,
    quantity: Number,
    size: String
  }],
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  total: {
    type: Number,
    required: true
  },
  comments: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Actualizar updatedAt antes de cada actualización
orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;