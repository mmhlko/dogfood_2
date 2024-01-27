import { useAppDispatch, useAppSelector } from 'storage/hookTypes';
import s from './styles.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLiked } from 'utils/products';
import { ContentHeader } from 'components/content-header/ContentHeader';
import { Rating } from 'components/rating/Rating';
import { ProductPrice } from 'components/product-price/ProductPrice';
import { Button } from 'ui/button/Button';
import Truck from "../assets/truck.svg"
import Quality from "../assets/quality.svg"
import LikeIcon from "../assets/like.svg"
import ButtonCount from 'components/button-count/ButtonCount';

interface IProductProps {
    onProductLike: (data: {likes:string[], _id:string}) => void
}

export const Product = ({onProductLike }: IProductProps) => {
    const { name, description, pictures, price, wight, discount, likes = [], _id, reviews } = useAppSelector(state => state.product.data)
    const addDataCart = { _id, name, pictures, discount, price, wight }
    const currentUser = useAppSelector(state => state.user.data)
    const [currentRating, setCurrentRating] = useState<number>(5)
    const navigate = useNavigate(); //хук для навигации по сайту
    const like = currentUser && isLiked(likes, currentUser._id)
    const dispatch = useAppDispatch();

    //проверка наличия товара в корзине
    //const cartProducts = useAppSelector(state => state.cart.data);  //корзина
    //const productInCartInfo = checkProductInCart(cartProducts, _id as string) ;  //проверяемый товар + проверка на сущ. _id

    const handleLikeClick = () => {
        onProductLike({likes, _id: _id})        
    }
    const createMarkupDescription = () => {
        return { __html: description };
    }
    const handleCartClick = () => {
        //dispatch(addProductCart(addDataCart))
    }



    return (
        <>
            <ContentHeader textButton={'назад'} title={name}>
                <p className={s.articul}>Артикул: <b>664646</b></p>
                <Rating currentRating={currentRating} setCurrentRating={setCurrentRating} />
            </ContentHeader>

            <div className={s.product}>
                <div className={s.imgWrapper}>
                    <img src={pictures} alt={name} />
                </div>
                <div className={s.desc}>
                    <ProductPrice price={price} discount={discount} type='small' />
                    <div className={s.btnWrap}>
                        <div className={s.left}>
                            <ButtonCount
                                amount={/* productInCartInfo.quantity */5}
                                handleIncrement={() => { /* dispatch(incrementQuantityCart(addDataCart)) */ }}
                                handleDecrement={() => { /* dispatch(decrementQuantityCart(addDataCart)) */ }}
                                handleCountChange={(newQuantity) => { /* dispatch(changeProductQuantityCart({ ...addDataCart, quantity: newQuantity }))  */ }}
                            />
                        </div>
                        {/* <Button action={handleCartClick} href='#' variant='primary'>{!productInCartInfo.quantity && productInCartInfo.quantity === 0 ? 'В корзину' : 'Добавлено'}</Button> */}
                    </div>
                    <button className={classNames(s.favorite, { [s.favoriteActive]: like })} onClick={handleLikeClick}>
                        <LikeIcon />
                        {like ? 'В избранном' : 'В избранное'}
                    </button>
                    <div className={s.delivery}>
                        <span><Truck /></span>
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className={s.text}>
                                Доставка курьером —{" "}
                                <span className={s.bold}> от 399 ₽</span>
                            </p>
                            <p className={s.text}>
                                Доставка в пункт выдачи —{" "}
                                <span className={s.bold}> от 199 ₽</span>
                            </p>
                        </div>
                    </div>
                    <div className={s.delivery}>
                        <span><Quality /></span>
                        <div className={s.right}>
                            <h3 className={s.name}>Гарантия качества</h3>
                            <p className={s.text}>
                                Если Вам не понравилось качество нашей продукции, мы вернем
                                деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                                нужды.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.box}>
                <h2 className={s.title}>Описание</h2>
                <p className={s.subtitle} dangerouslySetInnerHTML={createMarkupDescription()}></p>
                <h2 className={s.title}>Характеристики</h2>
                <div className={s.grid}>
                    <div className={s.naming}>Вес</div>
                    <div className={s.description}>1 шт 120-200 грамм</div>
                    <div className={s.naming}>Цена</div>
                    <div className={s.description}>490 ₽ за 100 грамм</div>
                    <div className={s.naming}>Польза</div>
                    <div className={s.description}>
                        <p>
                            Большое содержание аминокислот и микроэлементов оказывает
                            положительное воздействие на общий обмен веществ собаки.
                        </p>
                        <p>Способствуют укреплению десен и жевательных мышц.</p>
                        <p>
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                            зубов.
                        </p>
                        <p>
                            Имеет цельную волокнистую структуру, при разжевывание получается
                            эффект зубной щетки, лучше всего очищает клыки собак.
                        </p>
                        <p>Следует учесть высокую калорийность продукта.</p>
                    </div>
                </div>
            </div>

            {reviews?.length !== 0 && reviews?.map((reviewData, index) => <span key={index}>Отзыв {index}</span> /* <Review key={index} {...reviewData}/> */)}

            Отзыв о товаре
            {/* <FormReview title={`Отзыв о товаре ${name}`} productId={_id}/> */}
        </>
    );
}

export default Product;