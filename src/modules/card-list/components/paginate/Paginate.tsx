import { Button, ButtonVariant } from "ui/button/Button";
import s from "./styles.module.scss";
import classNames from "classnames";
import ArrowIcon from "./img/arrow.svg"
import { useEffect } from "react";

interface IPaginateProps {
    onChangePage: (numberPage: number) => void,
    onClickPrev: () => void,
    onClickNext: () => void,
    onClickPage: (numberPage: number) => void,
    pages: number[],
    currentPage: number,
    rangeFirstPage: number,
    rangeLastPage: number
}
export const Paginate = ({ onClickNext, onClickPrev, pages, currentPage, onClickPage, rangeFirstPage, rangeLastPage, onChangePage}: IPaginateProps) => {

    const handleClickPage = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault()
        onClickPage(page);
    }

    console.log({
        rangeFirstPage: rangeFirstPage,
        rangeLastPage: rangeLastPage ,
        currentPage: currentPage,
        pages: pages
    });
    
    useEffect(() => {
        onChangePage(currentPage)
    }, [currentPage])
    
    return (
        <div className={s.paginate}>
        <Button extraClass={s.paginateButton} variant={ButtonVariant.border} action={onClickPrev} disabled={currentPage === 1}>
            <ArrowIcon className={s.iconBack} style={{ transform:  "rotate(180deg)" }}/>
            Назад
        </Button>
        <ul className={s.paginationList}>
            {pages?.slice(0, 1).map(page => (
                <li className={classNames(s.paginateItem, {[s.activeItem]: currentPage === page})}>
                    <a className={s.pageLink} href={`/catalog?page=${page}`} onClick={(e) => handleClickPage(e, page)}>{page}</a>
                </li>
            ))}
            {pages?.slice(rangeFirstPage - 1, rangeLastPage).map(page => (
                <li className={classNames(s.paginateItem, {[s.activeItem]: currentPage === page})}>
                    <a className={s.pageLink} href={`/catalog?page=${page}`} onClick={(e) => handleClickPage(e, page)}>{page}</a>
                </li>
            ))}
{/*                 <li className={classNames(s.paginateItem)}>
                    <a className={s.pageLink} href='#' onClick={(e) => e.preventDefault()}>...</a>
                </li> */}
            {pages?.slice(pages.length - 1).map(page => (
                <li className={classNames(s.paginateItem, {[s.activeItem]: currentPage === page})}>
                    <a className={s.pageLink} href={`/catalog?page=${page}`} onClick={(e) => handleClickPage(e, page)}>{page}</a>
                </li>
            ))}             
        </ul>
        <Button variant={ButtonVariant.border} action={onClickNext} disabled={currentPage === pages?.length}>
            Вперед
            <ArrowIcon className={s.iconBack}/>
        </Button>
        </div>

    );
}