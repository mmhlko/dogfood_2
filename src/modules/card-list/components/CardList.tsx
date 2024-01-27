import { Card } from "./card/Card"
import s from './styles.module.scss';
import { useAppSelector } from "storage/hookTypes";
import { TProductResponseDto } from "types/userApi";

interface ICardListProps {
    list?: TProductResponseDto[]
}

export const CardList = ({list}: ICardListProps) => {
    const {data: products, loading, productPerPage} = useAppSelector(state => state.products);
    const cardList = list ? list : products
    return (
        <>
            <div className={s.cards}>
                {loading 
                    ? new Array(productPerPage).fill(<></>).map((_, i) => <Card key={i} />)
                    : cardList.map(product => <Card key={product._id} {...product}/>)
                }
            </div>
        </>
    )
}