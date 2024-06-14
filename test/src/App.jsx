import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Router,Routes,Route, BrowserRouter } from 'react-router-dom'
import AllProducts from './Components/allProducts'
import ProductDetail from './Components/ProductDetail'
function App() {
 

  return (
    //write an axios call
    <>
    
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/product/:id" component={<ProductDetail/>} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
     
    </>
  )
}

export default App
