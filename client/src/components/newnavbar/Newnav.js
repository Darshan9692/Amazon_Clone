import React from 'react'
import './Newnav.css'
import newnavimg from '../newnavbar/Newnav.jpg';

function Newnav() {
  return (
    <div className='new_nav'>
       <div className='nav_data'>
          <div className='left_data'>
            <p>All</p>
            <p>Mobile</p>
            <p>Bestseller</p>
            <p>Fashion</p>
            <p>Customer Services</p>
            <p>Electronics</p>
            <p>Prime</p>
            <p>Today's deal</p>
            <p>Amazon pay</p>
          </div>
          <div className='right_data'>
            <img src={newnavimg} alt='Error'/>
          </div>
       </div>
    </div>
  )
}

export default Newnav;
