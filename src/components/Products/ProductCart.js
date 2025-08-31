import React from 'react'
import ProductSample from './ProductSample'
import Address from './Address'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'

const ProductCart = () => {
  return (
    <div >
        
        <div className='d-flex  container '>
        <div className='w-75'>
        <ProductSample />
        </div>
      <div className='w-25'>
      <Address/>
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default ProductCart