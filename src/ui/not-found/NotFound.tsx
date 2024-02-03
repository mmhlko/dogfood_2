import NotFoundIcon from './images/notFoundIcon.svg';
import { ReactNode } from 'react';
import s from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Button } from 'ui/button/Button';

type TNotFoundProps = {
    children?: ReactNode,
    title: string,
    buttonText?: string,
    buttonAction?: () => void
}

export const NotFound = ({ children, title, buttonText = 'На главную', buttonAction }: TNotFoundProps) => {
    return (
        <div className={s.notfound}>
            <span className={s.image}><NotFoundIcon /></span>
            <h1 className={s.title}>{title}</h1>
            {children && children}
            {buttonAction
                ? <Button variant={'border'} href='#' action={buttonAction}>{buttonText}</Button>
                : <Link to='/'><Button variant='border'>{buttonText}</Button></Link>
            }
        </div>
    )
}
