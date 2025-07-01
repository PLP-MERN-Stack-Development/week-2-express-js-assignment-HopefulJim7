---

```markdown
# 🛒 Product Management API

A simple API to manage product listings. It supports filtering, search, and pagination. Built with Node.js, Express, MongoDB, and uses **pnpm** for package management.

---

## 🚀 Getting Started

### 🧩 Installation

```bash
pnpm install
```

### 🔐 Environment Setup

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### ▶️ Run the Server

```bash
pnpm dev
```

---

## 📘 API Endpoints

- `GET /api/products` – list products (supports filters, pagination, search)
- `POST /api/products` – create a product (requires auth)
- `GET /api/products/:id` – get a single product
- `PUT /api/products/:id` – update product (requires auth)
- `DELETE /api/products/:id` – delete product (requires auth)

---

## 🔍 Example Request

```
GET /api/products?category=electronics&inStock=true&page=1&search=laptop
```

### Example Response

```json
{
  "success": true,
  "message": "Products retrieved successfuly",
  "data": {
    "products": [
      {
        "_id": "685c0ee502956c546ba487a6",
        "name": "Smartphone",
        "description": "Latest model with 128GB storage",
        "price": 24000,
        "category": "electronics",
        "inStock": true,
        "id": "5c3eee7a-5690-4a18-9f0d-8eaf29f3348c",
        "createdAt": "...",
        "updatedAt": "...",
        "__v": 0
      }
    ],
    "pagination": {
      "total": 2,
      "page": 1,
      "limit": 10
    }
  }
}
```

---

## 👤 Author

GitHub: [HopefulJim7](https://github.com/HopefulJim7)

---

## 🪪 License

MIT © 2025 Jim Hope

```