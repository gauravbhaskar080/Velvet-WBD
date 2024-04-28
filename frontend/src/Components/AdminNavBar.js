
import React from 'react'
import "../stylesheets/CompanyNavBar.css"
import logo from "../Components/logo.jpeg"
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../features/login/loginSlice';

export default function AdminNavBar({ navTitle }) {
  const navigate = useNavigate();
  const redirectTo = (u) => {
    navigate(u);
  }
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  }
  return (
    <div className="cm-nav">
      <div className="comp-nav-head" >
      <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="comp-nav-head-item">
          Velvet Homes
        </div>
      </div>
      <div onClick={() => redirectTo("/velvethomes/admin/home")} className={navTitle === "home" ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected" : "comp-nav-item ad-nav-item"}>Home</div>
      <div onClick={() => redirectTo("/velvethomes/admin/allcust")} className={navTitle === "allcust" ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected" : "comp-nav-item ad-nav-item"}>All Customers</div>
      <div onClick={() => redirectTo("/velvethomes/admin/allcomp")} className={navTitle === "allcomp" ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected" : "comp-nav-item ad-nav-item"}>All Companies</div>
      <div onClick={() => redirectTo("/velvethomes/admin/admindel")} className={navTitle === "admindel" ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected" : "comp-nav-item ad-nav-item"}>Deliveries</div>
      <img src="https://thumbs.dreamstime.com/b/admin-office-binder-wooden-desk-table-colored-pencil-pencils-pen-notebook-paper-79046621.jpg" className='CompNavImg' alt="" />
      <div className="comp-nav-item comp-nav-logout ad-nav-logout" onClick={handleClick} >Logout</div>
    </div>
  )
}
