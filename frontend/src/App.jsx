import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function Home() {
  return <div style={{ padding: '2rem' }}><h2>Welcome to UniMarket!</h2></div>;
}

function Marketplace() {
  return <div style={{ padding: '2rem' }}><h2>Marketplace</h2></div>;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>UniMarket</h1>
          <nav>
            <Link to="/"><button>Home</button></Link>
            <Link to="/marketplace"><button>Marketplace</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Add this new route */}
        </Routes>

        <footer>
          <p>© 2025 UniMarket | CampusTrade for Students</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;