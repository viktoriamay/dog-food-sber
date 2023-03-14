import './Sort.scss';
import { useContext, useState } from 'react';
import { CardContext } from './../../context/CardContext';

export const Sort = () => {
  const { onSortData } = useContext(CardContext);
  const [sortedId, setSortedId] = useState('popular');

  const tabs = [
    { id: 'popular', title: 'Популярные' },
    { id: 'newest', title: 'Новинки' },
    { id: 'cheep', title: 'Сначала дешевые' },
    { id: 'expensive', title: 'Сначала дорогие' },
    { id: 'rating', title: 'По рейтингу' },
    { id: 'discount', title: 'По скидке' },
  ];

  const handleChange = (e, id) => {
    e.preventDefault();
    onSortData(id);
    setSortedId(id);
  };

  return (
    <div className="sort">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`sort__link ${
            tab.id === sortedId ? 'sort__link_selected' : ''
          }`}
          onClick={(e) => handleChange(e, tab.id)}>
          {tab.title}
        </div>
      ))}
    </div>
  );
};