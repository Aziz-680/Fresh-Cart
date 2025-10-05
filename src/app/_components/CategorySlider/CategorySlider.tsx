import React from 'react'
import getAllCategories from '../../../apis/allCategories'
import SwiperCategory from '../SwiperCategory/SwiperCategory';

const CategorySlider = async () => {

    const data = await getAllCategories()

    return (
        <div className='mb-3'>
            
            <SwiperCategory categories={data} />

        </div>
    )
}

export default CategorySlider