import React from 'react'
import CategoryList from '../_components/CategoryList/CategoryList'
import Link from 'next/link'

const page = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900 text-indigo-300 rounded-lg hover:text-emerald-300 transition-colors duration-300 shadow-md"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Shopping
      </Link>

      <CategoryList />
    </div>
  )
}

export default page