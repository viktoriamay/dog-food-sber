import './CardList.scss';
import Card from '../Card/Card';

export function CardList({onProductLike, cards = []}) {
  
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