import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "storage/hookTypes";
import { Spinner } from "ui/spinner/Spinner";
import { RoutePath } from "pages/routeConfig";

interface IProtectedRouteProps {
    onlyOnAuth?: boolean;
    children: ReactNode;
}

const ProtectedRoute = ({ onlyOnAuth, children }: IProtectedRouteProps) => {
    const user = useAppSelector(state => state.user.data);
    const isAuthChecked = useAppSelector(state => state.user.isAuthChecked);;
    const location = useLocation();

    //if (!isAuthChecked) return <Spinner />

    if (onlyOnAuth && user) {
        const from = location?.state?.from || { pathname: RoutePath.home };
        const { backgroundLocation } = location?.state?.from?.state || { backgroundLocation: null }
        return <Navigate replace to={from} state={{ backgroundLocation }} />
    }

    if (!onlyOnAuth && !user) {
        return (
            <Navigate replace to={{ pathname: RoutePath.login }} state={{ from: location }} />
        )
    }
    return <>{children}</>
}

export default ProtectedRoute;


/* простая версия 
function ProtectedRoute({loggedIn, children}) {
  return ( 
    loggedIn === true
    ? <>{children}</>
    : <Navigate to={'/login'} />
   );
} */