import { onClickCurrentPage, onPaginateNext, onPaginatePrev } from "../store/productsSlice";
import { Card } from "./card/Card"
import { Paginate } from "./paginate/Paginate";
import s from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "storage/hookTypes";
import { TProductResponseDto } from "types/typesApi";
import { MAX_PRODUCT_PER_PAGE } from "../constants/constants";
import { memo } from "react";
import { getPaginateData } from "../helpers/getPaginateData";

interface ICardListProps {
    list?: TProductResponseDto[]
}

export const CardList = memo(({ list }: ICardListProps) => {
    const { data: products, loading, currentPage, currentStartPage, currentEndPage } = useAppSelector(state => state.products);
    const cardList = list ? list : products
    const dispatch = useAppDispatch();
    const { totalPageCount, pages, indexStartItem, indexLastItem, isPaginated } = getPaginateData(cardList.length, currentPage);
    const productsView = cardList.slice(indexStartItem, indexLastItem)

    const onClickNext = () => {
        if (currentPage !== totalPageCount) dispatch(onPaginateNext());
    }

    const onClickPrev = () => {
        if (currentPage !== 1) dispatch(onPaginatePrev());
    }
    const onClickPage = (page: number) => {
        dispatch(onClickCurrentPage(page));
    }    

    return (
        <>
            <div className={s.cards}>
                {loading
                    ? new Array(MAX_PRODUCT_PER_PAGE).fill(<></>).map((_, i) => <Card key={i} />)
                    : productsView.map(product => <Card key={product._id} {...product} />)
                }
            </div>
            {isPaginated && (
                <Paginate
                    pages={pages}
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                    onClickPage={onClickPage}
                    currentPage={currentPage}
                    firstPage={currentStartPage}
                    lastPage={currentEndPage}
                />
            )}
        </>
    )
})