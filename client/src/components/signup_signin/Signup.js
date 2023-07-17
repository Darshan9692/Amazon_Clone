import React from 'react'
import img from '../header/Amazon-logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

function Signup() {

  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  });

  console.log(udata);

  function adddata(e) {
    const { name, value } = e.target;
    setUdata(() => {
      return {
        ...udata,
        [name]: value
      }
    })
  }

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;
    if (fname === "") {
      toast.error("Fname Provide");
    } else if (email === "") {
      toast.error("Email Provide");
    } else if (mobile === "") {
      toast.error("Mobile Provide");
    } else if (password === "") {
      toast.error("Password Provide");
    } else if (cpassword === "") {
      toast.error("Confirm Password Provide");
    } else {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname, email, mobile, password, cpassword
        })
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 422 || !data) {
        toast.error("No data Found");
      } else {
        toast.success("Data successfully added");
        setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });
      }
    }
  }

  return (
    <section>
      <Toaster position='top-center'></Toaster>
      <div className='sign_container'>
        <div className='sign_header'>
          <img src={img} alt="Error" />
        </div>
        <div className='sign_form'>
          <form method='post'>
            <h1>Create Account</h1>
            <div className='form_data'>
              <label htmlFor='fname'>Your name</label>
              <input type='text' onChange={adddata} id="fname" name="fname" value={udata.fname} />
            </div>
            <div className='form_data'>
              <label htmlFor='email'>Email</label>
              <input type='text' onChange={adddata} id="email" name="email" value={udata.email} />
            </div>
            <div className='form_data'>
              <label htmlFor='mobile'>Mobile</label>
              <input type='text' onChange={adddata} id="mobile" name="mobile" value={udata.mobile} />
            </div>
            <div className='form_data'>
              <label htmlFor='password'>Password</label>
              <input type='password' onChange={adddata} id="password" name="password" placeholder='At least 6 characters' value={udata.password} />
            </div>
            <div className='form_data'>
              <label htmlFor='cpassword'>Confirm Password</label>
              <input type='password' onChange={adddata} id="cpassword" name="cpassword" value={udata.cpassword} />
            </div>
            <button className='signin_btn' onClick={sendData}>Continue</button>
            <div className='signin_info'>
              <p>Already Have An Account?</p>
              <Link to="/login">Sign-in</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Signup
