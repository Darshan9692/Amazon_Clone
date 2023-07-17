import React from 'react'
import img from '../header/Amazon-logo.png'
import '../footer/footer.css'

function Footer() {

  const year = new Date().getFullYear();
  // console.log(year);

  return (
    <footer>
      <div className='footer_container'>
        <div className='footer_details_one'>
          <h3>Get to Know Us</h3>
          <p>About us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Cares</p>
        </div>
        <div className='footer_details_one forres'>
          <h3>Contact with us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className='footer_details_one forres'>
          <h3>Make Money with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className='lastdetails'>
        <img src={img} alt='Error' />
        <p>Conditions of Use & Sale&nbsp;&nbsp;&nbsp;Privacy Notice&nbsp;&nbsp;&nbsp;Interest-Based Ads&nbsp;&nbsp;&nbsp;©2000-{year},Amazon.com,lnc.or its affliates</p>
      </div>
    </footer>
  )
}

export default Footer
