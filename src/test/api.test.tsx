import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { searchBooks, BookData } from '../components/functions/api'

const mock = new MockAdapter(axios);

describe('запрос к api', () => {
    afterEach(() => {
        mock.reset();
    });
    const apiKey = 'AIzaSyAcfQtK42M9RyF2BwKPZRbg8xvOUamLlyU';

it('успешно получает данные из Google Books API', async () => {
    const query = 'React';

    const responseData: any = {
        items: [
            {
            id: '123',
            volumeInfo: {
                title: 'React Book',
                authors: ['Author 1', 'Author 2'],
                description: 'Description of the book',
                imageLinks: {thumbnail: 'https://example.com/image.jpg'},
                publishedDate: '2022-01-01',
                pageCount: '200',
                previewLink: 'https://example.com/preview',
          },    
        },
      ],
    };

    mock.onGet('https://www.googleapis.com/books/v1/volumes', {
        params: {
            q: query,
             key: apiKey,
            maxResults: 40,
            printType: 'books',
            orderBy: 'relevance',
        },
    }).reply(200, responseData);

    const result: BookData[] | null = await searchBooks(query);

    expect(result).toEqual([
    {
        id: '123',
        title: 'React Book',
        authors: ['Author 1', 'Author 2'],
        description: 'Description of the book',
        coverImage: 'https://example.com/image.jpg',
        publishedDate: '2022-01-01',
        pageCount: '200',
        previewLink: 'https://example.com/preview',
    },]);
});

    it('обработка ошибочных запросов к Google Books API', async () => {
        const query = 'InvalidQuery';

        mock.onGet('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                key: expect.any(String),
                maxResults: 40,
                printType: 'books',
                orderBy: 'relevance',
            },
        }).reply(500, { error: 'Internal Server Error' });

    const result: BookData[] | null = await searchBooks(query);

    expect(result).toBeNull();
  });
});