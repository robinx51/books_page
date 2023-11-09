import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookData, searchCurrentBook } from './functions/api';
import { navigationBar } from './functions/showPage';
import { useFavorites } from './functions/favoritesProvider';
import favoriteImage from './functions/images/favorite.png';
import noFavoriteImage from './functions/images/no_favorite.png';

function BookPage() {
  const [book, setBooks] = useState<BookData | null>(null);
  const { isBookInFavorites, removeFromFavorites, addToFavorites } = useFavorites();
  const { bookId } = useParams();

  if (bookId) {
    useEffect(() => {
      searchCurrentBook(bookId).then((result) => {
        setBooks(result);
      });
    }, []);
  }
  return (
    <div className="bookPage">
      {navigationBar()}
      {book ? (
        <div className="resultPage mainColor">
          <div className="imageCover">
            <img className='image'
              src={book.coverImage}
              alt="Обложка книги"
              width="256"
              height="396"
            />
            {isBookInFavorites(book) ? (
              <button onClick={() => removeFromFavorites(book)} className='favoritesButton removeFromFavorites'>
                <div className='favoritesIcon'><img src={favoriteImage} height={32}/></div>
                <div className='text'>Удалить из избранных</div>
              </button>
            ) : (
              <button onClick={() => addToFavorites(book)} className='favoritesButton addToFavorites'>
                <div className='favoritesIcon'><img src={noFavoriteImage}/></div>
                <div className='text'>Добавить в избранное</div>
              </button>
            )}
          </div>
          <div className="bookInfo">
            <p>Название: {book.title}</p>
            <p>
              Автор(ы):{' '}
              {book.authors ? book.authors.join(', ') : 'Автор неизвестен'}
            </p>
            <p>Количество страниц: {book.pageCount}</p>
            <p>Дата публикации: {book.publishedDate}</p>
            <p>Описание: {book.description}</p>
            <p>
              Предпросмотр:{' '}
              <a className="link" href={book.previewLink}>
                Перейти на сайт books.google.ru
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="resultPage mainColor">
          <p className="noSearchResults">Загрузка...</p>
        </div>
      )}
    </div>
  );
}

export default BookPage;
