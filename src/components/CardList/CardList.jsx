import './CardList.css';
import Card from '../Card/Card';

export function CardList({data}) {
  return (
    <div className='cards'>
        {
          data.map((item, index) => (
            <Card {...item} key={`${index}-${item.name}`} />
          ))
        }
    </div>
  )
}