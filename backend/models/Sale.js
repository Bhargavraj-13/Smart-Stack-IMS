const mongoose = require('mongoose');

// Sale schema to track individual sale events
const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      min: [1, 'Quantity sold must be at least 1'],
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sale', saleSchema);
