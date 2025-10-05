"use client"
import React, { useContext } from 'react'
import Loading from '../loading'
import { cartContext } from '../../Context/CartContext'
import { Button } from '../../components/ui/button'
import Image from 'next/image';
import { ProductCart } from '../../types/cart.type';
import { toast } from 'sonner'
import Link from 'next/link'



const Cart = () => {

  const { isLoading, products, totalCartPrice, removeCartItem, updateCart, clearCart} = useContext(cartContext)

  async function removeItem(id: string){
    const data = await removeCartItem(id)
        if (data.status === "success") {
            toast.success("Removed From Cart.", { duration: 1000, position: "top-center" })
        }

        else {
            toast.error("Removing Failed.", { duration: 1000, position: "top-center" })
        }    
  }

    async function updateItem(id: string, count: number){
    const data = await updateCart(id, count)
        if (data.status === "success") {
            toast.success("Item Updated.", { duration: 500, position: "top-center" })
        }

        else {
            toast.error("Updating Failed.", { duration: 500, position: "top-center" })
        }    
  }

  if (isLoading){
    return <Loading/>
  }

  if (products.length == 0){
    return <div className='flex justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-red-600'>Oops...Cart is empty, add some items to show them here.</h1>
    </div>
  }


  return (
    <div className='container mx-auto my-10 px-5 bg-slate-100 shadow-accent text-black'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Shop Cart</h1>
        <p className='my--3 text-indigo-700'>Total Price: {totalCartPrice}</p>
        <div className='allProducts'>
          {products.map(function (product: ProductCart, idx: number) {
            return <div key={idx} className='flex items-center justify-between py-3 border-indigo-700 border-b-[1px]'>
              <div className='flex items-center gap-5'>
                <div className='p-0'>
                  <Image alt="" src={product.product.imageCover} height={200} width={200} />
                </div>
                <div>
                  <h1>{product.product.title}</h1>
                  <p className='my-3 text-indigo-700'>Price: {product.price}</p>
                  <Button onClick={()=> removeItem(product.product.id)} className='h-auto w-auto mt-10 hover:bg-red-600' variant={undefined} size={undefined}><i className='fa-solid fa-trash-can'></i></Button>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Button onClick={()=> updateItem(product.product.id, product.count + 1)} className="cstbtn w-0.5 h-0.5" variant={undefined} size={undefined}>+</Button>
                <p className='border-indigo-700 border-2 p-1'>{product.count}</p>
                <Button onClick={()=> updateItem(product.product.id, product.count - 1)} className="cstbtn w-0.5 h-0.5" variant={undefined} size={undefined}>-</Button>
              </div>
            </div>
          })}
        <Button className='h-auto w-auto mt-10 cstbtn mr-2' variant={undefined} size={undefined}>
          <Link href={'/payment'}>Check-out</Link>
        </Button>
        <Button onClick={clearCart} className='h-auto w-auto mt-10 hover:bg-red-600 ml-2' variant={undefined} size={undefined}>Clear Cart</Button>
 
        </div>

      </div>

    </div>
  )
}

export default Cart