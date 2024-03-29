import './App.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import Search from '../Search/Search';
import SearchInfo from '../SearchInfo/SearchInfo';
import api from '../../utils/api';
import Logo from '../Logo/Logo';
import useDebounce from './../../hooks/useDebounce';
import { UserContext } from './../../context/UserContext';
import { CardContext } from '../../context/CardContext';
import { isLiked } from './../../utils/utils';
import { ThemeContext } from '../../context/ThemeContext';
import { themes } from './../../context/ThemeContext';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ProductPage } from './../../pages/product/ProductPage';
import { CatalogPage } from './../../pages/catalog/CatalogPage';
import { FaqPage } from './../../pages/faq/FaqPage';
import { Favorites } from '../../pages/favorites/favorites';
import { NoMatchFound } from './../../pages/NoMatchFound/NoMatchFound';
import { Modal } from '../Modal/Modal';
import { Login } from '../Login/Login';
import { Register } from './../Register/Register';
import { ResetPassword } from '../ResetPass/ResetPass';
import { PrivateRoute } from './../PrivateRoute/PrivateRoute';
import { Chart } from '../Chart/Chart';
import { Profile } from '../Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from './../../storage/actions/productsActions';

export function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(themes.light);
  const [favorites, setFavorites] = useState([]);
  const [activeModal, setActiveModal] = useState(true);
  const [isAuthentificated, setAuthentificated] = useState(false);

  const debounceSearchQuery = useDebounce(searchQuery, 1000);
  const navigate = useNavigate();

  const checkCardLocal = (item) => {
    // return true; //вернуть все карточки
    return (
      !item.pictures.includes('maxi-opt') && // фильтрация по картинкам
      !item.pictures.includes('bipbap') &&
      !item.pictures.includes('pinimg') &&
      new Date(item.created_at) < new Date('2022-12-14T11:22:43.008Z') // фильтрация по дате создания (показывать те, которые были созданы до определенной даты)
    );
  };

  const handleRequest = () => {
    /* поиск по карточкам без запросов на сервер

    const filterCards = [].filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ); 
    setCards(filterCards);*/

    api
      .search(searchQuery)
      .then((res) => setCards(res.filter((e) => checkCardLocal(e))))
      .catch((err) => console.log(err));
    // .finally();
  };

  useEffect(() => {
    if (!isAuthentificated) {
      return;
    }
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
    navigate('/');
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  /* вариант до редакса
  
  useEffect(() => {
    if (!isAuthentificated) {
      return;
    }
    // поиск по карточкам без запросов на сервер 

    // const filteredCards = data.filter((item) =>
    //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setCards([...filteredCards])

    Promise.all([api.getProductsList(), api.getUserInfo()]).then(
      ([productsData, userData]) => {
        setCards(productsData.products.filter((e) => checkCardLocal(e)));
        setCurrentUser(userData);
        const favProducts = productsData.products.filter((product) =>
          isLiked(product.likes, userData._id),
        );
        setFavorites(favProducts);
      },
    );

    // получение данных без Promise

    // api.getProductsList().then((data) => setCards(data.products));
    // api.getUserInfo().then((userData) => setCurrentUser(userData));
  }, [isAuthentificated]); */

  /*  изменение пользователя
  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  } */

  // ниже редакс

  useEffect(() => {
    if (!isAuthentificated) {
      return;
    }

    api.getUserInfo().then((userData) => setCurrentUser(userData))
    
  }, [isAuthentificated]);

  const dispatch = useDispatch();
  // const stateRedux = useSelector(state=> state);
  const stateRedux = useSelector(state=> state.products.list);
  const total = useSelector(({products}) => products.total);

  console.log({stateRedux, total});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [isAuthentificated]);

  useEffect(() => {
    if (currentUser?._id && stateRedux) {
      setCards(stateRedux.filter((e) => checkCardLocal(e)));

      const favProducts = stateRedux.filter((product) =>
          isLiked(product.likes, currentUser._id),
        );
        setFavorites(favProducts);
    }
    
  }, [currentUser?._id, stateRedux]);

  // конец редакс
  

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser?._id);

      api.changeLikeProduct(product._id, liked).then((newCard) => {
        const newProducts = cards.map((cardState) => {
          return cardState._id === newCard._id ? newCard : cardState;
        });

        if (!liked) {
          setFavorites((prevState) => [...prevState, newCard]);
        } else
          setFavorites((prevState) => {
            return prevState.filter((card) => card._id !== newCard._id);
          });
        setCards(newProducts);
      });
    },
    [cards, currentUser?._id],
  );

  const sortedData = (currentSort) => {
    //currentSort === id
    switch (currentSort) {
      case 'popular':
        setCards([
          ...cards.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);
        break;

      case 'newest':
        setCards([
          ...cards.sort(
            (a, b) => new Date(b?.created_at) - new Date(a?.created_at),
          ),
        ]);
        break;

      case 'cheep':
        setCards([...cards.sort((a, b) => a?.price - b?.price)]);
        break;

      case 'expensive':
        setCards([...cards.sort((a, b) => b?.price - a?.price)]);
        break;

      case 'rating':
        setCards([
          ...cards.sort((a, b) => b?.reviews?.length - a?.reviews?.length),
        ]);
        break;

      case 'discount':
        setCards([...cards.sort((a, b) => b?.discount - a?.discount)]);
        break;

      default:
        setCards([...cards.sort((a, b) => a.price - b.price)]);
        break;
    }
  };

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };

  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  useEffect(() => {
    const haveToken = localStorage.getItem('token');
    setAuthentificated(!!haveToken);
  });

  /* удаление товара по содержащейся в названии изображения фразы
  
  useEffect(() => {
    const deleteCard = async (id) => {
      await api.deleteProductById(id)
    }
    const filteredCards = cards.filter((el) => !el.pictures?.includes('maxi-opt'));
    // filteredCards.forEach(card => deleteCard(card._id))
    // console.log(filteredCards);
    setCards(filteredCards);
  }, []) */

  const cardProvider = {
    cards,
    favorites,
    onSortData: sortedData,
  };

  const userProvider = {
    currentUser: currentUser,
    setCurrentUser,
    handleProductLike,
    isAuthentificated, //= isAuthentificated: isAuthentificated
    setActiveModal,
    setAuthentificated,
  };

  const handleCloseModal = () => {
    setActiveModal(false);
    navigate('/');
  };

  const authRoutes = (
    <>
      <Route
        path="login"
        element={
          <Modal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            handleCloseModal={handleCloseModal}>
            <Login />
          </Modal>
        }></Route>
      <Route
        path="register"
        element={
          <Modal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            handleCloseModal={handleCloseModal}>
            <Register />
          </Modal>
        }></Route>
      <Route
        path="reset-pass"
        element={
          <Modal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            handleCloseModal={handleCloseModal}>
            <ResetPassword setAuthentificated={setAuthentificated} />
          </Modal>
        }></Route>
    </>
  );

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme: themes, toggleTheme }}>
        <CardContext.Provider value={cardProvider}>
          <UserContext.Provider value={userProvider}>
            <div className="wrapper">
              <Header>
                <Logo className="logo logo_place_header" />
                <Search onSubmit={handleFormSubmit} onInput={setSearchQuery} />
              </Header>
              {isAuthentificated ? (
                <main
                  className={`main content container content__${
                    theme.light ? 'light' : 'dark'
                  }`}>
                  <SearchInfo
                    searchText={searchQuery}
                    searchCount={cards.length}
                  />
                  <Routes
                    location={
                      backgroundLocation && {
                        ...backgroundLocation,
                        path: initialPath || location,
                      }
                    }>
                    <Route
                      path="/"
                      element={<CatalogPage onSortData={sortedData} />}></Route>
                    <Route
                      path="/product/:productId"
                      element={<ProductPage />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/faq" element={<FaqPage />}></Route>
                    <Route
                      path="/favorites"
                      element={
                        <PrivateRoute loggedIn={isAuthentificated}>
                          <Favorites />
                        </PrivateRoute>
                      }></Route>

                    {/* <Route path='/form' element={<RegistrationForm addContact={addContact} />}></Route> */}
                    <Route
                      path="/chart"
                      element={
                        <PrivateRoute loggedIn={isAuthentificated}>
                          <Chart />
                        </PrivateRoute>
                      }></Route>
                    <Route path="*" element={<NoMatchFound />}></Route>
                    {authRoutes}
                  </Routes>

                  {backgroundLocation && <Routes>{authRoutes}</Routes>}
                  {/* пример вывода информации из формы
              {!!contacts.length && contacts.map((el) => (
    
                <div key={Math.random() * 100}>
                
                  <p>{el.name}</p>
                  <p>{el.lastName}</p>
                  <p>{el.phoneNumber}</p>
                  <p>{el.checked}</p>
                </div>))} */}
                </main>
              ) : (
                <div className="main container not-auth">
                  Авторизуйтесь, пожалуйста
                  <Routes>{authRoutes}</Routes>
                </div>
              )}
              <Footer />
            </div>
          </UserContext.Provider>
        </CardContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
