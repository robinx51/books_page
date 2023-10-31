import axios, { AxiosResponse } from 'axios';

export interface BookData {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverImage: string;
  publishedDate: string;
  pageCount: string;
}

export async function searchBooks(
  query: string,
  count: number,
): Promise<BookData[] | null> {
  const apiKey = 'AIzaSyAcfQtK42M9RyF2BwKPZRbg8xvOUamLlyU';
  try {
    const response: AxiosResponse = await axios.get(
      'https://www.googleapis.com/books/v1/volumes',
      {
        params: {
          q: query,
          key: apiKey,
          maxResults: count,
        },
      },
    );

    const data: BookData[] = response.data.items.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Автор неизвестен'],
        description: item.volumeInfo.description || 'Описание отсутствует',
        coverImage: item.volumeInfo.imageLinks?.thumbnail || 'https://img.icons8.com/ios/100/no-image.png',
        publishedDate: item.volumeInfo.publishedDate || 'Дата публикации неизвестна',
        pageCount: item.volumeInfo.pageCount || ' Неизвестно',
      };
    });

    return data;
  } catch (error) {
    console.error('Ошибка запроса к Google Books API:', error);
    return null;
  }
}
