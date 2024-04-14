import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ServiceObj from '../../Api/backendConfig'
import ImageSlider from "./ImageSlider"

const DetailedProductCard = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])


  const [quantity, setQuantity] = useState(1)

  
  useEffect(() => {
    (async () => {
      const res = await ServiceObj.getProduct(id)
      setProduct(res.data.data)
    })()
  }, [id])

  

  return (
    <div className='pt-16 h-screen w-screen lg:flex'>
      <div className='lg:w-1/2 my-auto w-screen'>
        <ImageSlider imagesArray={product.productImages} />
      </div>

      <div className='lg:w-1/2 w-full mx-4 my-10'>
        <p className='text-xl'>{product.name}</p>

        <div>
          <div className='flex gap-4 text-lg text-red-700'>
            <p>Price RS.{product.price}</p>
            <p>Discount</p>
          </div>
          <p>Inclusive of all Taxes</p>
          <div className='mt-2 mx-auto' style={{ borderBottom: "1px solid gray" }}></div>
        </div>

        <div className='w-full mt-4 text-wrap text-base'>
          <p>{product.description}</p>
        </div>

        <div className='mt-6'>
          <div>Quantity</div>
          <div className='flex gap-1'>

            <button type='button' onClick={()=>{setQuantity(quantity - 1)}} className='px-2 text-center border-2 text-lg border-black'>-</button>
            <div className='text-center px-2 border-2 border-black'>{quantity}</div>
            <button type='button' onClick={()=>{setQuantity(quantity + 1)}} className='text-center px-2 border-2 text-lg border-black'>+</button>
          </div>
        </div>

        <div className='mt-6 flex-cal flex gap-2 my-16'>
          <button className='hover:bg-black hover:text-white border-2 px-2 py-2 text-lg rounded-lg border-black'>ADD TO CART</button>

          <button className='border-2 text-white bg-black px-2 py-2 text-lg border-black rounded-lg'>BUY IT NOW</button>
        </div>



      </div>
    </div>
  )
}

export default DetailedProductCard