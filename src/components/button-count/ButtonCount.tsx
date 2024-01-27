import s from './styles.module.scss';
import { useState } from 'react';
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

    const handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
        //указываем тип для элемента события напрямую через React.
        const countInCart = Number(e.target.value);
        if (countInCart > 0) {
            handleCountChange(countInCart)
        } else {
            handleCountChange(MIN_COUNT_IN_CART);
        }
    }

    const handleChangeInput = (e: React.FocusEvent<HTMLInputElement>) => {
        const countInCart = Number(e.target.value);
        if (countInCart > 0) {
            setValue(countInCart)
        } else {
            setValue(MIN_COUNT_IN_CART);
        }
    }

    useEffect(() => {
        setValue(amount)
    }, [amount])

    return (
        <div className={s.wrap}>
            <button
                className={s.minus}
                disabled={value <= 1}
                onClick={() => {
                    handleDecrement && handleDecrement();
                    setValue(prevState => prevState - 1)
                }}>-</button>
            <input type="number" className={s.num} value={value} onChange={handleChangeInput} onBlur={handleBlurInput} />
            <button
                className={s.plus}
                onClick={() => {
                    handleIncrement && handleIncrement();
                    setValue(prevState => prevState + 1)
                }}>+</button>
        </div>
    )
}

export default ButtonCount;