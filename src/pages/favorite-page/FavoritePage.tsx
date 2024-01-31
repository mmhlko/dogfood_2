import { ContentHeader } from "components/content-header/ContentHeader"
import { CardList } from "modules/card-list/components/CardList"
import { useAppSelector } from "storage/hookTypes"
import { Spinner } from "ui/spinner/Spinner"

const FavoritePage = () => {    

    const {favoriteProducts: favorites, loading} = useAppSelector(state => state.products)

    return (
        <div className="content container"> 
            {loading
                ? <Spinner />
                :  <>
                    <ContentHeader title="Избранное" textButton='Назад'/>
                    <CardList list={favorites}/>
                </>
            }
        </div>
    )
}

export default FavoritePage;