import { BookData } from './api';
import React, { useState, createContext, useContext, useEffect } from 'react';

type FavoritesContextType = {
  favoriteBooks: BookData[];
  addToFavorites: (book: BookData) => void;
  removeFromFavorites: (book: BookData) => void;
  getFavoriteBooks: () => BookData[];
  isBookInFavorites: (book: BookData) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

function FavoritesProvider({ children }: { children: React.ReactNode }) {

  const [favoriteBooks, setFavoriteBooks] = useState<BookData[]>([]);
  const localStorageKey = 'favoriteBooks';

  useEffect(() => {
    const savedFavorites = localStorage.getItem(localStorageKey);
    if (savedFavorites) {
      setFavoriteBooks(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (book: BookData) => {
    setFavoriteBooks((prevFavorites) => {
      const newFavorites = [...prevFavorites, book];
      localStorage.setItem(localStorageKey, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFromFavorites = (book: BookData) => {
    setFavoriteBooks((prevFavorites) => {
      const newFavorites = prevFavorites.filter((favBook) => favBook.id !== book.id);
      localStorage.setItem(localStorageKey, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const getFavoriteBooks = () => favoriteBooks;

  const isBookInFavorites = (book: BookData) => {
    return favoriteBooks.some((favBook) => favBook.id === book.id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteBooks, addToFavorites, removeFromFavorites, getFavoriteBooks, isBookInFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
