import cn from 'classnames';
import { useState, useCallback, useEffect } from 'react';
import {ReactComponent as Star} from './star.svg';
import s from './Rating.module.css'
import { isEditable } from '@testing-library/user-event/dist/utils';

export const Rating = ({rating, isEditable = false}) => {
  const [ratingArr, setRatingArr] = useState(new Array(5).fill(<Star></Star>));
  const [ratingState, setRating] = useState(rating);
  
  const changeDisplay = (rate) => {
    if (!isEditable) return;
    constructRating(rate);
  }
  
  const changeRating = (ratingState) => {
    if (!isEditable) return;
    setRating(ratingState);
  }

  const constructRating = useCallback((currentRating) => {
    const updatedArray = ratingArr.map((ratingElement, index) => {
      return ( 
        <Star className={cn(s.star, {
          [s.filled]: index < currentRating,
          [s.editable]: !isEditable
        })}
          onMouseEnter={() => changeDisplay(index + 1)} 
          onMouseLeave={() => changeDisplay(ratingState)}
          onClick={() => changeRating(index + 1)} 
        />
      )
    });
    setRatingArr(updatedArray);
  }, []);


  useEffect(() => {
    constructRating(rating);
  }, [constructRating])

  return (
    <div>
      {ratingArr.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  )
}