import Link from 'next/link';
import BrandList from '../_components/BrandList/BrandList';

const BrandsPage = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white shadow-md transition-colors duration-300 hover:bg-emerald-700"
      >
        <span aria-hidden="true">←</span>
        Back to Shopping
      </Link>
      <BrandList />
    </main>
  )
}

export default BrandsPage