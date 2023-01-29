import React from "react";
import { CardList } from './../../components/CardList/CardList';

export const CatalogPage = ({handleProductLike}) => {
  return (
    <>
      <div className='content__cards'>
        <CardList onProductLike={handleProductLike} />
      </div>
    </>
  )
}