import React from 'react'
import img1 from '../../assets/air-bud.jpg'
import img2 from '../../assets/camera.jpg'
import img3 from '../../assets/headphone.jpg'
import img4 from '../../assets/laptop.jpg'
import img5 from '../../assets/mobile.jpg'
import img6 from '../../assets/perfume.jpg'
import img7 from '../../assets/smart-watch.jpg'
import img8 from '../../assets/table-watch.jpg'
import img9 from '../../assets/laptop.jpg'
import img10 from '../../assets/air-bud.jpg'
import img11 from '../../assets/camera.jpg'
import img12 from '../../assets/headphone.jpg'
import img13 from '../../assets/laptop.jpg'
import img14 from '../../assets/mobile.jpg'
import img15 from '../../assets/table-watch.jpg'
import img16 from '../../assets/smart-watch.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
         <div>
      <div className="container mb-5">
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5  g-4">
          <div className="col">
            <div className="card h-100 bg-card bg-hover">
              <div className="card-body text-center">
                <img className='w-100' src={img1} alt='switch-img' />
               
                <span className='fw-bold '>AirBird White Color</span> <br />
                <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/>
                <Link to='/product-sample'>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img2} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon className='text-warning ' icon={faStarHalfStroke} />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img3} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon className='text-warning ' icon={faStarHalfStroke} />
                <FontAwesomeIcon className='text-warning ' icon={faStarHalfStroke} />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img4} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img5} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img6} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img7} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img8} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img9} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img10} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img11} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img12} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img13} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img14} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img15} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-card">
              <div className="card-body text-center">
              <img className='w-100' src={img16} alt='switch-img' />
              <span className='fw-bold '>AirBird White Color</span> <br />
              <span>
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                <FontAwesomeIcon icon={faStar} className='text-warning ' />
                </span>
                <br />
                <span className='fw-bold font-color'>$19</span>
                <br/><Link>
                <button className='bg-color text-white border-0 px-2 py-1'>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>

         
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Products