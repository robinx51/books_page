import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import BookPage from './components/BookPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:prevQuery" element={<SearchPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
