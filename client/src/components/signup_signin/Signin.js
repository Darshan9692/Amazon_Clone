import React from 'react'
import img from '../header/Amazon-logo.png';
import '../signup_signin/signup.css'
import { Link } from 'react-router-dom';
import { useState,useContext } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from '../context/ContextProvider';


function Signin() {

  const [logdata, setData] = useState({
    email: "",
    password: ""
  });
  console.log(logdata);

  const { account, setAccount } = useContext(LoginContext);


  function adddata(e) {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value
      }
    })
  }

  async function sendData(e) {
    e.preventDefault();
    const { email, password } = logdata;
    if (!email) {
      toast.error("Email required");
    } else if (!password) {
      toast.error("Password required");
    } else {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })
      const data = await res.json();
      // console.log(data);
      if (res.status === 400 || !data) {
        toast.error("Invalid Details");
      } else {
        setAccount(data);
        toast.success("Login Successfully");
        setData({ ...logdata, email: "", password: "" });
      }
    }
  }



  return (
    <>
      <section>
        <Toaster position='top-center'></Toaster>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src={img} alt="Error" />
          </div>
          <div className='sign_form'>
            <form>
              <h1>Sign-In</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email</label>
                <input type='text' onChange={adddata} id="email" name="email" value={logdata.email} />
              </div>
              <div className='form_data'>
                <label htmlFor='password'>Password</label>
                <input type='password' onChange={adddata} id="password" name="password" placeholder='At least 6 characters' value={logdata.password} />
              </div>
              <button className='signin_btn' onClick={sendData}>Continue</button>
            </form>
          </div>
          <div className='create_accountinfo'>
            <p>New To Amazon?</p>
            <button><Link to="/register">Create Your Amazon Account</Link></button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signin
