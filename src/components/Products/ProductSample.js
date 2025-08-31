import React from 'react'
import image from '../../assets/air-bud.jpg'
import Header from '../Shared/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ProductSample = () => {
  return (
    <div>
       
           <div className=" bg-white pt-5">
              <div className="row d-flex flex-row">
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <img
                    src={image}
                    className="img-fluid pt-2 border"
                    alt="name"
                  />
                  
                </div>
                
                <div className="col-lg-9 col-md-9 col-sm-12 my-3">
                    <h2>Reliable Air Bud - Intact imported from China</h2>
                    <br/>
                    <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <br />

                 <p>Brand: <span className='font-color'>Xiaomi</span></p>
                 <hr />
                <br />
                <span className='fw-bold font-color fs-2'>$19</span>
                <br />
                <span><del className='text-secondary'>$30</del> -30%</span>
                <br />
                
                <p>Color Family: Black</p>
                <br />
                <p>Quantity:  <button className='border-0 fs-4 ms-2 bg-secondary px-3 text-white '>-</button> <span className='fs-4 mx-3'>1</span> <button className='border-0 fs-4 bg-secondary px-3 text-white'>+</button></p>
                <button className='bg-warning border-0 text-white fw-bold py-2 px-5'>Buy Now</button>
                <Link to='/login'>
                <button className='mx-3 bg-color border-0 text-white fw-bold py-2 px-5'>Add To Cart</button>
                </Link>
                </div>
                
              </div>
              
            </div>
            
    </div>
  )
}

export default ProductSample