import React from 'react'
import { getUserOrder } from '../../apis/getUserOrders'
import { CartItem, Order, Orders } from '../../types/order.type';
import Image from 'next/image';

const page = async () => {

  const data: Orders = await getUserOrder()



  return (
    <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0 text-2xl text-black '>
      <div>
        {data.map(function (order: Order, idx: number) {
          return <div className='p-5 bg-slate-200 mb-5' key={idx}>

            <div className='flex border-[1px] border-indigo-700 pb-5'>
              {order.cartItems.map(function (item: CartItem, idx: number) {
                return <div key={idx} className='w-1/6 me-3'>
                  <Image src={item.product.imageCover} alt={item.product.title} width={200} height={200} className="w-full" />
                  <h2 className='line-clamp-1'>{item.product.title}</h2>
                </div>
              })}
            </div>

            <div className='mt-5'>
              <h2>Payment Method: {order.paymentMethodType}</h2>
              <h2>Total Order Amount: {order.totalOrderPrice}.00 LE</h2>
            </div>

          </div>
        })}
      </div>
    </div>
  )
}

export default page