import axios, { AxiosResponse } from 'axios';
import noImageCover from './images/noImage.png'

export interface BookData {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverImage: string;
  publishedDate: string;
  pageCount: string;
  previewLink: string;
}

export async function searchBooks(query: string): Promise<BookData[] | null> {
  const apiKey = 'AIzaSyAcfQtK42M9RyF2BwKPZRbg8xvOUamLlyU';

  try {
    const response: AxiosResponse = await axios.get(
      'https://www.googleapis.com/books/v1/volumes',
      {
        params: {
          q: query,
          key: apiKey,
          maxResults: 40,
          printType: 'books',
          orderBy: 'relevance',
        },
      },
    );
    const data: BookData[] = response.data.items.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Автор неизвестен'],
        description: item.volumeInfo.description || 'Описание отсутствует',
        coverImage:
          item.volumeInfo.imageLinks?.thumbnail ||
          noImageCover,
        publishedDate:
          item.volumeInfo.publishedDate || 'Дата публикации неизвестна',
        pageCount: item.volumeInfo.pageCount || ' Неизвестно',
        previewLink: item.volumeInfo.previewLink,
      };
    });
    return data;
  } catch (error) {
    console.error('Ошибка запроса к Google Books API:', error);
    return null;
  }
}

export async function searchCurrentBook(
  bookId: string,
): Promise<BookData | null> {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes/' + bookId,
    );
    const data = response.data;
    const bookdata = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors || ['Автор неизвестен'],
      description: data.volumeInfo.description || 'Описание отсутствует',
      coverImage:
        data.volumeInfo.imageLinks?.thumbnail ||
        'https://img.icons8.com/ios/100/no-image.png',
      publishedDate:
        data.volumeInfo.publishedDate || 'Дата публикации неизвестна',
      pageCount: data.volumeInfo.pageCount || ' Неизвестно',
      previewLink: data.volumeInfo.previewLink,
    };

    return bookdata;
  } catch (error) {
    console.error('Ошибка запроса к Google Books API:', error);
    return null;
  }
}
