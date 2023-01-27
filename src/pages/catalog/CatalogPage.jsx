import React from "react";
import { CardList } from './../../components/CardList/CardList';

export const CatalogPage = ({cards, currentUser, handleProductLike}) => {
  return (
    <>
      <div className='content__cards'>
        <CardList data={cards} currentUser={currentUser} onProductLike={handleProductLike} />
      </div>
    </>
  )
}