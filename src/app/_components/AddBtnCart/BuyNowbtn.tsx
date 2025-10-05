"use client"
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation' 
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { cartContext } from '../../../Context/CartContext'

const BuyNowbtn = ({ id }) => {
    const router = useRouter() 
    const { addProductToCart, clearCart } = useContext(cartContext)

    async function handleBuyNow() {
        await clearCart()
        const data = await addProductToCart(id)

        if (data.status === "success") {
            toast.success("Added To Cart, Redirecting...", { duration: 1500, position: "top-center" })
            
            router.push('/payment') 
        } else {
            toast.error("Operation Failed", { duration: 1000, position: "top-center" })
        }
    }

    return (
        <div>
            <Button onClick={handleBuyNow} size='' variant="outline" className='cstbtn'>Buy now</Button>
        </div>
    )
}

export default BuyNowbtn