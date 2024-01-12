import { ContentHeader } from "components/content-header/ContentHeader";
import { CardList } from "modules/card-list/components/CardList";

const ProductsPage = () => {
    return (
        <section className="container">
            <ContentHeader title="Каталог" textButton='Главная' to='/' />
            <CardList />
        </section>
    )
}

export default ProductsPage;