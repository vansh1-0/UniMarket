import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import CreateListingPage from './pages/CreateListingPage';

function Home() {
  return <div style={{ padding: '2rem', textAlign: 'center' }}><h2>Welcome to UniMarket! Your one-stop campus marketplace.</h2></div>;
}

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
          <Link to="/marketplace"><button>Marketplace</button></Link>

          {user ? (
            <>
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

      {/* This <main> tag is crucial for the layout */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/profile" element={<ProfilePage handleLogout={handleLogout} />} />
        </Routes>
      </main>

      <footer>
        <p>© 2025 UniMarket | CampusTrade for Students</p>
      </footer>
    </div>
  );
}

// Wrapper component to provide Router context to the App component
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;