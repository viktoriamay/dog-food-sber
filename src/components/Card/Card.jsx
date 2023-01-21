import './Card.css';
import {ReactComponent as Save} from './save.svg';

function Card(props) {
  const discountPrice = Math.round(props.price - props.price * props.discount / 100);
  return (
    <div className='card'>
        <div className='card__sticky card__sticky_type_top-left'>
          {!!props.discount && <span className='card__discount'>{`-${props.discount}%`}</span>}
        </div>
        <div className='card__sticky card__sticky_type_top-right'>
          <button className='card__favorite'>
            {/* <img src={save} alt='Добавить в избранное' className='card__favorite-icon' /> */}
            <Save className={props.isFavorite ? 'card__favorite-icon' : 'card__unfavorite-icon'} />
          </button>
        </div>
        <a href='/product' className='card__link'>
          <img src={props.picture} alt='Добавить в избранное' className='card__favorite-icon' />
          <div className='card__desc'>
            <span className='card__price card__price_type_discount'>{discountPrice ?? 'No Price'}&nbsp;₽</span>
            <span className='card__wight'>{props.wight}</span>
            <p className='card__name'>{props.name}</p>
          </div>
        </a>
        <a href='#' className='card__cart btn btn_type_primary'>В корзину</a>
    </div>
  )
}

export default Card;