import './styles.scss';
import classNames from 'classnames';
import LikeIcon from "./images/like.svg";
import TrashIcon from "./images/trash.svg";
import { Link, useLocation } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import { ProductPrice } from 'components/product-price/ProductPrice';
import { fetchChangeProductLike } from 'modules/card-list/store/productsSlice';
import { useAppDispatch, useAppSelector } from 'storage/hookTypes';
import { isLiked } from 'utils/products';
import ContentLoader from "react-content-loader"
import { addProductCart } from 'modules/cart';
import { RoutePath } from 'pages/routeConfig';
import { CardPreloader } from '../card-preloader/CardPreloader';

export const Card = ({ name, price, discount, wight, pictures, tags, likes, _id }: any) => {
    const dispatch = useAppDispatch();
    const addDataCart = { _id, name, pictures, discount, price, wight }
    const currentUser = useAppSelector(state => state.user.data)
    const isLoading = useAppSelector(state => state.products.loading)
    const like = currentUser && isLiked(likes, currentUser._id);
    const location = useLocation();
    const isFavoritePage = location.pathname === RoutePath.favorites

    const handleClickButtonLike = () => { //ожидание нажатия кнопки лайка
        dispatch(fetchChangeProductLike({ likes, _id }))  //в функцию попадет объект product, а мы его сразу деструктурировали на два интересующих свойства
    }

    const handleCartClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(addProductCart(addDataCart))
    }

    const tagsRender = (tagName: string) => (
        <span key={tagName} className={classNames('tag', { [`tag_type_${tagName}`]: tagName })}>
            {tagName}
        </span>
    )

    return (
        <>
            {isLoading
                ? <CardPreloader />
                : (
                    <article className='card'>
                        <div className="card__sticker card__sticker_type_top-left">
                            {discount !== 0 && <span className="card__discount">{`- ${discount}%`}</span>}
                            {tags && tags.map(tagsRender)}
                        </div>
                        <div className="card__sticker card__sticker_type_top-right">
                            <button
                                onClick={handleClickButtonLike}
                                className={classNames(
                                    'card__favorite',
                                    'card__favorite-icon',
                                    { 'card__favorite_is-active': like && !isFavoritePage }
                                )}
                            >
                                {isFavoritePage ? <TrashIcon /> : <LikeIcon className='card__favorite-icon' />}
                            </button>
                        </div>
                        <Link to={`/product/${_id}`} className="card__link">
                            <img src={pictures} alt={name} className="card__image" />
                            <div className="card__desc">
                                <ProductPrice price={price} discount={discount} type='small' />
                                <span className="card__weight">{wight}</span>
                                <h3 className="card__name">{name}</h3>
                            </div>
                        </Link>
                        <a href="#" className="card__cart btn btn_type_primary" onClick={handleCartClick}>В корзину</a>
                    </article>
                )
            }
        </>
    );
}