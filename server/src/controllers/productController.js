import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import getAvailability from "../utils/getAvailability.js";
import syncSimilarProducts from "../utils/syncSimilarProducts.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      section,
      similarProducts = []
    } = req.body;

    const availability = getAvailability(Number(stock));

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      section,
      availability,
      similarProducts: []
    });

    await syncSimilarProducts(product._id, similarProducts);

    const populatedProduct = await Product.findById(product._id).populate(
      "similarProducts",
      "name category price stock section availability"
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("similarProducts", "name category price stock section availability")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "similarProducts",
      "name category price stock section availability"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const updatedData = {
      name: req.body.name ?? existingProduct.name,
      category: req.body.category ?? existingProduct.category,
      price: req.body.price ?? existingProduct.price,
      stock: req.body.stock ?? existingProduct.stock,
      section: req.body.section ?? existingProduct.section
    };

    updatedData.availability = getAvailability(Number(updatedData.stock));

    await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    if (req.body.similarProducts) {
      await syncSimilarProducts(req.params.id, req.body.similarProducts);
    }

    const updatedProduct = await Product.findById(req.params.id).populate(
      "similarProducts",
      "name category price stock section availability"
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await Product.updateMany(
      { similarProducts: req.params.id },
      { $pull: { similarProducts: req.params.id } }
    );

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
};

export const sellProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available"
      });
    }

    product.stock -= quantity;
    product.availability = getAvailability(product.stock);

    await product.save();

    await Sale.create({
      productId: product._id,
      quantitySold: quantity,
      priceAtSale: product.price,
      revenue: product.price * quantity
    });

    res.status(200).json({
      success: true,
      message: "Product stock updated after sale",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sell product",
      error: error.message
    });
  }
};

export const getMostSoldProductToday = async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const topProduct = await Sale.aggregate([
      {
        $match: {
          soldAt: { $gte: since }
        }
      },
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantitySold" }
        }
      },
      {
        $sort: {
          totalSold: -1
        }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      }
    ]);

    if (topProduct.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No sales found in the last 24 hours",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      data: {
        productId: topProduct[0].product._id,
        name: topProduct[0].product.name,
        category: topProduct[0].product.category,
        totalSold: topProduct[0].totalSold
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch most sold product",
      error: error.message
    });
  }
};

export const restockProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    product.stock += quantity;
    product.availability = getAvailability(product.stock);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product restocked successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to restock product",
      error: error.message
    });
  }
};