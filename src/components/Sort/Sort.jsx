import './Sort.css';
import { useContext, useState } from 'react';
import { CardContext } from './../../context/CardContext';

export const Sort = () => {

  const {onSortData} = useContext(CardContext);
  const tabs = [
    {id: 'popular', title: 'Популярные'},
    {id: 'newest', title: 'Новинки'},
    {id: 'cheep', title: 'Сначала дешевые'},
    {id: 'expensive', title: 'Сначала дорогие'},
    {id: 'rating', title: 'По рейтингу'},
    {id: 'discount', title: 'По скидке'},
  ];

  const [isActive, setIsActive] = useState(false);

  const handleChange = (id) => {
    // setCurrentSort(id);
    onSortData(id);
  }

  
  
  return (
    <div className='sort'>
      {tabs.map(({id, title}) => (
        <div key={id} className={isActive ? 'sort__link_selected' : 'sort__link'} onClick={() => (handleChange(id))}>
          {title}
        </div>)
      )}
    </div>
  )
}