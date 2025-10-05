import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getUserCartAction } from '../CartActions/getUserCart';
import { Cart, ProductCart } from '../types/cart.type'; // Assuming Product2 type is also in cart.type
import { AddToCartAction } from '../CartActions/addToCart';
import { removeCartItemAction } from '../CartActions/removeCartItems';
import { updateCartAction } from '../CartActions/updateCartAction';
import { clearCartAction } from '../CartActions/clearCart';

// 1. Define the complete shape of your context's value.
// This should include all state and functions you want to share.
interface CartContextType {
    isLoading: boolean;
    numOfCartItems: number;
    totalCartPrice: number;
    products: ProductCart[]; // Use a specific Product2 type
    cartId: string | null;
    addProductToCart: (productId: string) => Promise<any>;
    removeCartItem: (productId: string) => Promise<any>;
    updateCart: (productId: string, count: number) => Promise<any>;
    clearCart: () => Promise<any>;
}

// 2. Create the context with a default value that matches the type.
// This prevents errors in components that consume the context.
export const cartContext = createContext<CartContextType>({
    isLoading: true,
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
    cartId: null,
    addProductToCart: async () => {},
    removeCartItem: async () => {},
    updateCart: async () => {},
    clearCart: async () => {},
});

// Define a type for the component's props for clarity.
interface CartContextProviderProps {
    children: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {

    // 3. Strongly type all your state variables.
    const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartId, setCartId] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductCart[]>([]);




    async function addProductToCart(id: string) {
        try {
            const data = await AddToCartAction(id)
            getUserCart()
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function removeCartItem(id: string) {
        try {
            const data = await removeCartItemAction(id)

            setNumOfCartItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)

            return data

        } catch (error) {
            console.log(error);
        }
    }

    async function updateCart(id: string, count: number) {
        try {
            const data = await updateCartAction(id, count)

            setNumOfCartItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)

            return data

        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart() {
        try {
            const data = await clearCartAction()

            setNumOfCartItems(0)
            setProducts([])
            setTotalCartPrice(0)

            return data

        } catch (error) {
            console.log(error);
        }
    }


    async function getUserCart() {

        setIsLoading(true)

        try {
            const data: Cart = await getUserCartAction()

            setNumOfCartItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartId(data.cartId)

            setIsLoading(false)

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(function () {
        getUserCart()
    }, [])



    return (
        <cartContext.Provider value={{
            isLoading,
            numOfCartItems,
            products,
            totalCartPrice,
            addProductToCart,
            removeCartItem,
            updateCart,
            clearCart,
            cartId
        }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider