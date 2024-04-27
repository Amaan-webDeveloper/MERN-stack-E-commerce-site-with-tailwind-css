import React, { useEffect, useState } from 'react'
import ServiceObj from '../../Api/backendConfig'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await ServiceObj.getUserOrders()
      if (res) {
        setOrders(res.data.data)
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div >hello</div>
      
  )
}

export default Orders