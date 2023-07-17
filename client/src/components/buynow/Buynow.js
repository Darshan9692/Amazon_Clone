import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../buynow/buynow.css'
import Option from './Option'
import Subtotal from './Subtotal'
import Right from './Right'


function Buynow() {

    const [cartData, setCartData] = useState("");
    console.log(cartData);

    const getDataBuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        if (res.status !== 201) {
            console.log("Invalid");
        } else {
            setCartData(data.carts);
        }
    }

    useEffect(() => {
        getDataBuy();
    }, [])

    return (
        cartData.length ? <div className='buynow_section'>
            <div className='buynow_container'>
                <div className='left_buy'>
                    <h1>Shopping Cart</h1>
                    <p>Select All Item</p>
                    <span className='leftbuyprice'>Price</span>
                    <Divider />
                    {
                        cartData.map((e, k) => {
                            return (

                                <>
                                    <div className='item_container'>
                                        <img src={e.url} alt="error" />
                                        <div className='item_details'>
                                            <h3>{e.title.longTitle}</h3>
                                            <h3>{e.title.shortTitle}</h3>
                                            <h3 className='diffrentprice'>₹4049.00</h3>
                                            <p className='unusual'>Usually dispatched in 8 days.</p>
                                            <p>Eligible for FREE Shipping</p>
                                            <img src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png' alt="eef" />
                                            <Option deletedata={e.id} get={getDataBuy}/>
                                        </div>
                                        <h3 className='item_price'>₹{e.price.cost}</h3>
                                    </div>
                                    <Divider />
                                </>
                            )
                        })
                    }
                    <Subtotal item={cartData} />
                </div>
                <Right item={cartData}/>
            </div>
        </div> : ""

        // </div >
    )
}

export default Buynow
