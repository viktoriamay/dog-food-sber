import Logo from '../../components/Logo/Logo';
import { Header } from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import { Footer } from '../../components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Spinner } from '../../components/Spinner/Spinner';
import { Product } from '../../components/Product/Product';


const productId = '622c77e877d63f6e70967d22';

export const ProductPage = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleRequest = () => {
    api.search(searchQuery).then((res) => setCards(res)).catch((err) => console.log(err))
  };

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getProductById(productId)
      .then((productData) => setProduct(productData))
      .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false));
  }, []);

  const onProductLike = (product) => {
    
  }

  /* function handleProductLike(product) {
    const liked = product.likes.some((id) => id === currentUser?._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });
      setCards(newProducts);
    });
  } */

  return (
    <>
      
      <main className='content container'>
        <div className='content__cards'>
          {isLoading ? <Spinner /> : <Product {...product} currentUser={currentUser} onProductLike={onProductLike} />}
        </div>
      </main>
    </>
  )
}