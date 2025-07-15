import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import WhatsAppButton from './components/WhatsAppButton';
import ShippingDelivery from './pages/ShippingDeliveryPage' // Add this import
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CancellationRefundPolicy from './pages/CancellationRefundPolicy';
import ScrollToTop from './components/scrollToTop';


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <WhatsAppButton />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/About' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        {/* Add the new route */}
        <Route path='/ShippingDeliveryPage' element={<ShippingDelivery />} />
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
        <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
        <Route path='/CancellationRefundPolicy' element={<CancellationRefundPolicy />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App