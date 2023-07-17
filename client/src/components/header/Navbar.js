import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import img from '../header/Amazon-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from "./Rightheader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function Navbar() {

  const [dropen, setDrOpen] = useState(false);

  const navigate = useNavigate();

  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiOpen] = useState(true);
  
  const { products } = useSelector(state => state.getproductsdata);


  const getDetailsValidUser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    // console.log(data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      setAccount(data);
    }
  }

  const handleOpen = () => {
    setDrOpen(true);
  }

  const handleDrawerClose = () => {
    setDrOpen(false);
  }

  const logOutUser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data2 = await res2.json();
    console.log(data2);
    if (res2.status !== 201) {
      console.log("error");
    } else {
      toast.success("Logout Successfully");
      navigate("/");
      setAccount(false);
    }
  }

  const getText = (items) => {
    setText(items);
    setLiOpen(false);
  }

  useEffect(() => {
    getDetailsValidUser();
  }, []);


  return (
    <header>
      <Toaster position="top-center"></Toaster>
      <nav>
        <div className='left'>
          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleDrawerClose}>
            <Rightheader logClose={handleDrawerClose} />
          </Drawer>
          <div className='navlogo'>
            <a href="/"><img src={img} alt="error" /></a>
          </div>
          <div className="nav_searchbaar">
            <input type='text' name='' id='' placeholder="Search Your Products" onChange={(e) => getText(e.target.value)} />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {
              text &&
              <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <Link to={`/getproductsone/${product.id}`} onClick={()=>setLiOpen(true)}>
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>
        <div className='right'>
          <div className="nav_btn">
            <a href="/login">Sign-In</a>
          </div>
          <div className="cart_btn">
            {
              account ? <a href="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id='icon' />
                </Badge>
              </a> : <a href="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id='icon' />
                </Badge>
              </a>
            }
            <p>Cart</p>
          </div>
          {
            account ? <Avatar className="avtar2" id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> : <Avatar className="avtar"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}></Avatar>
          }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={logOutUser}><LogoutIcon style={{ fontSize: "16px", marginRight: "3px" }} />Logout</MenuItem> : ""
            }
          </Menu>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
