import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import s from './Product.module.css';
import { ReactComponent as Save } from './img/save.svg';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Rating } from '../Rating/Rating';
import api from './../../utils/api';
import { BaseButton } from './../BaseButton/BaseButton';
import { Form } from '../Form/Form';

import { useForm } from 'react-hook-form';

export const Product = ({
  pictures,
  name,
  price,
  discount,
  onProductLike,
  likes = [],
  currentUser,
  description,
  reviews,
}) => {

  const discount_price = Math.round(price - (price * discount) / 100);
  const isLike = likes.some((id) => id === currentUser?._id);
  const desctiptionHTML = { __html: description };

  const [isClicked, setClicked] = useState(isLike);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('name=dear')) {
      navigate('/');
    }
  }, [location.search]);

  const onLike = (e) => {
    onProductLike(e);
    setClicked((state) => !state);
  };

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data))
  }, [])

  const getUser = (id) => {
    if (!users.length) return '';

    const user = users.find((el) => el._id === id);

    return user?.name ?? user;
  }

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  const sendReview = (data) => {
    console.log(data);
  }

  return (
    <>
      <div>
        <button onClick={handleClickBack} className='btn btn__back'>
          Назад
        </button>
        <h1 className={s.productTitle}>{name}</h1>
        <div className={s.rate__info}>
          <span> Артикул: <b>238907</b> </span>
          <Rating isEditable={true} rating={5} />
          <span className={s.reviews__count}>
            {reviews?.length} отзывов
          </span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
          {!!discount && (
            <span className={cn(s.price, 'card__price_type_discount')}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href='/#' className={cn('btn', 'btn_type_primary', 'btn__card', s.cart)}>
              В корзину
            </a>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isClicked })}
            onClick={(e) => onLike(e)}
          >
            <Save />
            <span>{isLike ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt='truck' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt='quality' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} dangerouslySetInnerHTML={desctiptionHTML}></p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
      <div className={s.reviews}>
        <div className={s.reviews__control}>
          <h2 className={s.title}>Отзывы</h2>
          <button className='btn'>Написать отзыв</button>
          <Form className={s.form}  handleFormSubmit={handleSubmit(sendReview)} title='Написать отзыв' >
            <div className={s.form__rating} >
              <textarea
                {...register}
                className={`${s.auth__textarea} ${errors?.email ? 'auth__textarea_error' : ''}`}
                type='text'
                name='textarea'
                placeholder='Оставьте ваш отзыв'
              />
              {errors.textarea && (<p className='auth__error'>{errors?.textarea.message}</p>)}
            </div>
            <div className='auth__actions'>
              <BaseButton type="submit" color={'yellow'}>
                Оставить отзыв
              </BaseButton>
            </div>
          </Form>
        </div>
        {reviews?.map((e) => <div className={s.review} key={e._id}>
          <div className={s.review__author}>
            <div>

              <span>{getUser(e.author)}</span>
              <span className={s.review__date}>{(new Date(e.created_at)).toLocaleString('ru', options)}</span>
            </div>
            <Rating rating={e.rating} />
          </div>
          <div className={s.text}>
            <span>«{e.text}»</span>
          </div>

        </div>)}
      </div>
    </>
  );
};