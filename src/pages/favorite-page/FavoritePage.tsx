import { ContentHeader } from "components/content-header/ContentHeader"
import { CardList } from "modules/card-list/components/CardList"
import { useAppSelector } from "storage/hookTypes"
import { Spinner } from "ui/spinner/Spinner"

export const FavoritePage = () => {    

    const favorites = useAppSelector(state => state.products.favoriteProducts)
    const isLoading = useAppSelector(state => state.products.loading)
    return (
        <div className="content container"> 
            {isLoading
                ? <Spinner />
                :  <>
                    <ContentHeader title="Избранное" textButton='Назад'/>
                    <CardList list={favorites}/>
                </>

            }
        </div>
    )
}