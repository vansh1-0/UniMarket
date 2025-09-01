import React, { useState } from "react";
import "./App.css";

// Dummy data for listings
const dummyListings = [
  {
    id: 1,
    title: "Calculus Textbook",
    description: "Used, good condition. 7th Edition.",
    category: "Textbooks",
    price: 500,
    image: "https://via.placeholder.com/150",
    isSold: false,
  },
  {
    id: 2,
    title: "Laptop - Dell Inspiron",
    description: "i5, 8GB RAM, 256GB SSD. Works perfectly.",
    category: "Electronics",
    price: 20000,
    image: "https://via.placeholder.com/150",
    isSold: false,
  },
  {
    id: 3,
    title: "Study Table",
    description: "Wooden, minor scratches.",
    category: "Furniture",
    price: 1500,
    image: "https://via.placeholder.com/150",
    isSold: true,
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  // Filter and sort logic
  let filteredListings = dummyListings.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()))
  );
  if (sort === "price") {
    filteredListings.sort((a, b) => a.price - b.price);
  } else {
    filteredListings.sort((a, b) => b.id - a.id); // Newest first
  }

  return (
    <div className="app-container">
      <header>
        <h1>UniMarket</h1>
        <nav>
          <button>Home</button>
          <button>Marketplace</button>
          <button>My Listings</button>
          <button>Profile</button>
          <button>Login</button>
        </nav>
      </header>

      <section className="search-bar">
        <input
          type="text"
          placeholder="Search for items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Textbooks">Textbooks</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="price">Price: Low to High</option>
        </select>
        <button>Post New Listing</button>
      </section>

      <main>
        <h2>Marketplace</h2>
        <div className="listings-grid">
          {filteredListings.map((item) => (
            <div className={`listing-card${item.isSold ? " sold" : ""}`} key={item.id}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="listing-info">
                <span className="category">{item.category}</span>
                <span className="price">₹{item.price}</span>
              </div>
              {item.isSold && <span className="sold-badge">SOLD</span>}
              <button disabled={item.isSold}>View Details</button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>© 2025 UniMarket | CampusTrade for Students</p>
      </footer>
    </div>
  );
}

export default App;