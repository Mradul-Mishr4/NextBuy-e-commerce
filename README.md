# 🛒 NextBuy - Full-Stack E-Commerce Web Application

[![GitHub stars](https://img.shields.io/github/stars/your-username/NextBuy?style=social)](https://github.com/your-username/NextBuy/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/NextBuy?style=social)](https://github.com/your-username/NextBuy/network)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

NextBuy is a **full-stack e-commerce web application** built with **React.js, Node.js, Express.js, and MongoDB**.  
It provides a **modern responsive design**, **shopping cart functionality**, **multiple payment gateways**, and a **robust admin panel** for product and order management.

---

## ✨ Features

### 👤 Customer Features
- 🔍 **Product Browsing** – Search, filter, and explore products easily  
- 🛒 **Shopping Cart** – Add, remove, update items & view totals  
- 🔑 **User Authentication** – Secure login & registration with JWT  
- 💳 **Multiple Payment Options**:
  - 🏠 Cash on Delivery (COD)  
  - 💵 Stripe  
  - 💳 Razorpay  
- 📦 **Order Management** – Track status & order history  
- 📱 **Responsive UI** – Tailwind CSS, mobile-first design  
- 🌙 **Dark Mode** – Toggle between light & dark themes  

### 🛠️ Admin Features
- 📦 **Product Management** – Add, edit, delete products  
- 📊 **Order Management** – View & update order status  
- 🖼️ **Image Upload** – Cloudinary integration  
- 📈 **Dashboard** – Business metrics & insights  

---

## ⚡ Tech Stack

### 🎨 Frontend
![React](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=black)  
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)  
![Toastify](https://img.shields.io/badge/React_Toastify-FF6F61?style=for-the-badge&logo=react&logoColor=white)  

### ⚙️ Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)  
![Multer](https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=node-dot-js&logoColor=black)  
![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white)  

### 💳 Payment Gateways
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)  
![Razorpay](https://img.shields.io/badge/Razorpay-0C9D58?style=for-the-badge&logo=razorpay&logoColor=white)  

---


## 📂 Project Structure
```
ecommerce-app/
├── frontend/ # React.js frontend
├── backend/ # Node.js backend
├── admin/ # Admin panel
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v14+)  
- MongoDB Atlas / Local MongoDB  
- Stripe account  
- Razorpay account  
- Cloudinary account  

### ⚡ Installation
```bash
# Clone repository
git clone <repository-url>
cd ecommerce-app

# Setup backend
cd backend && npm install

# Setup frontend
cd ../frontend && npm install

# Setup admin
cd ../admin && npm install
```
backend/.env
```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123

CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_NAME=your_cloudinary_name

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

```
frontend/.env
```bash
VITE_BACKEND_URL=http://localhost:3000
```

admin/.env
```bash
VITE_BACKEND_URL=http://localhost:3000
```
Running the App
```bash
# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev

# Start admin panel
cd admin && npm run dev
```
## 📚 API Endpoints

### 🔑 Authentication
- `POST /api/user/register` – Register  
- `POST /api/user/login` – Login  
- `POST /api/user/admin` – Admin login  

### 📦 Products
- `GET /api/product/list` – Get all products  
- `POST /api/product/add` – Add product (Admin)  
- `POST /api/product/remove` – Remove product (Admin)  

### 🛒 Orders
- `POST /api/order/place` – Place COD order  
- `POST /api/order/stripe` – Stripe payment  
- `POST /api/order/razorpay` – Razorpay payment  
- `POST /api/order/userOrders` – User’s orders  
- `POST /api/order/list` – All orders (Admin)  

### 🛍️ Cart
- `POST /api/cart/add` – Add item  
- `POST /api/cart/update` – Update item  
- `POST /api/cart/get` – Get user’s cart  

---

## 🔒 Security
- ✔️ JWT Authentication  
- ✔️ Password Hashing  
- ✔️ Input Validation  
- ✔️ Admin Route Protection  
- ✔️ CORS Configured  

---

## 🌍 Deployment
- **Backend**: Vercel / Railway / Heroku  
- **Frontend**: Netlify / Vercel  
- **Admin**: Netlify / Vercel  

---

## 👨‍💻 Author
**Mradul Mishra**  

---

## ⭐ Support
If you find this project helpful, please **star 🌟 the repo** and share it with others!  


