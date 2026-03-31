import Product from "../models/Product.js";

const syncSimilarProducts = async (productId, newSimilarProductIds = []) => {
  const normalizedIds = [...new Set(newSimilarProductIds.map(String))].filter(
    (id) => id !== String(productId)
  );

  const currentProduct = await Product.findById(productId);

  if (!currentProduct) return;

  const oldIds = (currentProduct.similarProducts || []).map(String);

  const idsToRemove = oldIds.filter((id) => !normalizedIds.includes(id));
  const idsToAdd = normalizedIds.filter((id) => !oldIds.includes(id));

  if (idsToRemove.length > 0) {
    await Product.updateMany(
      { _id: { $in: idsToRemove } },
      { $pull: { similarProducts: productId } }
    );
  }

  if (idsToAdd.length > 0) {
    await Product.updateMany(
      { _id: { $in: idsToAdd } },
      { $addToSet: { similarProducts: productId } }
    );
  }

  currentProduct.similarProducts = normalizedIds;
  await currentProduct.save();
};

export default syncSimilarProducts;