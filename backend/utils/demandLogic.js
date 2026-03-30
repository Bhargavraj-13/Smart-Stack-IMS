// ─────────────────────────────────────────────────────────────
// Demand Logic Utility
// Contains simple rule-based logic for low-stock detection and
// restock suggestions — no ML required.
// ─────────────────────────────────────────────────────────────

const LOW_STOCK_THRESHOLD = 5;  // Quantity below which product is "low stock"
const RESTOCK_AMOUNT = 10;       // Default units to suggest restocking

/**
 * Determines whether a product's quantity is below the low-stock threshold.
 * @param {number} quantity - Current product quantity
 * @returns {boolean} true if the product is low on stock
 */
const getLowStockStatus = (quantity) => {
  return quantity < LOW_STOCK_THRESHOLD;
};

/**
 * Returns a restock suggestion based on current quantity.
 * If the product is low on stock, suggest restocking with RESTOCK_AMOUNT units.
 * @param {number} quantity - Current product quantity
 * @returns {number} Suggested restock quantity (0 if stock is sufficient)
 */
const getRestockSuggestion = (quantity) => {
  if (getLowStockStatus(quantity)) {
    return RESTOCK_AMOUNT;
  }
  return 0;
};

module.exports = { getLowStockStatus, getRestockSuggestion, LOW_STOCK_THRESHOLD };
