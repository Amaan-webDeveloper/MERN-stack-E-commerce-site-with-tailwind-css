import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ServiceObj from '../../Api/backendConfig'

const NewOrder = () => {

    const orderInfo = useSelector(state => state.auth.orderItems)
    const navigate = useNavigate()

    useEffect(() => {
        if (!orderInfo) {
            navigate("/cart")
        }
    }, [])
    
    console.log(orderInfo)
    const [phNumber, setPhNumber] = useState('')
    const [address, setAddress] = useState('')
    const [pinCode, setPinCode] = useState('')
    


    const submitHandler = async (e) => {
        e.preventDefault()
        // productIdandQuantity,subTotal, phoneNo, address, pinCode, charges, discount, total
        try {
            const res = await ServiceObj.newOrder({productIdandQuantity:orderInfo.productIdandQuantity,subTotal:orderInfo.subTotal, phoneNo:phNumber, address, pinCode, charges:orderInfo.shippingCharges, discount:orderInfo.discount, total:orderInfo.total})

            if (res.data.data) {
                // navigate("/my-orders")
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Order Details</h2>
                <form className="space-y-4" onSubmit={(e) => { submitHandler(e) }}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            onChange={(e) => { setPhNumber(e.target.value) }}
                            value={phNumber}
                            type="number"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            placeholder="Your Phone Number"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            onChange={(e) => { setAddress(e.target.value) }}
                            type="text"
                            required
                            value={address}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            placeholder="Your Address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Pin Code</label>
                        <input
                            onChange={(e) => { setPinCode(e.target.value) }}
                            type="number"
                            required
                            
                            value={pinCode}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            placeholder="Your Address"
                        />
                    </div>
                    {/* <div className="flex items-center justify-between">

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>

                        {error? (<div className="text-sm">
                            <p className="font-medium text-red-600 ">{error}</p>
                        </div>):null}
                    </div> */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Order
                    </button>
                </form>

            </div>
        </div>
    )
}

export default NewOrder