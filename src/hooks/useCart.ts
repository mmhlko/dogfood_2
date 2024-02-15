import { changeProductQuantityCart, decrementQuantityCart, incrementQuantityCart, removeProductFromCart } from "modules/cart"
import { useAppDispatch } from "storage/hookTypes"
import { TProductCartData } from "types/products"

export const useCart = (cartProduct: TProductCartData) => {
    const dispatch = useAppDispatch()

    const handleClickIncrement = () => { dispatch(incrementQuantityCart(cartProduct)) }
    const handleClickDecrement = () => { dispatch(decrementQuantityCart(cartProduct)) }
    const handleCartCountChange = (newQuantity: number) => { dispatch(changeProductQuantityCart({ ...cartProduct, quantity: newQuantity })) }
    const handleRemoveItem = () => { dispatch(removeProductFromCart(cartProduct)) }

    return {handleClickIncrement, handleClickDecrement, handleCartCountChange, handleRemoveItem}
}