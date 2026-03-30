const Sale = require('../models/Sale');
const Product = require('../models/Product');

// POST /sales/:productId — record a sale and reduce product quantity
const recordSale = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantitySold } = req.body;

    if (!quantitySold || quantitySold < 1) {
      return res.status(400).json({ message: 'quantitySold must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.quantity < quantitySold) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Deduct sold units from inventory
    product.quantity -= quantitySold;
    await product.save();

    // Persist the sale record
    const sale = await Sale.create({ productId, quantitySold });

    res.status(201).json({ message: 'Sale recorded', sale, updatedProduct: product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /sales/analytics — top seller and total sales count
const getAnalytics = async (req, res) => {
  try {
    const totalSales = await Sale.countDocuments();

    // Aggregate total units sold per product
    const topSellers = await Sale.aggregate([
      { $group: { _id: '$productId', totalSold: { $sum: '$quantitySold' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
    ]);

    res.json({
      totalSales,
      topSeller: topSellers[0] || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { recordSale, getAnalytics };
