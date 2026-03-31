import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantitySold: {
      type: Number,
      default: 1,
      min: 1
    },
    priceAtSale: {
      type: Number,
      required: true,
      min: 0
    },
    revenue: {
      type: Number,
      required: true,
      min: 0
    },
    soldAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;