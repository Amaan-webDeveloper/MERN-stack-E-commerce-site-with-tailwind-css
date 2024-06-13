import React, { useEffect, useState } from 'react'
import ServiceObj from '../../Api/backendConfig'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import NewOrder from './NewOrder'
import { orderItems } from '../../features/authSlice'

const Cart = () => {
  const [products, setProducts] = useState([])
  const userData = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [orderInfo, setOrderInfo] = useState({
    productIdandQuantity: [],
    subTotal: 0,
    tax: 0,
    shippingCharges: 0,
    total: 0,
    discount: 0
  })

  // useEffect(() => {
  //   products.filter((p)=>{

  //   })
  // }, [])



  useEffect(() => {
    const updateOrderInfo = () => {
      let subTotal = 0
      let productIdandQuantity = []



      products?.map((p) => {
        console.log(p)
        if (p.productId.stock <= 0) return;
        subTotal += p.productId.price
        productIdandQuantity.push({ _id: p.productId._id, quantity: p.quantity })
      })
      let shippingCharges = subTotal / 200
      let tax = subTotal / 10
      let total = subTotal + tax + shippingCharges

      setOrderInfo({
        productIdandQuantity: productIdandQuantity,
        subTotal: subTotal,
        tax: tax,
        shippingCharges: shippingCharges,
        total: total,
        discount: 0 // Assuming discount is not calculated here
      });
      dispatch(orderItems(orderInfo))
    };
    updateOrderInfo()
  }, [products])


  

  const populateCartItems = async () => {
    if (userData) {
      try {
        const res = await ServiceObj.populateUserCart()
        console.log(res)
        if (res) {
          // res.data.data.map((product) => {
          //   if (product.stock <= 0) {
          //     // console.log('hello product', product.stock)
          //     product.quantity = 0
          //     // 
          //     return;
          //   }
          //   product.quantity = 1
          // })

          setProducts(res.data.data.cart)

          // const productsData = res.data.data.map((product) => ({
          //   ...product,
          //   quantity: 1
          // }));
          // setProducts(productsData);

          // console.log(products)
        }

      } catch (error) {
        console.log(error)
      }
    }

  }

  const updateItemQuantity = async (product,quantity) =>{
    try {
      const res = await ServiceObj.updateUserCart({id:product.productId._id,quantity})
      if (res) {
        populateCartItems()
        // console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    populateCartItems()
  }, [userData, navigate])


 




  // const handleincrement = (product) => {
  //   // const updatedProducts = products.map((p) =>
  //   //   p._id === product._id && p.quantity < p.stock ? { ...p, quantity: p.quantity + 1 } : p
  //   // );
  //   // setProducts(updatedProducts);
  //   let ind;
  //   products.forEach((p, index) => {
  //     if (p._id === product._id) {
  //       ind = index
  //       // console.log(ind)
  //     }
  //     //   if (p.stock == 0) return;
  //     //   if (p.stock == p.quantity) return;
  //     //   p.quantity += 1
  //   })
  //   const tempArray = products;
  //   if (tempArray[ind].stock <= 0) return;
  //   if (tempArray[ind].stock === tempArray[ind].quantity) return;
  //   tempArray[ind].quantity += 1
  //   // console.log(tempArray,'sdkin')
  //   setProducts([...tempArray])
  //   // console.log(product)
  // }
  // const handledecrement = (product) => {
  //   //   const updatedProducts = products.map((p) =>
  //   //   p._id === product._id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
  //   // );
  //   // setProducts(updatedProducts);
  //   let ind;
  //   products.forEach((p, index) => {
  //     if (p._id === product._id) {
  //       ind = index
  //       // console.log(ind)
  //     }
  //     //   if (p.stock == 0) return;
  //     //   if (p.stock == p.quantity) return;
  //     //   p.quantity += 1
  //   })
  //   const tempArray = products;
  //   if (tempArray[ind].stock <= 0) return;
  //   if (tempArray[ind].quantity === 0) return tempArray[ind].quantity = 1;

  //   if (tempArray[ind].stock === tempArray[ind].quantity) return;
  //   tempArray[ind].quantity -= 1
  //   if (tempArray[ind].quantity === 0) return;
  //   // { tempArray[ind].quantity = 1 }
  //   // console.log(tempArray,'sdkin')
  //   setProducts([...tempArray])
  //   // console.log(product)
  // }

  const handleRemove = async (product) => {
    console.log(product)
    const tempArray = products.filter((p) => p._id !== product._id);
    setProducts(tempArray)
    const res = await ServiceObj.removeFromCart(product._id)
    if (res) {
      console.log(res)
    }
  }


  return (
    <div className='w-full flex flex-col gap-4'>
      {products?.map((product) => (

        <div key={product.productId._id} className='items-center flex justify-evenly gap-4 bg-slate-400'>

          <div className='flex gap-4'>
            <Link to={`/product/${product._id}`}>
              <img src={product.productId.productImages[0]} className='w-32' alt="" />
            </Link>

            <div>
              <p>{product.productId.name}</p>
              <p>{product.productId.price}</p>
            </div>
          </div>

          <div className=''>
            <div>Quantity</div>
            {product.productId.stock > 0 ?
              <div className='flex gap-1'>

                <button type='button' onClick={() => { updateItemQuantity(product,-1) }} className='px-2 text-center border-2 text-lg border-black'>-</button>
                <div className='text-center px-2 border-2 border-black'>{product.quantity}</div>
                <button type='button' onClick={() => { updateItemQuantity(product,+1) }} className='text-center px-2 border-2 text-lg border-black'>+</button>
              </div> : <p>Out of stock</p>}
          </div>

          <button type='button' onClick={() => { handleRemove(product) }}>remove</button>
          {/* <Link to={`/admin/dash/updateproduct/${product.productId._id}`}>Edit</Link>  */}
        </div>
      ))}

      {products.length < 0 && (<p>no product</p>)}
      <p>lol</p>

      <div className='w-full mt-4 p-4 bg-blue-500 flex flex-col gap-4'>
        <div className='flex gap-4'>
          <p>Subtotal - </p>
          <p>{orderInfo.subTotal}</p>
        </div>
        <div className='flex gap-4'>
          <p>Shipping Charges - </p>
          <p>{orderInfo.shippingCharges}</p>
        </div>
        <div className='flex gap-4'>
          <p>Tax 10% - </p>
          <p>{orderInfo.tax}</p>
        </div>
        <div className='flex gap-4'>
          <p>Discount - </p>
          <p>{orderInfo.discount}</p>
        </div>
        <div className='flex gap-4'>
          <p>total - </p>
          <p>{orderInfo.total}</p>
        </div>

        <div>

        </div>

        <div>
          <button onClick={() => {

            navigate(`/new-order`)
          }}>Place Order</button>
        </div>
      </div>

    </div>
  )
}

export default Cart
{/* ?subtotal=${subtotal}&total=${total}&shippingCharges=${shippingCharges}&discount=${discount}&tax=${tax}&products=${products} */ }