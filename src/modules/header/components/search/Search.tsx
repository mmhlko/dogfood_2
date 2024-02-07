
import s from "./styles.module.scss"
import { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import SearchClearIcon from './assets/close-icon.svg';
import classNames from "classnames";

interface ISearchProps {
    handleFormSubmit?: (e: FormEvent<HTMLFormElement>) => void,
    handleInputChange: (value: string) => void,
    handleInputClear: (e: SyntheticEvent<HTMLButtonElement>) => void,
    value: string
}

export const Search = ({ handleFormSubmit, handleInputChange, handleInputClear, value }: ISearchProps) => {

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e.target.value)
    }

    return (
        <form className={s.search} onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                className={s.search__input}
                onChange={onInputChange}
                value={value}
                placeholder='поиск' 
            />
            <button onClick={handleInputClear} className={classNames(s.search__btn, s.search__clear__btn)}>
                <SearchClearIcon />
            </button>
        </form>
    )
}
