import ProtectedRoute from "components/protected-route/ProtectedRoute"
import { AuthPage } from "./auth-page/AuthPage"
import HomePage from "./home-page/HomePage"
import ProductsPage from "./products-page/ProductsPage"
import { TRoutes } from "./types"
import { ProductPage } from "./product-page/ProductPage"

export const RoutePath = {
    home: "/",
    login: "/signin",
    register: "/signup",
    products: "/products",
    product: "/product/:productId",
    cart: "/cart",
    profile: "/profile",
}

export const baseRoutes: TRoutes[] = [
    { path: RoutePath.home, element: <HomePage /> },    
]

export const privateRoutes: TRoutes[] = [
    { path: RoutePath.login, element: <ProtectedRoute onlyOnAuth><AuthPage /></ProtectedRoute> },
    { path: RoutePath.register, element: <ProtectedRoute onlyOnAuth><AuthPage isRegister /></ProtectedRoute> },
    { path: RoutePath.products, element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
    { path: RoutePath.product, element: <ProductPage /> },
]