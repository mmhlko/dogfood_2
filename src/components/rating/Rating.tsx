import s from './styles.module.scss';
import StarIcon from './img/star.svg';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const MAX_COUNT_RATING = 5;

interface IRatingProps {
    isEditable?: boolean, 
    currentRating: number, 
    setCurrentRating?: (number:number) => void,
    error?: any
}

export const Rating = ({isEditable = false, currentRating, setCurrentRating, error}: IRatingProps) => {

    const [ratingArray, setRatingArray] = useState(new Array(MAX_COUNT_RATING).fill(<></>))

    const constructRating = (filledRating:number) => {

        const updateRatingArray = ratingArray.map((star, i) => {
            return (
                <StarIcon className={classNames(s.star, 
                    {
                        [s.filled]: filledRating > i,
                        [s.editable]: isEditable
                    
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(currentRating)}
                    onClick={() => changeRating(i + 1)}
                />
            )
        } )
        
        setRatingArray(updateRatingArray)
    }

    const changeDisplay = (rating:number) => {
        if (!isEditable || !setCurrentRating) return
        constructRating(rating)
    }

    const changeRating = (rating:number) => {
        if (!isEditable || !setCurrentRating) return
        setCurrentRating(rating)
    }

    useEffect(() => constructRating(currentRating), [currentRating])

    return ( 
    <div className='rating__container'>
        {ratingArray.map((star, i) => <span key={i}>{star}</span>)}
        {error && <p className='errorMessage'>{error.message}</p>}
    </div>
     );
}
