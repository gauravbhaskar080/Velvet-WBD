
import React from 'react'
import "../stylesheets/CompanyNavBar.css"
import logo from "../Components/logo.jpeg"
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../features/login/loginSlice'
import { useDispatch } from 'react-redux'

export default function CompanyNavBar({ navTitle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectTo = (s) => {
    navigate(s);
  }
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className="cm-nav">
      <div className="comp-nav-head">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="comp-nav-head-item">
          Velvet Homes
        </div>
      </div>
      <div className={navTitle === "Home" ? "comp-nav-item comp-nav-item-selected" : "comp-nav-item"} onClick={() => redirectTo("/velvethomes/seller/home")}>Home</div>
      {/* <div className={navTitle === "Track Sales" ? "comp-nav-item comp-nav-item-selected" : "comp-nav-item"} >Track Sales</div> */}
      <div className={navTitle === "Allprod" ? "comp-nav-item comp-nav-item-selected" : "comp-nav-item"} onClick={() => redirectTo("/velvethomes/seller/allproducts")}>All Products</div>
      <div className={navTitle === "Newprod" ? "comp-nav-item comp-nav-item-selected" : "comp-nav-item"} onClick={() => redirectTo("/velvethomes/seller/newproduct")}>Add Product</div>
      <img src="https://bciglobal.com/uploads/9/ecommerce-3.png" className='CompNavImg' alt="" />
      <div className="comp-nav-item comp-nav-logout" onClick={handleLogout}>Logout</div>
    </div>
  )
}
