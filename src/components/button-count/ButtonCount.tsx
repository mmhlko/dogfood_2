import s from './styles.module.scss';
import { FocusEvent, useState } from 'react';
import { useEffect } from 'react';

interface IButtonCountProps {
    amount: number,
    handleIncrement: () => void,
    handleDecrement: () => void,
    handleCountChange: (count: number) => void,
}

export const ButtonCount = ({ amount = 0, handleIncrement, handleDecrement, handleCountChange }: IButtonCountProps) => {
    const [value, setValue] = useState<number>(0);
    const MIN_COUNT_IN_CART = 1;

    const handleBlurInput = (e: FocusEvent<HTMLInputElement>) => {
        const countInCart = Number(e.target.value);
        countInCart > 0 ? handleCountChange(countInCart) : handleCountChange(MIN_COUNT_IN_CART);
    }

    const handleChangeInput = (e: FocusEvent<HTMLInputElement>) => {
        const countInCart = Number(e.target.value);
        countInCart > 0 ? setValue(countInCart) : setValue(MIN_COUNT_IN_CART);
    }

    const handleIncrementClick = () => {
        handleIncrement();
        setValue(prevState => prevState + 1)
    }
    const handleDecrementClick = () => {
        handleDecrement();
        setValue(prevState => prevState - 1)
    }

    useEffect(() => {
        setValue(amount)
    }, [amount])

    return (
        <div className={s.wrap}>
            <button
                className={s.minus}
                disabled={value <= 1}
                onClick={handleDecrementClick}
            >-</button>
            <input type="number" className={s.num} value={value} onChange={handleChangeInput} onBlur={handleBlurInput} />
            <button
                className={s.plus}
                onClick={handleIncrementClick}
            >+</button>
        </div>
    )
}