import { memo, useEffect } from "react";
import AppRouter from "pages/AppRouter";
import { Header } from "modules/header/Header";
import { useAppDispatch } from "storage/hookTypes";
import { getToken } from "utils/auth";
import { fetchCheckToken } from "storage/user/userSlice";
import { fetchProducts } from "modules/card-list/store/productsSlice";

const App = () => {

    const dispatch = useAppDispatch();
    const token = getToken();

    useEffect(() => {
       
        dispatch(fetchCheckToken())
            .then(() => {
                token && dispatch(fetchProducts())
            })        
    }, [])

    return (
        <>
            <Header />
            <main >
                <AppRouter />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default memo(App);