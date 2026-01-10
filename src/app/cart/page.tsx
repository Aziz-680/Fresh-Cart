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

  const { isLoading, products, totalCartPrice, removeCartItem, updateCart, clearCart } = useContext(cartContext)

  async function removeItem(id: string) {
    const data = await removeCartItem(id)
    if (data.status === "success") {
      toast.success("Removed From Cart.", { duration: 1000, position: "top-center" })
    } else {
      toast.error("Removing Failed.", { duration: 1000, position: "top-center" })
    }
  }

  async function updateItem(id: string, count: number) {
    if (count < 1) return; // Prevent going below 1
    const data = await updateCart(id, count)
    if (data.status === "success") {
      toast.success("Item Updated.", { duration: 500, position: "top-center" })
    } else {
      toast.error("Updating Failed.", { duration: 500, position: "top-center" })
    }
  }

  if (isLoading) {
    return <Loading />
  }

  // --- Empty State ---
  if (products.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col justify-center items-center text-center px-4'>
        <div className="mb-8 p-6 bg-slate-50 rounded-full">
            <i className="fas fa-shopping-basket text-6xl text-slate-300"></i>
        </div>
        
        <h1 className='text-3xl font-bold text-slate-800 mb-2'>Your Cart is Empty</h1>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Shopping
        </Link>
      </div>
    )
  }

  // --- Main Cart View ---
  return (
    <div className='container mx-auto my-10 px-5 md:w-[80%]'>
      
      {/* Navigation - Style Preserved */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Shopping
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className='bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center'>
            <h1 className='text-xl md:text-2xl font-bold text-slate-800'>Shopping Cart</h1>
            <span className="text-slate-500 text-sm font-medium">{products.length} Items</span>
        </div>

        {/* Products List */}
        <div className='divide-y divide-slate-100'>
          {products.map(function (product: ProductCart, idx: number) {
            return (
              <div key={idx} className='p-6 flex flex-col md:flex-row items-center gap-6'>
                
                {/* Image */}
                <div className='shrink-0 w-24 h-24 bg-white border border-slate-100 rounded-lg p-2 flex items-center justify-center'>
                  <Image 
                    alt={product.product.title} 
                    src={product.product.imageCover} 
                    height={200} 
                    width={200} 
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className='flex-grow text-center md:text-left'>
                  <h2 className='text-lg font-bold text-slate-800 mb-1 line-clamp-1'>
                    {product.product.title}
                  </h2>
                  <p className='text-emerald-600 font-bold text-lg'>
                    {product.price} <span className="text-sm font-normal text-slate-400">LE</span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className='flex items-center gap-3 bg-slate-50 rounded-lg p-1'>
                  <Button 
                    onClick={() => updateItem(product.product.id, product.count - 1)}
                    disabled={product.count <= 1}
                    className="h-8 w-8 p-0 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-emerald-600 rounded shadow-sm disabled:opacity-50"
                    variant="ghost" size={undefined}                  >
                    <i className="fas fa-minus text-xs"></i>
                  </Button>
                  
                  <span className='w-8 text-center font-semibold text-slate-700'>{product.count}</span>
                  
                  <Button 
                    onClick={() => updateItem(product.product.id, product.count + 1)}
                    className="h-8 w-8 p-0 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-emerald-600 rounded shadow-sm"
                    variant="ghost" size={undefined}                  >
                    <i className="fas fa-plus text-xs"></i>
                  </Button>
                </div>

                {/* Remove Button */}
                <Button 
                  onClick={() => removeItem(product.product.id)}
                  className='text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors h-10 w-10 rounded-full'
                  variant="ghost"
                  title="Remove item" size={undefined}                >
                    <i className='fa-solid fa-trash-can'></i>
                </Button>

              </div>
            )
          })}
        </div>

        {/* Footer Summary */}
        <div className='bg-slate-50 p-6 border-t border-slate-100'>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Total Price */}
                <div className="text-center md:text-left">
                    <p className="text-slate-500 text-sm mb-1">Total Cart Price</p>
                    <p className="text-3xl font-bold text-emerald-600">
                        {totalCartPrice} <span className="text-lg text-slate-400 font-normal">LE</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                onClick={clearCart}
                className='flex-1 md:flex-none bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 h-12 px-6'
                variant="outline" size={undefined}                    >
                        Clear Cart
                    </Button>
                    
                    <Link href={'/payment'} className="flex-1 md:flex-none">
                        <Button className='w-full h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-200' variant={undefined} size={undefined}>
                            Check Out <i className="fas fa-arrow-right ml-2"></i>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Cart