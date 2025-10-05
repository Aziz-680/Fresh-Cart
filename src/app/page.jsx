import React from 'react'
import getAllProducts from '../apis/allProducts'
import HomeCard from './_components/HomeCard/HomeCard';
import MainSlider from './_components/MainSlider/MainSlider';
import CategorySlider from './_components/CategorySlider/CategorySlider';



export default async function Home() {

  const data = await getAllProducts()

  return (
    <section className='px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto'>

      <MainSlider />
      
      <CategorySlider />


      <div className='flex flex-wrap'>
        {data.map((product, idx) => <HomeCard key={idx} product={product} />)}
      </div>

    </section>
  )
}
