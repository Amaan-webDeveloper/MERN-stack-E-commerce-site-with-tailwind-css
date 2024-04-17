import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Account, AdminDash, AuthLayout, Cart, CreateProducts, DetailedProductCard, Home, Login, ManageProducts, NavBar, Orders, Register, UpdateProduct,CreateCategory } from './components'
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

          <Route path='/admin/dash/' element={<AuthLayout><AdminDash /></AuthLayout>}>

            <Route path='manage-products' element={<ManageProducts />} />
            <Route path='createcategory' element={<CreateCategory />} />
            <Route path='createproduct' element={<CreateProducts />} />
            <Route path='updateproduct/:id' element={<UpdateProduct />} />
          </Route>

          <Route path='/account' element={<AuthLayout authentication={true}><Account /></AuthLayout>} />
          <Route path='/' element={<AuthLayout authentication={true}><Home /></AuthLayout>} />
          <Route path='/product/:id' element={<AuthLayout authentication={true}><DetailedProductCard /></AuthLayout>} />
        </Route>


      </Routes>
    </div>
  )
}

export default App