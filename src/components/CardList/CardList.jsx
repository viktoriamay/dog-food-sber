import './CardList.css';
import Card from '../Card/Card';
import data from '../../assets/data.json'
import { isContentEditable } from '@testing-library/user-event/dist/utils';

export function CardList() {
  console.log(data);
  return (
    <div className='cards'>
        {
          data.map((item) => (
            <Card {...item} />
          ))
        }
    </div>
  )
}