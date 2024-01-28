import { memo, useEffect, useState } from "react";
import AppRouter from "pages/AppRouter";
import { Header } from "modules/header/Header";
import { useAppDispatch } from "storage/hookTypes";
import { fetchCheckToken } from "storage/user/userSlice";
import { fetchProducts } from "modules/card-list/store/productsSlice";
import { getLocalData } from "utils/local-storage";
import { getToken } from "utils/auth";

const App = () => {

    const dispatch = useAppDispatch();
    const token = getToken();

    console.log("getToken", getToken());
    
    
    useEffect(() => {       
        dispatch(fetchCheckToken())
            .then(() => {
                token && dispatch(fetchProducts())
            })        
    }, [dispatch, token])

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