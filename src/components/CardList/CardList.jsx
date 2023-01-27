import './CardList.css';
import Card from '../Card/Card';

export function CardList({data, currentUser, onProductLike}) {
  return (
    <div className='cards'>
        {
          data.map((item, index) => (
            <Card {...item} key={item._id} currentUser={currentUser} onProductLike={onProductLike} />
          ))
        }
    </div>
  )
}