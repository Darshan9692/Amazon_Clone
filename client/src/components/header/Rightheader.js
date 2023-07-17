import React, { useContext } from 'react'
import { LoginContext } from '../context/ContextProvider';
import Avatar from '@mui/material/Avatar';
// import { Link } from 'react-router-dom';
import '../header/rightheader.css';
import { Divider } from '@mui/material';


function Rightheader({logClose}) {

    const { account, setAccount } = useContext(LoginContext);


    return (
        <>
            <div className='rightheader'>
                <div className='right_nav'>
                    {
                        account ? <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar> : <Avatar className="avtar"></Avatar>
                    }
                    {
                        account ? <h3>HELLO,{account.fname.toUpperCase()}</h3>:<h3></h3>
                    }
                </div>
                <div className='nav_btn' onClick={()=>logClose()}>
                    <a href="/">Home</a>
                    <a href="/">Shop By Category</a>
                    <Divider style={{ width: '100%', marginLeft: "-20px" }} />
                    <a href="/">Today's Deal</a>
                    {
                        account ? <a href="/buynow">Your Orders</a> : <a href="/login">Your Orders</a>
                    }
                    <Divider style={{ width: '100%', marginLeft: "-20px" }} />
                    <div className='flag'>
                        <a href="/">Settings</a>
                        <img src='' alt='' />
                        {/* <Link to="/">Sign in</Link> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rightheader
