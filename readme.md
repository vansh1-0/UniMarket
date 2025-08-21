# UniMarket 🛒

A peer-to-peer marketplace built on the MERN stack for university students to buy and sell used items like textbooks and electronics, creating a localized and sustainable campus economy.

---

## Key Features ✨

* **User Management**: Secure user registration, login, and profile management.
* **Product Listings**: Sellers can easily create, update, and delete product listings with images and detailed descriptions.
* **Seller Dashboard**: A dedicated dashboard for sellers to manage their personal listings.
* **Marketplace**: Buyers can browse all available items on a central, easy-to-navigate marketplace page.
* **Search & Filter**: Powerful functionality to search for items by name and filter them by category and price.
* **Item Details**: A dedicated detail page for each item providing all necessary information.

---

## Tech Stack 🛠️

* **Frontend**: React.js
* **Backend**: Node.js, Express.js
* **Database**: MongoDB

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/UniMarket.git](https://github.com/your-username/UniMarket.git)
    cd UniMarket
    ```
2.  **Install Backend Dependencies**
    ```sh
    cd server
    npm install
    ```
3.  **Install Frontend Dependencies**
    ```sh
    cd ../client
    npm install
    ```
4.  **Set up Environment Variables**
    Create a `.env` file in the `server` directory and add the following variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

---

## Usage 🚀

1.  **Start the Backend Server**
    ```sh
    cd server
    npm run dev
    ```
2.  **Start the Frontend Development Server**
    ```sh
    cd client
    npm start
    ```
The application will be running on `http://localhost:3000`.

---

## License ⚖️

**Copyright (c) 2025 Vansh Mehta, Aarya Shah, Kavya Prajapati**

All rights reserved.

This software and its source code are the property of Vansh Mehta, Aarya Shah, and Kavya Prajapati.
You may not copy, modify, distribute, sublicense, or use this software
without explicit written permission from the copyright holder.

Unauthorized use, reproduction, or distribution of this software
is strictly prohibited and may result in legal action.