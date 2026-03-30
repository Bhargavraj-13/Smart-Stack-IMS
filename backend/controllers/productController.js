const Product = require('../models/Product');
const { getLowStockStatus, getRestockSuggestion } = require('../utils/demandLogic');

// Helper: enrich a plain product object with demand intelligence fields
const enrichProduct = (product) => ({
  ...product,
  lowStock: getLowStockStatus(product.quantity),
  restockSuggestion: getRestockSuggestion(product.quantity),
});

// GET /products — retrieve all products with low-stock & restock data
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const enriched = products.map((p) => enrichProduct(p.toObject()));
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /products — create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;
    const product = await Product.create({ name, price, quantity, category });
    res.status(201).json(enrichProduct(product.toObject()));
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
};

// PUT /products/:id — update an existing product
const updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, category },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(enrichProduct(product.toObject()));
  } catch (error) {
    res.status(400).json({ message: 'Update error', error: error.message });
  }
};

// DELETE /products/:id — remove a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
