import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from '../components/SearchPage'

describe('input React to the search', () => {
    it('should fill query from input', () => {
        render(<SearchPage />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        const query = 'React';

        fireEvent.change(input, { target: { value: query } });
        fireEvent.click(button);
        
        expect(window.location.pathname).toBe('/search/'+ query)
    })
})