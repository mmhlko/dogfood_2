import { memo, useEffect } from "react";
import AppRouter from "pages/AppRouter";
import { Header } from "modules/header/Header";
import { useAppDispatch, useAppSelector } from "storage/hookTypes";
import { fetchCheckToken } from "storage/user/userSlice";
import { fetchProducts } from "modules/card-list/store/productsSlice";
import { getToken } from "utils/auth";
import { Footer } from "modules/footer/components/Footer";

const App = () => {

    const dispatch = useAppDispatch();
    const token = getToken();
    const isAuthorized = useAppSelector(state => state.user.isAuthorized)

    useEffect(() => {
        dispatch(fetchCheckToken(token)) //проверка пользователя по токену
            .then(() => {
                token && dispatch(fetchProducts()) //проверка на наличие актуального токена
            })
    }, [token, isAuthorized])

    return (
        <>
            <Header />
            <main >
                <AppRouter />
            </main>
            <Footer />
            <AppRouter modal />
        </>
    )
}

export default memo(App);