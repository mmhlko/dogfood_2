import { memo, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TRoutes } from "./types";
import { useDispatch } from "react-redux";
import { baseRoutes, privateRoutes } from "./routeConfig";

const AppRouter = () => {

    const dispatch = useDispatch();
    const routeMap = ({ path, element }: TRoutes) => <Route path={path} element={element} key={path} />

    return (
        <Routes>
            {baseRoutes.map(routeMap)}
            {privateRoutes.map(routeMap)}
        </Routes>
    )
}

export default memo(AppRouter);