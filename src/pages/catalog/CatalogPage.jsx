import React from "react";
import { useContext } from "react";
import { CardList } from './../../components/CardList/CardList';
import { CardContext } from './../../context/CardContext';
import { UserContext } from './../../context/UserContext';

export const CatalogPage = () => {
  const {cards} = useContext(CardContext);
  const {handleProductLike} = useContext(UserContext);

  return (
    <>
      <div className='content__cards'>
        <CardList cards={cards} onProductLike={handleProductLike} />
      </div>
    </>
  )
}