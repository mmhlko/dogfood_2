import { Route, Routes } from "react-router-dom";
import { TRoutes } from "./types";
import { baseRoutes, privateRoutes } from "./routeConfig";
import { memo } from "react";

const AppRouter = () => {

    const routeMap = ({ path, element }: TRoutes) => <Route path={path} element={element} key={path} />

    return (
        <Routes>
            {baseRoutes.map(routeMap)}
            {privateRoutes.map(routeMap)}
        </Routes>
    )
}

export default memo(AppRouter);