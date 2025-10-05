"use client"
import React, { useContext } from 'react'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { cartContext } from '../../../Context/CartContext'

type CartContextType = {
    addProductToCart: (id: string) => Promise<{ status: string }>;
    // add other context properties if needed
};

const AddBtnCart = ({ id }: { id: string }) => {

    const { addProductToCart } = useContext(cartContext as React.Context<CartContextType>)

    async function handleAddCart() {
        const data = await addProductToCart(id)

        if (data.status === "success") {
            toast.success("Added To Cart", { duration: 1000, position: "top-center" })
        }

        else {
            toast.error("Add to Cart Failed", { duration: 1000, position: "top-center" })
        }
    }

return (
    <div>
        <Button onClick={handleAddCart} size='' variant="outline" className='cstbtn'><i className="fa-solid fa-cart-shopping"></i></Button>
    </div>
)
}

export default AddBtnCart