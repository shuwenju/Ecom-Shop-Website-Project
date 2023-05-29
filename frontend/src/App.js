import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
          <Routes>
            <Route path='/product/:id' element={<ProductScreen />} />
          </Routes>
          <Routes>
            {/* the ? is to make the id optional */}
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
          </Routes>
          <Routes>
            <Route path='/register' element={<RegisterScreen />} />
          </Routes>
          <Routes>
            <Route path='/profile' element={<ProfileScreen />} />
          </Routes>
          <Routes>
            <Route path='/admin/userlist' element={<UserListScreen />} />
          </Routes>
          <Routes>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          </Routes>
          <Routes>
            <Route path='/login/shipping' element={<ShippingScreen />} />
          </Routes>
          <Routes>
            <Route path='/payment' element={<PaymentScreen />} />
          </Routes>
          <Routes>
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
          </Routes>
          <Routes>
            <Route path='placeorder/order/:id' element={<OrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
