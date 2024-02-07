import { MAX_PRODUCT_PER_PAGE } from "modules/card-list/constants/constants";

export const getPaginateData = (total: number, currentPage: number) => {

    const isPaginated = total > MAX_PRODUCT_PER_PAGE
    const totalPageCount = Math.ceil(total / MAX_PRODUCT_PER_PAGE)
    const pages = Array.from({ length: totalPageCount }, (_, i) => i + 1)
    const indexStartItem = isPaginated ? ((currentPage - 1) * MAX_PRODUCT_PER_PAGE) : 0
    const indexLastItem = indexStartItem + MAX_PRODUCT_PER_PAGE;

    return { totalPageCount, pages, indexStartItem, indexLastItem, isPaginated }
}

export const getTotalPages = (totalItems: number) => Math.ceil(totalItems / MAX_PRODUCT_PER_PAGE)