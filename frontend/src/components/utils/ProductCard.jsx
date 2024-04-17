import React from 'react'
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

  return (
    <div className='w-56 rounded-lg relative shadow-lg hover:shadow-2xl my-5 overflow-hidden h-52'>
      <Link to={`/product/${product._id}`}>
        <img src={product.productImages[0]} className='w-full' alt={product.name} />
        <div>
          <p className='ml-2'>{product.name}</p>
          <p className='ml-2'>Rs. {product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard