import { useLocation } from 'react-router-dom';
import './SearchInfo.scss';

const SearchInfo = ({searchText, searchCount}) => {
  const location = useLocation();

  return (
    location.pathname === '/' && searchText && <section className='search-title'>По запросу <span>{searchText}</span> найдено {searchCount} товаров</section>
  );
}

export default SearchInfo;