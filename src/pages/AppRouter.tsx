import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { TRoutes } from "./types";
import { baseRoutes, privateModalRoutes, privateRoutes } from "./routeConfig";
import { memo } from "react";
import { Modal } from "components/modal/Modal";
import ProtectedRoute from "components/protected-route/ProtectedRoute";

interface IAppRouterProps {
    modal?: boolean
}
const AppRouter = ({ modal }: IAppRouterProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;

    const routeMap = ({ path, element }: TRoutes) => <Route path={path} element={element} key={path} />
    const modalRouteMap = ({ path, element }: TRoutes) => (
        <Route path={path} key={path} element={
            <ProtectedRoute onlyOnAuth>
                <Modal isOpen onClose={onCloseRoutingModal}>{element}</Modal>
            </ProtectedRoute>
        } />
    )
    //закрытие модального окна ведет на страницу открытия модального окна или на главную
    const onCloseRoutingModal = () => {
        navigate(initialPath || '/', { replace: true }) //вторым полем удаляем из истории переход обратно
    }

    return (
        <>
            {!modal
                ? <Routes location={backgroundLocation && { ...backgroundLocation, pathname: initialPath } || location}>
                    {baseRoutes.map(routeMap)}
                    {privateRoutes.map(routeMap)}
                </Routes>
                : <>
                    {backgroundLocation && <Routes>
                        {privateModalRoutes.map(modalRouteMap)}
                    </Routes>}
                </>
            }
        </>
    )
}

export default memo(AppRouter);