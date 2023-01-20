import './Card.css';

function Card() {
  return (
    <div className='card'>
      <div className='card__sticky card__sticky_top-left'>
        <span>15%</span>
      </div>
      <div className='card__sticky card__sticky_top-right'>
        <button className='card__favorite'>
          <img src='' alt='Добавить в избранное' className='card__favorite-icon' />
        </button>
      </div>
      <a href='/product' className='card__link'>
        <div className='card__desc'>
          <span>300</span>
          <span className='card__wight'>100гр</span>
          <p className='card__name'>Печенья с яблоком</p>
        </div>
      </a>
      <a href='#' className='card__cart btn btn_type_primary'>В корзину</a>
    </div>
  )
}

export default Card;