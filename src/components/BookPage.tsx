import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookData, searchBooks } from './api';

function BookPage() {
  const [query, setQuery] = useState('');
  const { bookId } = useParams();
  let [book, setBooks] = useState<BookData[] | null>(null);

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
    return <div className="noSearchResults">Loading...</div>;
  }

  return (
    <div className="bookPage">
      <div className='navigationBar'>
        <h2 className='mainPage'><Link to="/" className="link">Главная страница</Link></h2>
        <div className='searchBar'>
          <input
            className='searchInput'
            type="text"
            placeholder="Поиск книг"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to={`/search/${query}`}>
            <button className='searchButton'>Поиск</button>
          </Link>
        </div>
        <h2 className='searchResult'>Подробная информация о книге</h2>
      </div>
      <div className="resultPage">
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
        <div className="bookInfo">
          <p>Название: {book[0].title}</p>
          <p>
            Автор(ы):{' '}
            {book[0].authors ? book[0].authors.join(', ') : 'Автор неизвестен'}
          </p>
          <p>Количество страниц: {book[0].pageCount}</p>
          <p>Дата публикации: {book[0].publishedDate}</p>
          <p>Описание: {book[0].description}</p>
          <p>Предпросмотр: <a className='link' href={book[0].previewLink}>Перейти на сайт books.google.ru</a></p>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
