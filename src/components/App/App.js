import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';
import data from '../../assets/data.json';
import SearchInfo from '../SearchInfo/SearchInfo';

export function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    const filteredCards = data.filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCards([...filteredCards])
  }, [searchQuery]);

  return (
    <div className="App">
      <Header changeInput={handleInput} />
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
