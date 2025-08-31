import { faAward, faCalendarDays, faLocationDot, faMoneyBills, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Address = () => {
  return (
    <div className='pt-5 card2-bg px-5'>
        <p className='font-color fw-bold'>Delivery</p>
        <hr />
        
        <p><FontAwesomeIcon icon={faLocationDot} className='pe-2 ' />Kalabagan, Dhaka-1205</p>
        <p className='fw-bold'><FontAwesomeIcon icon={faTruck} className='pe-2 ' />Free Delivery 20 june - 23 june</p>
        <p className='bg-white p-2 fw-bold'>Enjoy free shipping promotion with minimum 1 items.</p>

        <p> <FontAwesomeIcon icon={faMoneyBills}className='pe-2 '  />Cash On Delivery</p>
<hr />
        <span className='font-color fw-bold'>Service</span>
        <p className='py-3'><FontAwesomeIcon icon={faCalendarDays} className='pe-2 ' />7 Days Return</p>
        <p>Change of mind applicable</p>
        <p className='pb-5  fw-bold'><FontAwesomeIcon icon={faAward}className='pe-2 '  />Warranty Not Available</p>

    </div>
  )
}

export default Address