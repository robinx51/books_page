import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from '../components/SearchPage'; // Подставьте свой путь к компоненте
import { BrowserRouter } from 'react-router-dom';
import FavoritesProvider from '../components/functions/favoritesProvider';

test('пользователь может ввести запрос и выполнить поиск', () => {
    render(<FavoritesProvider>
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        </FavoritesProvider>);

    const input = screen.getByRole('textbox');
    const button = screen.getByTestId('search-button');
    const query = 'React';
    // Проверка начального состояния
    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
    
    // Ввод запроса
    fireEvent.change(input, { target: { value: query } });

    // Проверка состояний input и button
    expect(input).toHaveValue('React');
    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(window.location.pathname).toBe('/search/' + query);
});
