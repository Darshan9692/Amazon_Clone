import React, { useEffect, useState, useContext } from 'react'
import '../cart/cart.css'
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';


function Cart() {


    const { id } = useParams("");
    // console.log(id);

    const { account, setAccount } = useContext(LoginContext);

    const navigate = useNavigate("");

    const [inddata, setInddata] = useState("");
    console.log(inddata);

    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        // console.log(data);
        if (res.status !== 201) {
            console.log("No data available");
        } else {
            console.log("Data");
            setInddata(data)
        }
    }

    useEffect(() => {
        setTimeout( getinddata,1000);
    }, [id]);

    //add cart
    async function addToCart(id) {
        const checkres = await fetch(`/adddata/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inddata
            }),
            credentials: "include"
        });
        const data1 = await checkres.json();
        // console.log(data1 + "frontend data");

        if (checkres.status === 401 || !data1) {
            toast.error("Invalid User");
        } else {
            // toast.success("Data Added In Your Cart");
            navigate("/buynow");
            setAccount(data1);
        }
    }


    return (
        <div className='cart_section'>
            <Toaster position='top-center'></Toaster>
            {inddata && Object.keys(inddata).length &&
                <div className='cart_container'>
                    <div className='left_cart'>
                        <img src={inddata.url} alt="Error" />
                        <div className='cart_btn'>
                            <button className='cart_btn1' onClick={() => addToCart(inddata.id)}>Add to Cart</button>
                            <button className='cart_btn2'>Buy Now</button>
                        </div>
                    </div>
                    <div className='right_cart'>
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className='mrp'>M.R.P. : ₹{inddata.price.mrp}.00</p>
                        <p>Deal Of The Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}>₹{inddata.price.mrp - inddata.price.cost}({inddata.price.discount})</span></p>

                        <div className='discount_box'>
                            <h5>Discount : <span style={{ color: "#111" }}>{inddata.discount}</span></h5>
                            <h4>Free Delievery: <span style={{ color: "#111", fontWeight: 600 }}>Oct 8-23</span> Details</h4>
                            <p>Fastest Delievery : <span style={{ color: "#111", fontWeight: 600 }}>Tommorow 11AM</span></p>
                            <p className='description'>About the team : <span style={{ color: "#565659", fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                        </div>
                    </div>
                </div>
            }
            {
                !inddata ? <div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div> : " "
            }
        </div>

    );
}

export default Cart;
