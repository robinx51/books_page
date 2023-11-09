import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import BookPage from './components/BookPage';
import FavoritesPage from './components/FavoritesPage';
import FavoritesProvider from './components/functions/favoritesProvider';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:prevQuery" element={<SearchPage />} />
            <Route path="/book/:bookId" element={<BookPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
