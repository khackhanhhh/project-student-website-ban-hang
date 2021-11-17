const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Cannot be empty'],
    },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    guarantee: { type: Number, required: true },
    description: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    uploadedImage: {
      type: String
    }
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', ProductSchema);
