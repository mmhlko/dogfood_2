import { Card } from "./card/Card"
import s from './styles.module.scss';
import { Spinner } from "ui/spinner/Spinner";
import { useAppSelector } from "storage/hookTypes";

export const CardList = () => {
    const {data: products, loading, productPerPage} = useAppSelector(state => state.products);
    
    return (
        <>
            <div className={s.cards}>
                {loading 
                    ? new Array(productPerPage).fill(<></>).map((_, i) => <Card key={i} />)
                    : products.map(product => <Card key={product._id} {...product}/>)
                }
            </div>
        </>
    )
}