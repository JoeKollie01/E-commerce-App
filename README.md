🛒 E-Commerce App
===================
A full-featured Node.js-based e-commerce application built with Express.js. This app supports user authentication, product management, and a shopping cart system.

🚀 Features
=============
🛍 Add and remove products from the shopping cart

📦 Admin product management (via routes)

🔐 Session management using cookie-session

🧮 Cart persistence and total calculation

📄 HTML rendering with custom templates

📁 Project Structure
==========================
.
├── routes/
│   ├── admin/
│   │   ├── auth.js          # Authentication routes
│   │   └── products.js      # Admin product routes
│   ├── carts.js             # Cart-related routes
│   └── products.js          # Product display routes
├── repos/
│   ├── carts.js             # Cart repository (data storage/logic)
│   └── products.js          # Product repository
├── views/
│   └── carts/
│       └── show.js          # Template for displaying the cart
├── public/                  # Static assets (CSS, JS, images)
├── index.js                 # Main server file
└── README.md                # Project documentation

🧠 How It Works
=====================
Cart Functionality (routes/carts.js)
Add Product:
POST /cart/products
Creates a new cart or retrieves an existing one. Adds a product or increments quantity if it already exists.

View Cart:
GET /cart
Renders the cart with full product details using cartShowTemplate.

Delete Item:
POST /cart/products/delete
Removes an item from the cart by its ID.

Templating (views/carts/show.js)
Displays all cart items with price calculation.

Uses Array.reduce to compute the total cost.

Includes a simple form to remove items.

Server (index.js)
Sets up middleware like express.static, body-parser, and cookie-session.

Mounts routes for admin, products, and cart handling.

Runs on localhost:8080.

🛠 Tech Stack
=================
Backend: Node.js, Express.js

Templating: Custom JS-based template functions

Session: cookie-session

Storage: In-memory via custom repositories (repos/*.js)

🧪 Running the App
========================
bash
Copy
Edit
# Install dependencies
npm install

# Start the development server
node index.js
Visit http://localhost:8080 in your browser.

🔒 Security Note
===================
The cookieSession middleware uses a simple key. Make sure to replace it with a secure key in production:

app.use(cookieSession({
    keys: ['your-secure-key']
}));
