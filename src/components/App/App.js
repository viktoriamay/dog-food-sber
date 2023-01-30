import './App.css';
import React, { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import SearchInfo from '../SearchInfo/SearchInfo';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import api from '../../utils/api';
import useDebounce from './../../hooks/useDebounce';
import { Router } from './../../router/Router';
import { UserContext } from './../../context/UserContext';
import { CardContext } from '../../context/CardContext';
import { isLiked } from './../../utils/utils';
import { ThemeContext } from '../../context/ThemeContext';
import { themes } from './../../context/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from './../../pages/catalog/CatalogPage';
import { ProductPage } from './../../pages/product/ProductPage';
import { FaqPage } from './../../pages/faq/FaqPage';
import { Favorites } from '../../pages/favorites/favorites';
import { NoMatchFound } from './../../pages/NoMatchFound/NoMatchFound';

export function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(themes.light);
  const [favorites, setFavorites] = useState([]);

  const debounceSearchQuery = useDebounce(searchQuery, 1000);

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
      setCurrentUser(userData);
      const favProducts = productsData.products.filter((product) =>
        isLiked(product.likes, userData._id)
      );
      setFavorites(favProducts);
    });

    /* получение данных без Promise

    api.getProductsList().then((data) => setCards(data.products));
    api.getUserInfo().then((userData) => setCurrentUser(userData)); */

  }, []);

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  }

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser?._id);

    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });

      if (!liked) {
        setFavorites((prevState) => [...prevState, newCard]);
      } else
        setFavorites((prevState) =>
          prevState.filter((card) => card._id !== newCard._id)
        );
      setCards(newProducts);
    });
  }

  const valueProvider = {
    cards,
    favorites
  };

  const userProvider = {
    currentUser: currentUser,
    handleProductLike: handleProductLike
  };

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme: themes, toggleTheme }}>
        <CardContext.Provider value={{ valueProvider }}>
          <UserContext.Provider value={{ userProvider }}>
            <Header>
              <>
                <Logo className='logo logo_place_header' href='/' />
                <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
              </>
            </Header>
            <main className={`content container content__${
                theme.light ? 'light' : 'dark'
              }`}>
              <SearchInfo searchText={searchQuery} searchCount={cards.length} />
              <Routes>
                <Route path='/' element={<CatalogPage />}></Route>
                <Route
                  path='/product/:productId'
                  element={<ProductPage />}
                ></Route>
                <Route path='/faq' element={<FaqPage />}></Route>
                <Route path='/favorites' element={<Favorites />}></Route>
                <Route path='*' element={<NoMatchFound />}></Route>
              </Routes>
            </main>
            <Footer />
          </UserContext.Provider>
        </CardContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}