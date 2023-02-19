import { useLocation } from 'react-router-dom';
import './SearchInfo.css';

const SearchInfo = ({searchText, searchCount}) => {
  const location = useLocation();

  return (
    location.pathname === '/' && searchText && <section className='search-title'>По запросу <span>{searchText}</span> найдено {searchCount} товаров</section>
  );
}

export default SearchInfo;