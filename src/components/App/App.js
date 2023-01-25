import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';
import data from '../../assets/data.json';
import SearchInfo from '../SearchInfo/SearchInfo';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const handleRequest = () => {
    /* api
      .search(searchQuery)
      .then((res) => setCards(res))
      .catch((err) => console.log(err)); */
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
    const filteredCards = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCards([...filteredCards])
  }, [searchQuery]);

  return (
    <div className="App">
      <Header>
        <>
          <Logo className='logo logo_place_header' href='/' />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SearchInfo searchText={searchQuery} searchCount={cards.length} />
        <div className='content__cards'>
          <CardList data={cards} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
