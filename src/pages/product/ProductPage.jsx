import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Spinner } from '../../components/Spinner/Spinner';
import { Product } from '../../components/Product/Product';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';

export const ProductPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const {handleProductLike} = useContext(UserContext);
  
  const {productId} = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getProductById(productId)
      .then((productData) => setProduct(productData))
      .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
      <main className='content container'>
        <div className='content__cards'>
          {isLoading ? <Spinner /> : <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />}
        </div>
      </main>
  )
}