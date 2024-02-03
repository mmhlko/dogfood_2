
import classNames from 'classnames';
import s from './styles.module.scss'
import { Link } from 'react-router-dom';

export enum BannerSize {
    big = 'big',
    middle = 'middle',
    small = 'small',
}

interface IBannerProps {
    size: BannerSize;
    title: string;
    subtitle?: string;
    bg?: string;
    colorBg: string;
    extraClass?: string;
    price?: string;
    href?: string
}

export const Banner = ({ title, subtitle, bg, colorBg, size, price, extraClass, href = null}: IBannerProps) => {
    return (
            <Link to={href}
                className={classNames(s.banner,
                {
                    [s[extraClass]]: !!extraClass, 
                    [s[size]]: `${size}`,
                    [s.banner_href]: href,
                })}
                style={{ backgroundColor: colorBg, backgroundImage: `url('${bg}')` }}>
                <h2 className={s.title}>{title}</h2>
                {subtitle && <p className={s.subtitle}>{subtitle}</p>}
                {price && <p className={s.price}>{price}</p>}
            </Link>
    );
}