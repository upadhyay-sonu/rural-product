🛒 Real Rural Products — Premium E-commerce Web Application

A modern, scalable, and production-style e-commerce web application built using React, TypeScript, MobX, and FakeStoreAPI.
This project demonstrates real-world frontend architecture, advanced UI/UX design, and state management techniques similar to platforms like Amazon and Flipkart.

🎯 Project Overview

This application allows users to:

Browse products from an external API

Filter and sort products dynamically

View detailed product information

Add products to cart with quantity control

Experience smooth animations and responsive design

The project focuses on clean architecture, scalability, and user experience.

🚀 Key Features

🛍️ Product Management

Product listing using API (FakeStoreAPI)

Dynamic product detail page using routing

High-quality product cards with animations


🔍 Filtering & Sorting

Category-based filtering:

Electronics

Men's Clothing

Women's Clothing

Sorting options:

Price (Low → High)

Price (High → Low)

Newest First

URL-based state:

Filters persist after refresh

Back/forward navigation supported

Shareable filtered links

🛒 Cart System

Add to cart functionality

Quantity control (+ / -)

Real-time price calculation

Persistent cart using localStorage


💳 Checkout System

Mock checkout flow

Order summary display

Payment mode selection (UI only)


🎨 UI / UX Design

Premium dark + orange theme

Clean, modern card-based layout

Smooth hover and transition effects

Micro-interactions for better UX

🎬 Animations

Card hover animations (lift + glow)

Button click feedback (scale)

Smooth transitions between UI states


📱 Responsiveness

Mobile-first design

Fully responsive grid layout

Optimized for desktop, tablet, and mobile


♿ Accessibility

Semantic HTML elements (main, section, nav)

Accessible buttons (aria-label)

Proper image alt text


🛠️ Tech Stack

Frontend

React (Create React App)

TypeScript

React Router DOM

State Management

MobX

Context API

Styling

Tailwind CSS

API

FakeStoreAPI

https://fakestoreapi.com/


⚙️ Setup & Installation Guide

Follow these steps carefully to run the project locally:

✅ Prerequisites

Make sure you have:

Node.js (v14 or higher recommended)
npm or yarn

A modern browser (Chrome recommended)

📥 Step 1: Clone the Repository
git clone https://github.com/upadhyay-sonu/Rural-products

cd Rural farming food

📦 Step 2: Install Dependencies

npm install

▶️ Step 3: Run the Application

npm start

🌐 Step 4: Open in Browser


http://localhost:3000/

👉 The app will automatically redirect to:

/advanced-products

🏗️ Step 5: Build for Production 
npm run build
Creates optimized build in /build folder
Ready for deployment

📜 Available Scripts
Command	Description

npm start	Runs development server

npm test	Runs test cases

npm run build	Creates production build

npm run eject	Exposes config 

📁 Project Structure
src/

│── components/        # Reusable UI components

│── pages/             # Main pages (Home, Product, Cart, Checkout)

│── store/             # MobX store (cart management)

│── context/           # Context API wrapper

│── services/          # API layer (data fetching)

│── styles/            # Tailwind + global styles

│── App.tsx            # Main routing

│── index.tsx          # Entry point

🔄 API Integration

This project uses FakeStoreAPI:

Get all products
/products
Get products by category
/products/category/:category
Important Note
Filtering is done using API calls
No local filtering (as per requirement)


 🧪 End-to-End Testing (Cypress)

This project includes **End-to-End
(E2E) testing** using Cypress to ensure reliability of core features like product listing, cart functionality, and navigation.

---

📦 Install Cypress


npm install cypress --save-dev



💾 Cart Persistence
Cart is stored in localStorage
Automatically restored on reload
Ensures consistent user experience

🎬 Animation Details
Hover animations on product cards
Button interaction animations
Smooth UI transitions
Enhanced user feedback

⚠️ Assumptions
API is always available
No user authentication required
Users interact as guests

🚫 Limitations

No backend (frontend-only application)

No real payment gateway integration

Limited product categories (API restriction)

No order history storage

✨ Additional Features (Beyond Assignment)

Premium UI (dark + orange theme)

Advanced filtering with URL sharing

Enhanced cart functionality (+ / - controls)

Animated UI interactions

Improved UX beyond basic requirements


🎯 Key Highlights 

Scalable frontend architecture

Clean and maintainable code

Real-world e-commerce design

Advanced state management using MobX

Focus on performance and UX


👨‍💻 Author
Sonu Upadhyaya

📚 Learn More

React Docs: https://reactjs.org/

CRA Docs: https://facebook.github.io/create-react-app/docs/getting-started
