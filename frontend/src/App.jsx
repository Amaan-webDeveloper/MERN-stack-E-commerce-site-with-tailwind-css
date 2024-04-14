import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Account, AdminDash, AuthLayout, Cart, CreateProducts, DetailedProductCard, Home, Login, ManageProducts, NavBar, Orders, Register, UpdateProduct } from './components'
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<NavBar />}>
          <Route path='/orders' element={<Orders />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin/dash' element={<AdminDash />} />
          <Route path='/admin/manage-products' element={<ManageProducts />} />

          <Route path='/account' element={<AuthLayout authentication={true}><Account /></AuthLayout>} />
          <Route path='/' element={<AuthLayout authentication={true}><Home /></AuthLayout>} />
          <Route path='/product/:id' element={<AuthLayout authentication={true}><DetailedProductCard /></AuthLayout>} />
        </Route>

        <Route>

          <Route path='/admin/createproduct' element={<CreateProducts />} />
          <Route path='/admin/updateproduct/:id' element={<UpdateProduct />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App