import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function Home() {
  return <div style={{ padding: '2rem' }}><h2>Welcome to UniMarket!</h2></div>;
}

function Marketplace() {
  return <div style={{ padding: '2rem' }}><h2>Marketplace</h2></div>;
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
              <Link to="/profile"><button>Profile</button></Link>
              <span onClick={handleLogout}>
                <button>Logout</button>
              </span>
            </>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}

        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage handleLogout={handleLogout} />} />
      </Routes>

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