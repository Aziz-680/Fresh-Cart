import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "../../../components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import AddBtnCart from '../AddBtnCart/AddBtnCart'
import { Button } from '../../../components/ui/button'

const HomeCard = ({ product }) => {
    return (
        // Fixed typo: md:w1/3 -> md:w-1/3
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-3'>
            
            {/* Added h-full and flex-col to ensure cards are equal height and footer sticks to bottom */}
            <Card className='h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-slate-100 overflow-hidden group bg-white'>

                {/* Header: Image with Zoom Effect */}
                <CardHeader className="p-0 bg-slate-50 relative">
                    <div className="aspect-square w-full relative overflow-hidden flex items-center justify-center">
                        <Image 
                            width={500} 
                            height={500} 
                            src={product.imageCover} 
                            alt={product.title} 
                            className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </CardHeader>

                {/* Content: Title, Category, Rating */}
                <CardContent className="flex-grow p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <p className='text-xs font-semibold text-emerald-500 uppercase tracking-wide'>
                            {product.category.name}
                        </p>
                        <div className='flex items-center gap-1 text-sm text-slate-500'>
                            <i className='fa fa-star text-amber-400'></i>
                            <span>{product.ratingsAverage}</span>
                        </div>
                    </div>
                    
                    <h3 className='font-bold text-slate-800 line-clamp-2 leading-tight min-h-[2.5rem]'>
                        {product.title}
                    </h3>
                </CardContent>

                {/* Footer: Price & Buttons */}
                <div className='p-4 pt-0 mt-auto'>
                    <div className="flex justify-between items-end mb-4 border-t border-slate-100 pt-3">
                        <p className='text-xl font-bold text-emerald-600'>
                            {product.price}<span className='text-sm text-slate-400 font-normal ml-1'>LE</span>
                        </p>
                        <p className='text-xs text-slate-400'>
                            {product.quantity > 0 ? `${product.quantity} left` : 'Out of stock'}
                        </p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Link className='flex-1' href={`/productDetails/${product.id}`}>
                            <Button variant="outline" className='w-full border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors duration-500'>
                                Show Details
                            </Button>
                        </Link>
                        
                        {/* Cart Button kept separate to maintain logic */}
                        <div className="shrink-0">
                            <AddBtnCart id={product.id} />
                        </div>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default HomeCard