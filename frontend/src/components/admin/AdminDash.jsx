import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ServiceObj from '../../Api/backendConfig.js'

const AdminDash = () => {









  return (
    <div className='flex w-full'>
      <div className='pt-16 flex flex-col h-screen'>
        <p className='mx-auto mb-4 text-center w-60'>Admin Dashbored</p>

        <div className='px-4'>
          <NavLink className='' to={"/admin/dash/manage-products"}>
            <div className='p-2 rounded-lg hover:bg-slate-600'>

              manage Product
            </div>
          </NavLink>
          <NavLink className='' to={"/admin/dash/createproduct"}>
            <div className='p-2 rounded-lg hover:bg-slate-600'>

              Create Product
            </div>
          </NavLink>

          <NavLink className='' to={"/admin/dash/manage-products"}>
            <div className='p-2 rounded-lg hover:bg-slate-600'>

              Products
            </div>
          </NavLink>

          <NavLink className='' to={"/admin/dash/createcategory"}>
            <div className='p-2 rounded-lg hover:bg-slate-600'>

              Create Category
            </div>
          </NavLink>
        </div>
      </div>
      <div className='w-full'>
      <Outlet />
      </div>
    </div>
  )
}

export default AdminDash