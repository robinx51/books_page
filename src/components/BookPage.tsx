import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BookData } from './api';

function BookPage() {
    const { bookId } = useParams();
    const [book, setBook] = useState<BookData | null>(null);

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
          .then((response) => {
            setBook(response.data);
          })
          .catch((error) => {
            console.error('Ошибка получения данных о книге:', error);
          });
      }, [bookId]);
    
      if (!book) {
        return <div className='noSearchResults'>Loading...</div>; // Пока данные загружаются
      }
      
    return(
        <div>
            <Link to="/">Главная страница</Link>
            <h2>{book.title}</h2>
            <p>Автор(ы): {book.authors ? book.authors.join(', ') : 'Автор неизвестен'}</p>
            <p>Описание: {book.description}</p>
      </div>
    )

}

export default BookPage;