import { AuthPage } from "./auth-page/AuthPage"
import HomePage from "./home-page/HomePage"
import ProductsPage from "./products-page/ProductsPage"
import { TRoutes } from "./types"

export const RoutePath = {
    home: "/",
    login: "/signin",
    register: "/singup",
    products: "/products",
    product: "/products/:productId",
    cart: "/cart",
    profile: "/profile",
}

export const baseRoutes: TRoutes[] = [
    { path: RoutePath.home, element: <HomePage />},
    { path: RoutePath.products, element: <ProductsPage />},
]

export const privateRoutes: TRoutes[] = [
    { path: RoutePath.login, element: <AuthPage />},
]