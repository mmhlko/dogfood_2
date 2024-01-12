import { Link, To } from 'react-router-dom';
import { ReactNode } from 'react';
import s from './styles.module.scss';
import ArrowIcon from './assets/arrow.svg';
const PREV_PAGE = -1;

interface IContentHeaderProps {
    title: string,
    children?: ReactNode,
    to?: string,
    textButton?: string,
}

export const ContentHeader = ({ title, children, to, textButton }: IContentHeaderProps) => {

    return (
        <>
            {textButton && <Link to={to || PREV_PAGE as To} className={s.buttonBack}><ArrowIcon className={s.iconBack} />{textButton}</Link>}
            <h1 className={s.title}>{title}</h1>
            {children}
        </>
    )
}
