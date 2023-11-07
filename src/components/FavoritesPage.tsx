import { resultPage, navigationBar } from './functions/showPage';
import { useFavorites } from './functions/favoritesProvider';

function FavoritesPage() {
    const { getFavoriteBooks } = useFavorites();
    const books = getFavoriteBooks();
    return(
    <div>
        {navigationBar()}
        <div className="resultPage mainColor">
        <h2 className="searchResult">
            Список избранных книг
        </h2>
        {resultPage(books)}
        </div>
    </div>
    )
}

export default FavoritesPage;