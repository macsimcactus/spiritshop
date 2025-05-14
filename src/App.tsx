import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <Link to="/">Главная</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>

        <footer>
          <p>© {new Date().getFullYear()} Spirit Vietnam</p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 