import React from "react";
import './CatalogPage.css'
import { useContext } from "react";
import { Sort } from "../../components/Sort/Sort";
import { CardList } from './../../components/CardList/CardList';
import { CardContext } from './../../context/CardContext';
import { UserContext } from './../../context/UserContext';

export const CatalogPage = () => {
  const {cards} = useContext(CardContext);
  const {handleProductLike} = useContext(UserContext);

  return (
    <div className="catalog-page">
      <Sort />
      <div className='content__cards'>
        <CardList cards={cards} onProductLike={handleProductLike} />
      </div>
    </div>
  )
}