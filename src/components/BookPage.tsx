import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookData, searchBooks } from './api';

function BookPage() {
  const { bookId } = useParams();
  let [book, setBooks] = useState<BookData[] | null>(null);

  console.log(bookId);

  if (bookId) {
    useEffect(() => {
      let book;
      searchBooks(bookId, 1).then((result) => {
        book = result;
        setBooks(book);
      });
    }, []);
  }

  if (!book) {
    return <div className="noSearchResults">Loading...</div>; // Пока данные загружаются
  }

  return (
    <div className='bookPage'>
      <h2><Link to="/" className='link'>Главная страница</Link></h2>
      <h2>{book[0].title}</h2>
      <div>
        <div className="imageCover">
          {book[0].coverImage && (
            <img
              src={book[0].coverImage}
              alt="Обложка книги"
              width="256"
              height="396"
            />
          )}
        </div>
        <div className='bookInfo'>
          <p>Автор(ы):{' '} {book[0].authors ? book[0].authors.join(', ') : 'Автор неизвестен'}</p>
          <p>Описание: {book[0].description}</p>
          <p>Количество страниц: {book[0].pageCount}</p>
          <p>Дата публикации: {book[0].publishedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
