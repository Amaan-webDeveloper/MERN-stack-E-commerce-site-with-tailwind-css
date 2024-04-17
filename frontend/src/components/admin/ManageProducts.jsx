import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ServiceObj from '../../Api/backendConfig'
import { Link } from 'react-router-dom'

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    const isAdmin = useSelector(state => state.auth.isAdmin)

    useEffect(() => {
        (async () => {
            const res = await ServiceObj.getAllProducts()
            setProducts(res.data.data)
            console.log(res.data.data)
        })()
    }, [])

  return (
    <div className='pt-16 w-full'>
        <div className='flex justify-evenly items-center'>
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
            <p>Stock</p>
            <p>Action</p>
        </div>
        {products.map((product)=>(
            
            <div key={product._id} className='items-center shadow-lg flex justify-evenly gap-4 pt-4'>
                <Link to={`/product/${product._id}`}>
                <img src={product.productImages[0]} className='h-16' alt="" />
                </Link>
                
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.stock}</p>
                <Link to={`/admin/dash/updateproduct/${product._id}`}>Edit</Link>
            </div>
        ))}
    </div>
  )
}

export default ManageProducts