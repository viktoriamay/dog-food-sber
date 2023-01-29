import './CardList.css';
import Card from '../Card/Card';
import { useContext } from 'react';
import { CardContext } from './../../context/CardContext';

export function CardList({onProductLike}) {
  const {cards} = useContext(CardContext);
  return (
    <div className='cards'>
        {
          cards.map((item) => (
            <Card {...item} key={item._id} onProductLike={onProductLike} />
          ))
        }
    </div>
  )
}