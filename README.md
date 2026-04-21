# 🛒 SHOPIFY — Full-Stack E-Commerce Application

> A modern, feature-rich e-commerce platform built with **Spring Boot** (Backend) and **Vanilla HTML/CSS/JS + Bootstrap** (Frontend), integrated with **Razorpay** for seamless payments and **Spring Mail** for transactional emails.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Payment Integration](#payment-integration)
- [Email Notifications](#email-notifications)
- [Author](#author)

---

## 🌟 Overview

**Shopify** is a full-stack e-commerce web application that allows users to browse products (Gadgets, Clothing, Electronics), add items to a cart, place orders, and pay securely online via Razorpay. Upon successful payment, an order confirmation email is dispatched automatically.

---

## ✨ Features

- 🏠 **Homepage** with hero banner carousel and categorized product listings (Gadgets, Clothing, Electronics)
- 🔍 **Live Search** to filter products in real-time
- 📄 **Product Detail Page** — Dedicated view with full product information
- 🛒 **Shopping Cart** — Add, remove, and manage cart items with live counter badge
- 👤 **User Authentication** — Register & Login with session-based state
- 📦 **Order Management** — Place orders and view order history with item-level detail
- 💳 **Razorpay Payment Gateway** — Secure INR payments with order creation & verification
- 📧 **Transactional Emails** — Welcome email on registration + Order confirmation with itemized receipt
- 👤 **My Profile** — View and manage user account details
- 📱 **Responsive Design** — Mobile-friendly via Bootstrap 5

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17+ | Core language |
| Spring Boot | REST API framework |
| Spring Data JPA | ORM & database access |
| MySQL | Relational database |
| Razorpay Java SDK | Payment gateway integration |
| Spring Mail (JavaMailSender) | Email notifications |
| Jakarta Persistence (JPA) | Entity mapping |

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 (Vanilla) | Custom styling |
| JavaScript (ES6+) | Dynamic behavior & API calls |
| Bootstrap 5 | Responsive UI components |
| Font Awesome 7 | Icons |

---

## 📁 Project Structure

```
E-commerce/
├── backend/
│   └── ECommerce/
│       └── src/main/java/com/example/ECommerce/
│           ├── Controller/
│           │   ├── ProductController.java    # Product CRUD endpoints
│           │   ├── OrderController.java      # Order placement & retrieval
│           │   ├── PaymentController.java    # Razorpay order creation & update
│           │   └── UserController.java       # User registration & login
│           ├── Service/
│           │   ├── ProductService.java       # Product business logic
│           │   ├── OrderService.java         # Order processing logic
│           │   ├── PaymentService.java       # Razorpay integration logic
│           │   ├── UserService.java          # User authentication logic
│           │   └── EmailService.java         # Email dispatching (welcome + order)
│           ├── Entities/
│           │   ├── Product.java              # Product entity
│           │   ├── User.java                 # User entity (with orders relation)
│           │   ├── Orders.java               # Order entity
│           │   ├── OrderItem.java            # Order line-item entity
│           │   └── PaymentOrder.java         # Razorpay payment record entity
│           ├── DTO/
│           │   ├── OrderDTO.java
│           │   ├── OrderItemDTO.java
│           │   └── OrderRequest.java
│           ├── Repository/                   # Spring Data JPA repositories
│           └── ECommerceApplication.java     # Main entry point
├── frontend/
│   ├── index.html          # Homepage (product listing + hero carousel)
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── cart.html           # Shopping cart page
│   ├── productView.html    # Individual product detail page
│   ├── orders.html         # User order history list
│   ├── orderDetail.html    # Detailed view of a single order
│   ├── myProfile.html      # User profile page
│   ├── js/
│   │   ├── script.js       # Homepage product fetching & search filter
│   │   ├── cart.js         # Cart logic, payment initiation
│   │   ├── productView.js  # Product detail page logic
│   │   ├── orders.js       # Order history fetching
│   │   ├── register.js     # Registration form handler
│   │   ├── myProfile.js    # Profile page logic
│   │   └── navbar-auth.js  # Auth-aware navbar (login/logout/profile)
│   ├── Styling/
│   │   └── style.css       # Global custom CSS
│   └── images/             # Static assets (logo, banners, etc.)
├── ecommerce1.sql           # Database schema / seed script
└── README.md
```

---

## 🔌 API Endpoints

### 👤 Users — `/users`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/register` | Register a new user |
| `POST` | `/users/login` | Login with email & password |
| `GET`  | `/users/getAll-users` | Get all users *(admin)* |

### 📦 Products — `/products`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/products` | Fetch all products |
| `GET`    | `/products/{productId}` | Fetch a single product by ID |
| `POST`   | `/products/add` | Add a new product |
| `DELETE` | `/products/delete/{id}` | Delete a product by ID |

### 🧾 Orders — `/order`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/order/place/{userid}` | Place a new order for a user |
| `GET`  | `/order/getAllOrders` | Fetch all orders *(admin)* |
| `GET`  | `/order/user-Order/{userid}` | Fetch all orders for a specific user |

### 💳 Payments — `/payment`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/payment/create-order` | Create a Razorpay payment order |
| `POST` | `/payment/update-order` | Update payment status after verification |

---

## 🖥️ Frontend Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Product categories, hero carousel, search |
| Product Detail | `productView.html` | Full info for a single product |
| Cart | `cart.html` | Cart items, quantities, Razorpay checkout |
| Login | `login.html` | User login form |
| Register | `register.html` | New user registration form |
| My Orders | `orders.html` | List of user's past orders |
| Order Detail | `orderDetail.html` | Itemized detail view for one order |
| My Profile | `myProfile.html` | User account details |

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8+
- A Razorpay account (for API keys)
- A Gmail account (for Spring Mail SMTP)
- Any modern browser

---

### 🔧 Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyushPalariya/E_Commerce-SHOPIFY-.git
   cd E-commerce/backend/ECommerce
   ```

2. **Import the database**
   ```bash
   mysql -u root -p < ../../ecommerce1.sql
   ```

3. **Configure `application.properties`**

   Edit `src/main/resources/application.properties`:
   ```properties
   # Database
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update

   # Mail
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your_email@gmail.com
   spring.mail.password=your_app_password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true

   # Razorpay
   razorpay.key_id=your_razorpay_key_id
   razorpay.key_secret=your_razorpay_key_secret
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

   The backend will start at: `http://localhost:8080`

---

### 🌐 Frontend Setup

No build step required — the frontend is pure HTML/CSS/JS.

1. Navigate to the `frontend/` directory.
2. Open `index.html` in your browser, or serve it with a local server:
   ```bash
   # Using VS Code Live Server extension (recommended)
   # OR using Python
   python -m http.server 5500
   ```
3. Ensure the backend is running on port `8080` (the JS files call `http://localhost:8080`).

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `spring.datasource.url` | MySQL connection URL |
| `spring.datasource.username` | MySQL username |
| `spring.datasource.password` | MySQL password |
| `spring.mail.username` | Gmail address used for sending emails |
| `spring.mail.password` | Gmail App Password (not regular password) |
| `razorpay.key_id` | Razorpay API Key ID |
| `razorpay.key_secret` | Razorpay API Secret Key |

> ⚠️ **Never commit your `application.properties` with real credentials to version control.** Use environment variables or a `.env` file with a secrets manager in production.

---

## 💳 Payment Integration

This project uses **Razorpay** for payment processing:

1. User clicks **Checkout** on the cart page.
2. Frontend calls `POST /payment/create-order` with order amount & details.
3. Backend creates a Razorpay order and returns the `order_id`.
4. Frontend opens the **Razorpay payment modal**.
5. On successful payment, frontend calls `POST /payment/update-order` with `paymentId`, `orderId`, and `status=Confirmed`.
6. Backend verifies and persists the payment, then triggers the confirmation email.

---

## 📧 Email Notifications

Two automatic emails are sent via **Spring JavaMailSender**:

| Trigger | Email Content |
|---------|---------------|
| User Registration | Welcome message with account details (Name, Email, Phone) |
| Successful Payment | Order confirmation with itemized product table, total amount, paymentId & orderId |

---

## 👨‍💻 Author

**Ayush Palariya**

- 📧 [eyshopy69@gmail.com](mailto:eyshopy69@gmail.com)
- 🔗 [GitHub](https://github.com/AyushPalariya)

---

© 2025 Shopify | Designed by **Ayush** 🛍️
