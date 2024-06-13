import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Account, AdminDash, AuthLayout, Cart, CreateProducts, DetailedProductCard, Home, Login, ManageProducts, Orders, Register, UpdateProduct, CreateCategory, LayoutContainer } from './components'
import "./App.css";
import NewOrder from './components/pages/NewOrder';


const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/login' element={<LayoutContainer>
          <Login /></LayoutContainer>} />
        <Route path='/register' element={<LayoutContainer>
          <Register /></LayoutContainer>} />

        <Route>
          <Route path='/orders' element={<LayoutContainer><Orders />
          </LayoutContainer>} />
          <Route path='/new-order' element={<LayoutContainer><NewOrder /></LayoutContainer>} />
          <Route path='/cart' element={<AuthLayout><LayoutContainer><Cart /></LayoutContainer></AuthLayout>} />

          <Route path='/admin/dash/' element={<AuthLayout><LayoutContainer><AdminDash /></LayoutContainer></AuthLayout>}>

            <Route path='manage-products' element={
              <ManageProducts />
            } />
            <Route path='createcategory' element={<LayoutContainer><CreateCategory />
            </LayoutContainer>} />
            <Route path='createproduct' element={<LayoutContainer>
              <CreateProducts /></LayoutContainer>} />
            <Route path='updateproduct/:id' element={<LayoutContainer>
              <UpdateProduct /></LayoutContainer>} />
          </Route>

          <Route path='/account' element={<AuthLayout authentication={true}><LayoutContainer><Account /></LayoutContainer></AuthLayout>} />
          <Route path='/' element={
            <LayoutContainer>
              <AuthLayout authentication={true}>
                <Home />
              </AuthLayout></LayoutContainer>} />
          <Route path='/product/:id' element={<AuthLayout authentication={true}><LayoutContainer><DetailedProductCard /></LayoutContainer></AuthLayout>} />
        </Route>


      </Routes>
    </div>
  )
}

export default App