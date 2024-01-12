import { useEffect, useState } from "react"
import { Card } from "./card/Card"
import s from './styles.module.scss';
import { Spinner } from "ui/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "storage/hookTypes";
import { fetchProducts } from "../store/productsSlice";

export const CardList = () => {
    const dispatch = useAppDispatch();
    const {data: products, loading} = useAppSelector(state => state.products)

    useEffect(() => {
        console.log("fetchProducts");        
        dispatch(fetchProducts())
    }, [])
    
    return (
        <>
            <div className={s.cards}>
                {products?.map(product => <Card key={product._id} {...product}/>)}
                {loading && <Spinner />}
            </div>
        </>
    )
}