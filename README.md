# Smart Stack IMS

A full-stack **Inventory Management System** with demand prediction and restocking suggestions, built with React, Node.js + Express, and MongoDB.

## Features

- **Product CRUD** – Add, view, edit, and delete inventory items
- **Low Stock Alerts** – Products with quantity < 5 are flagged automatically
- **Restock Suggestions** – System suggests restocking 10 units when stock is low
- **Sales Tracking** – Record sales and reduce inventory in real time
- **Analytics** – View total sales count and top-selling product

## Tech Stack

- **Frontend**: React 18 (Vite), Axios
- **Backend**: Node.js + Express 4
- **Database**: MongoDB + Mongoose

## Project Structure

```
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/
│   │   ├── productController.js
│   │   └── salesController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Sale.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── salesRoutes.js
│   ├── utils/demandLogic.js    # Low-stock + restock logic
│   └── server.js
└── frontend/
    └── src/
        ├── api.js              # Axios API calls
        ├── App.jsx
        └── components/
            ├── ProductList.jsx
            ├── ProductCard.jsx
            ├── ProductForm.jsx
            └── Analytics.jsx
```

## Setup & Run

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally on port 27017

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env if your MongoDB URI differs
npm install
npm run dev
# API available at http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:3000
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (enriched with lowStock + restockSuggestion) |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| POST | `/api/sales/:productId` | Record a sale |
| GET | `/api/sales/analytics` | Get sales analytics |

## Demand Logic

Located in `backend/utils/demandLogic.js`:

```js
// Product is low stock when quantity < 5
getLowStockStatus(quantity) → boolean

// Suggest restocking 10 units when low stock
getRestockSuggestion(quantity) → number
```
