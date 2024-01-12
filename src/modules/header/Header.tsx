import s from './styles.module.scss';
import './styles.css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import FavoritesIcon from './img/favorites.svg';
import LogoutIcon from './img/logout.svg';
import CartIcon from './img/cart.svg';
import UserIcon from './img/user.svg';
import ProfileIcon from './img/profile.svg';
import classNames from 'classnames';
import { Logo } from 'components/logo/Logo';

interface IHeaderProp {
  children?: ReactNode // тип для входящих в компонент дочерних компонентов
}

//FC<T> - компонент функции 
//type FC<P = {}> = FunctionComponent<P> добавляет свой пропс в FunctionComponent
export const Header = ({children}: IHeaderProp) => {
//export function Header({children}: IHeaderProp) {

//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const favorites = useAppSelector(state => state.products.favoriteProducts) || {length: 0}//стало
//   const currentUser = useAppSelector(state => state.user.data)
//   const cartCount = useAppSelector(state => state.cart.totalProductsCount)

//   const { toggleTheme } = useContext(ThemeContext)
//   //было const { favorites } = useContext(CardsContext)  
//   //const {currentUser, onUpdatedUser} = useContext(UserContext) // currentUser context  
//   const handleClickButtonEdit = () => {
//     /* onUpdatedUser({name: 'Макс', about: 'Пользователь'}) */
//   }
  

  return (
    <header className={s.header}>
      <div className={classNames('container', s.header__wrapper)}>
        <Logo />
      </div>

    </header>
  );
}
