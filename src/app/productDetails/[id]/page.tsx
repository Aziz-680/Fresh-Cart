import React from 'react'
import getSingleProduct from '../../../apis/singleProduct'
import Image from 'next/image'
import AddBtnCart from '../../_components/AddBtnCart/AddBtnCart'
import Link from 'next/link'
import BuyNowbtn from './../../_components/AddBtnCart/BuyNowbtn';

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  // Await params if using Next.js 15+, otherwise access directly
  const { id } = await params
  const data = await getSingleProduct(id)

  return (
    <div className='container mx-auto px-5 py-10 md:w-[80%]'>

      {/* Navigation - Style Preserved */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Shopping
        </Link>
      </div>

      {/* Main Product Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>

        {/* Left Column: Image */}
        <div className='w-full  bg-slate-50 rounded-2xl p-4 shadow-sm border border-slate-100 flex justify-center items-center'>
          <Image
            width={500}
            height={250}
            src={data.imageCover}
            className='aspect-square w-full object-contain rounded-lg hover:scale-105 transition-transform duration-500'
            alt={data.title}
          />
        </div>

        {/* Right Column: Details */}
        <div className='flex flex-col h-full justify-center'>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 mb-4 text-sm font-medium">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
              {data.category.name}
            </span>
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">
              {data.brand.name}
            </span>
          </div>

          {/* Title */}
          <h1 className='text-3xl md:text-4xl text-slate-900 font-bold mb-4 leading-tight'>
            {data.title}
          </h1>

          {/* Ratings & Stock Row */}
          <div className='flex items-center gap-6 mb-6 text-sm md:text-base'>
            <div className='flex items-center gap-1 text-slate-700 font-medium'>
              <i className='fa fa-star text-amber-300'></i>
              <span>{data.ratingsAverage} Rating</span>
            </div>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <div className='text-slate-500'>
              {data.quantity > 0 ? (
                <span className='text-emerald-600 font-medium'>{data.quantity} in stock</span>
              ) : (
                <span className='text-red-500'>Out of stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className='text-slate-600 leading-relaxed mb-8 border-b border-slate-100 pb-8'>
            {data.description}.
          </p>

          {/* Price Section */}
          <div className='flex items-end justify-between mb-8'>
            <div>
              <p className='text-sm text-slate-400 mb-1'>Total Price</p>
              <p className='text-4xl font-bold text-emerald-400'>
                {data.price}<span className='text-xl text-emerald-400/70 ml-1'>LE</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3 mt-auto'>
            <div className="flex-1">
              <BuyNowbtn id={data.id} />
            </div>
            <div className="flex-1">
              <AddBtnCart id={data.id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails