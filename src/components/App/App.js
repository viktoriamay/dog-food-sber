import './App.css';
import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';

export function App() {
  return (
    <div className="App">
      <Header />
      <main className='content container'>
        <div className='content__cards'>
          <CardList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
