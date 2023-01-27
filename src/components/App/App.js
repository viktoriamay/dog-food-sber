import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';
import SearchInfo from '../SearchInfo/SearchInfo';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import api from '../../utils/api';
import useDebounce from './../../hooks/useDebounce';
import { CatalogPage } from '../../pages/catalog/CatalogPage';
import { ProductPage } from '../../pages/product/ProductPage';
import { Route, Routes } from 'react-router-dom';
import { NoMatchFound } from './../../pages/NoMatchFound/NoMatchFound';

export function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const handleRequest = () => {

    /* поиск по карточкам без запросов на сервер

    const filterCards = [].filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ); 
    setCards(filterCards);*/

    api.search(searchQuery).then((res) => setCards(res)).catch((err) => console.log(err))
  };

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  useEffect(() => {

    /* поиск по карточкам без запросов на сервер 

    const filteredCards = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCards([...filteredCards]) */

    Promise.all([api.getProductsList(), api.getUserInfo()]).then(([productsData, userData]) => {
      setCards(productsData.products);
      setCurrentUser(userData)
    });

    /* получение данных без Promise

    api.getProductsList().then((data) => setCards(data.products));
    api.getUserInfo().then((userData) => setCurrentUser(userData)); */

  }, [searchQuery]);

  function handleUpdateUser(onUpdateUser) {
    api.setUserInfo({ ...onUpdateUser }).then((newUser) => {
      setCurrentUser(newUser);
    });
  }

  function handleProductLike(product) {
    const liked = product.likes.some((id) => id === currentUser?._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });
      setCards(newProducts);
    });
  }

  return (
    <div className="App">
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className='logo logo_place_header' href='/' />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SearchInfo searchText={searchQuery} searchCount={cards.length} />
        <Routes>
          <Route
            path='/' element={
              <CatalogPage
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike}
              />
            }>
          </Route>
          <Route
            path='/product/:productId' element={
              <ProductPage />
            }>
          </Route>
          <Route path='*' element={<NoMatchFound />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}