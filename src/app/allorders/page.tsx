import React from 'react'
import { getUserOrder } from '../../apis/getUserOrders'
import { CartItem, Order, Orders } from '../../types/order.type';
import Image from 'next/image';
import Link from 'next/link';

const page = async () => {

  const data: Orders = await getUserOrder()

  return (
    <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0'>

      {/* Navigation - Style Preserved */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Shopping
      </Link>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10 tracking-tight">
        My Orders
      </h1>

      <div className="space-y-8">
        {data.map(function (order: Order, idx: number) {
          return (
            <div className='bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300' key={idx}>

              {/* Order Header: Order # and Payment Method */}
              <div className='bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center'>
                <div className="flex gap-3 items-center">
                  <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                    #{idx + 1}
                  </span>
                  <h2 className='text-sm font-semibold text-slate-500 uppercase tracking-wider'>
                    Order Details
                  </h2>
                </div>

                {/* Payment Badge */}
                <div className='flex items-center'>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${order.paymentMethodType === 'cash'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                    }`}>
                    <i className={`fas ${order.paymentMethodType === 'cash' ? 'fa-money-bill-wave' : 'fa-credit-card'} mr-2`}></i>
                    {order.paymentMethodType === 'card' ? 'Online Payment' : 'Cash on Delivery'}
                  </span>
                </div>
              </div>

              {/* Order Items Grid */}
              <div className='p-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
                  {order.cartItems.map(function (item: CartItem, itemIdx: number) {
                    return (
                      <div key={itemIdx} className='group relative flex flex-col'>
                        {/* Image Container */}
                        <div className="aspect-square relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50 mb-3 flex items-center justify-center">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={200}
                            height={200}
                            className="object-contain w-full h-full p-2 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        {/* Product Title */}
                        <h3 className='text-sm font-medium text-slate-700 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors' title={item.product.title}>
                          {item.product.title}
                        </h3>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Footer: Totals */}
              <div className='bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center'>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <i className="fas fa-box-open"></i>
                  <span>{order.cartItems.length} Items</span>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-0.5">Total Amount</p>
                  <p className='text-2xl font-bold text-emerald-600 leading-none'>
                    {order.totalOrderPrice}<span className="text-sm font-normal text-slate-400 ml-1">LE</span>
                  </p>
                </div>
              </div>

            </div>
          )
        })}

        {/* Empty State (Optional safety) */}
        {data.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-300 text-5xl mb-4"><i className="fas fa-shopping-basket"></i></div>
            <p className="text-slate-500 text-lg">You have no orders yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
