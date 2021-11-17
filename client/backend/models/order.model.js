const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Cannot be empty'],
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'Cannot be empty'],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'Cannot be empty'],
    },
    status: {
      // Order status: New, Pending, Approved...
      type: String,
    },
    totalAmount: {
      // Order total money
      type: Number,
    },
    details: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
