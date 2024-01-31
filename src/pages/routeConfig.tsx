import ProtectedRoute from "components/protected-route/ProtectedRoute"
import AuthPage from "./auth-page/AuthPage"
import HomePage from "./home-page/HomePage"
import ProductsPage from "./products-page/ProductsPage"
import { TRoutes } from "./types"
import ProductPage from "./product-page/ProductPage"
import FavoritePage from "./favorite-page/FavoritePage"
import ProfilePage from "./profile-page/ProfilePage"
import { Route, Routes } from "react-router-dom"
import { ProfileInfo } from "modules/profile/components/profile-info/ProfileInfo"
import ProfileForm from "modules/profile/components/profile-form/ProfileForm"
import CartPage from "./cart-page/CartPage"
import { AuthForm } from "modules/auth-form"
import NotFoundPage from "./not-found-page/NotFoundPage"

export const RoutePath = {
    home: "/",
    login: "/signin",
    register: "/signup",
    products: "/products",
    product: "/product/:productId",
    cart: "/cart",
    profile: "/profile",
    favorites: "/favorites"
}
export const baseRoutes: TRoutes[] = [
    { path: RoutePath.home, element: <HomePage /> },
    { path: "*", element: <NotFoundPage /> },
]

export const privateRoutes: TRoutes[] = [
    { path: RoutePath.login, element: <ProtectedRoute onlyOnAuth><AuthPage /></ProtectedRoute> },
    { path: RoutePath.register, element: <ProtectedRoute onlyOnAuth><AuthPage isRegister /></ProtectedRoute> },
    { path: RoutePath.products, element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
    { path: RoutePath.product, element: <ProductPage /> },
    { path: RoutePath.favorites, element: <FavoritePage /> },
    {
        path: `${RoutePath.profile}/*`,
        element: <Routes>
            <Route element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
                <Route index element={<ProfileInfo />} />
                <Route path='edit' element={<ProfileForm />} />
            </Route>
        </Routes>
    },
    { path: RoutePath.cart, element: <ProtectedRoute><CartPage /></ProtectedRoute> },
]

export const privateModalRoutes: TRoutes[] = [
    { path: RoutePath.login, element: <AuthForm isModal /> },
    { path: RoutePath.register, element: <AuthForm isRegister isModal /> },
]