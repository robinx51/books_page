import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to="/search">Перейти к поиску книг</Link>
    </div>
  );
}

export default HomePage;