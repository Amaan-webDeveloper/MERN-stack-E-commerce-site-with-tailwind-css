import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ServiceObj from '../../Api/backendConfig.js'

const AdminDash = () => {
  const [category, setCategory] = useState("")
  const [categoryMsg, setCategoryMsg] = useState(null)
  const [msg, setmsg] = useState(null)

  const [categoryArray, setCategoryArray] = useState([])

  useEffect(() => {
    (async()=>{
      const res = await ServiceObj.getAllCategories()
      setCategoryArray(res.data.data)
      console.log(res.data.data)
    })()
  }, [category])
  

  const handleNewCategory = async (e) => {
    e.preventDefault()
    if (!category) {
      setCategoryMsg("Please Enter Category first")
      return;
    }
    try {
      const res = await ServiceObj.createCategory(category)
      setCategory(null)
      setmsg(null)
      console.log(res)
    } catch (error) {

      setmsg(error.response.data.message)
    }
  }



  return (
    <div className='p-5 pt-16 flex flex-col justify-center items-center gap-5'>
      <p className='p-3 shadow-lg rounded-3xl'>Admin Dashbored</p>
      <div className='hover:text-slate-500 text-center bg-blue-400 min-w-44 w-2/4 p-2 rounded-lg'>
        <Link className='flex items-center justify-center gap-2' to={"/admin/createproduct"}>
          
          Create Product
        </Link>
      </div>

      <div className='hover:text-slate-500 text-center bg-blue-400 min-w-44 w-2/4 p-2 rounded-lg'>
        <Link className='flex items-center justify-center gap-2' to={"/admin/manage-products"}>
          
          Products
        </Link>
      </div>

    



      <div className='text-center bg-blue-400 min-w-44 w-2/4 p-2 rounded-lg'>
        <form className='flex gap-2 items-center flex-col justify-center' onSubmit={(e) => handleNewCategory(e)}>

          
            {msg ? (<p className='text-red-500'>{msg}</p>) : null}
            <p>Add Category</p>
            {categoryMsg?<p className='text-red-500'>{categoryMsg}</p>:null}
            <input placeholder='Create new Category' className='outline-none border border-gray-300 rounded-md px-1 py-1' type="text" value={category} onChange={(e) => { setCategory(e.target.value) }} />


          <button type='submit' className='bg-purple-600 text-sm text-white py-1 px-4 rounded-md' >create new Category</button>
        </form>
        <div className='flex items-center justify-center gap-3'>
        <p>All Categories</p>
        <select className='mt-2 border-2 border-black' placeholder="All categories" defaultValue={"all"}>
          {categoryArray.map((category)=>(
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </select>
        </div>
      </div>
    </div>
  )
}

export default AdminDash