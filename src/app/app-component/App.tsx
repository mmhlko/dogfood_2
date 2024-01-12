import { memo } from "react";
import AppRouter from "pages/AppRouter";
import { Header } from "modules/header/Header";

const App = () => {

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