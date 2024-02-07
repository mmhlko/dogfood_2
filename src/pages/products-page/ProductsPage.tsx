import { ContentHeader } from "components/content-header/ContentHeader";
import { CardList } from "modules/card-list/components/CardList";
import { RoutePath } from "pages/routeConfig";
import { useAppSelector } from "storage/hookTypes";
import { NotFound } from "ui/not-found/NotFound";
import { Spinner } from "ui/spinner/Spinner";

const ProductsPage = () => {
    const { total, searchQuery, isSearchFulfilled, fetchSearchProductsLoading } = useAppSelector(state => state.products)
    const isSearchFulfilledWithQuery = isSearchFulfilled && searchQuery
    const isSearchNotFound = isSearchFulfilledWithQuery && total === 0
    const contentHeaderTitle = isSearchFulfilledWithQuery ? `По запросу "${searchQuery}" найдено товаров: ${total}` : "Каталог"
    return (
        <section className="container">
            <ContentHeader title={contentHeaderTitle} textButton="Главная" to={RoutePath.home} />
            {fetchSearchProductsLoading
                ? <Spinner />
                : <>
                    {isSearchNotFound
                        ? <NotFound title="Простите, по вашему запросу товаров не надено" />
                        : <CardList />
                    }
                </>
            }
        </section>
    )
}

export default ProductsPage;