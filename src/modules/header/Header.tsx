import s from './styles.module.scss';
import './styles.css';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FavoritesIcon from './img/favorites.svg';
import LogoutIcon from './img/logout.svg';
import CartIcon from './img/cart.svg';
import UserIcon from './img/user.svg';
import ProfileIcon from './img/profile.svg';
import classNames from 'classnames';
import { Logo } from 'components/logo/Logo';
import { useAppDispatch, useAppSelector } from 'storage/hookTypes';
import { logout } from 'storage/user/userSlice';
import { RoutePath } from 'pages/routeConfig';

interface IHeaderProp {
    children?: ReactNode // тип для входящих в компонент дочерних компонентов
}

//FC<T> - компонент функции 
//type FC<P = {}> = FunctionComponent<P> добавляет свой пропс в FunctionComponent
export const Header = ({ children }: IHeaderProp) => {
    //export function Header({children}: IHeaderProp) {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.products.favoriteProducts) || { length: 0 }//стало
    const currentUser = useAppSelector(state => state.user.data)
    //const cartCount = useAppSelector(state => state.cart.totalProductsCount)
    const handleClickLogout = () => {
        dispatch(logout())
    }

    return (
        <header className={s.header}>
            <div className={classNames('container', s.header__wrapper)}>
                <Logo />
                <div className={s.iconsMenu}>
                    <Link to={RoutePath.favorites} className={s.favoritesLink}>
                        <FavoritesIcon />
                        {favorites?.length > 0 && <span className={s.iconBubble}>{favorites.length}</span>}
                    </Link>
                    <Link to={"#"} className={s.favoritesLink}>
                        <CartIcon />
                        {/* {cartCount > 0 && <span className={s.iconBubble}>{cartCount}</span>} */}
                    </Link>
                    {currentUser
                        ?
                        <>
                            <Link to={RoutePath.profile} className={s.iconsMenuItem}><ProfileIcon /></Link>
                            <Link to={RoutePath.home} className={s.iconsMenuItem} onClick={handleClickLogout}><LogoutIcon /></Link>
                        </>
                        :
                        <Link replace to={RoutePath.login} className={s.iconsMenuItem} state={{ backgroundLocation: location, initialPath: location.pathname }}>
                            <UserIcon />
                            Войти
                        </Link>
                    }
                </div>
            </div>

        </header>
    );
}
