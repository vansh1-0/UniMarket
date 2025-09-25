import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import CreateListingPage from './pages/CreateListingPage';
import MyListingsPage from './pages/MyListingsPage';
import EditListingPage from './pages/EditListingPage'; // Import the new page

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header>
        <h1>UniMarket</h1>
        <nav>
          <Link to="/"><button>Home</button></Link>

          {user ? (
            <>
              <Link to="/my-listings"><button>My Listings</button></Link>
              <Link to="/create-listing"><button>+ New Listing</button></Link>
              <Link to="/profile"><button>Profile</button></Link>
              <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <button>Logout</button>
              </span>
            </>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}

        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MarketplacePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/profile" element={<ProfilePage handleLogout={handleLogout} />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="/edit-listing/:id" element={<EditListingPage />} />
        </Routes>
      </main>

      <footer>
        <p>© 2025 UniMarket | CampusTrade for Students</p>
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;