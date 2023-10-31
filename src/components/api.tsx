import axios, { AxiosResponse } from 'axios';

export interface BookData {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverImage: string;
}

export async function searchBooks(query: string, count: number): Promise<BookData[] | null> {
  const apiKey = '';
  try {
    const response: AxiosResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        key: apiKey,
        maxResults: count,
      },
    });
  
      const data: BookData[] = response.data.items.map((item: any) => {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          description: item.volumeInfo.description || '',
          coverImage: item.volumeInfo.imageLinks?.thumbnail || '',
          publishedDate: item.volumeInfo.publishedDate,
        };
      });
  
      return data;
    } catch (error) {
      console.error('Ошибка запроса к Google Books API:', error);
      return null;
    }
  }
  