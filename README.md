# ShopifyNestHub Backend

Express + MongoDB backend for the ShopifyNestHub ecommerce project. Provides auth endpoints and admin CRUD for brands, categories, and sub-categories.

## Tech Stack
- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT, bcrypt

## Getting Started
1) Install dependencies

```bash
npm install
```

2) Create a `.env` file

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
ACCESS_TOKEN_SECRET=replace_me
ACCESS_TOKEN_EXPIRES_IN=1d
```

3) Run the server

```bash
npm run dev
```

## Scripts
- `npm run dev` - start with nodemon
- `npm start` - start with node

## API Routes
Base URL: `http://localhost:3000/api/v1`

Auth
- `POST /auth/register`
- `POST /auth/login`

Admin Auth
- `POST /admin/auth/login`

Admin Categories
- `POST /admin/categories/create`
- `PUT /admin/categories/update/:id`
- `GET /admin/categories/:id`
- `DELETE /admin/categories/:id`
- `GET /admin/categories/`

Admin Sub-Categories
- `POST /admin/sub-categories/create`
- `PUT /admin/sub-categories/update/:id`
- `GET /admin/sub-categories/:id`
- `DELETE /admin/sub-categories/:id`
- `GET /admin/sub-categories/`

Admin Brands
- `POST /admin/brands/create`
- `PUT /admin/brands/update/:id`
- `GET /admin/brands/:id`
- `DELETE /admin/brands/:id`
- `GET /admin/brands/`

## Notes
- CORS is enabled for `http://localhost:5173` in [src/app.js](src/app.js#L12).
- The database name is appended as `/shopifynest` in [src/config/db.js](src/config/db.js#L6).
