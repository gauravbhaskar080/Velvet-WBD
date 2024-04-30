import React from "react";
import "../stylesheets/CompanyNavBar.css";
import logo from "../Components/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/login/loginSlice";
import { useDispatch } from "react-redux";
import home from "../Pictures/home1.png";
import del from "../Pictures/ecommerce.png";
import cus from "../Pictures/user1.png";
import com from "../Pictures/order.png";
import out from "../Pictures/logout.png";

export default function CompanyNavBar({ navTitle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectTo = (s) => {
    navigate(s);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      className="cm-nav"
      style={{
        backgroundImage:
          " linear-gradient(rgba(3, 3, 4, 0.7), rgba(3, 3, 4, 0.7)), url('https://demos.creative-tim.com/material-dashboard-pro-material-ui-v4/static/media/sidebar-2.42e96f8d.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="comp-nav-head"
        style={{ borderBottom: "1px solid gray", width: "80%" }}
      >
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="comp-nav-head-item">Velvet Homes</div>
      </div>
      <div
        className={
          navTitle === "Home"
            ? "comp-nav-item comp-nav-item-selected"
            : "comp-nav-item"
        }
        onClick={() => redirectTo("/velvethomes/seller/home")}
        style={{ fontSize: "1.2rem", fontWeight: "unset" }}
      >
        {" "}
        <img
          src={home}
          alt="123"
          style={{
            width: "21px",
            height: "21px",
            marginRight: "15px",
            color: "#fff",
          }}
        />
        Home
      </div>
      {/* <div className={navTitle === "Track Sales" ? "comp-nav-item comp-nav-item-selected" : "comp-nav-item"} >Track Sales</div> */}
      <div
        className={
          navTitle === "Allprod"
            ? "comp-nav-item comp-nav-item-selected"
            : "comp-nav-item"
        }
        onClick={() => redirectTo("/velvethomes/seller/allproducts")}
      >
        <img
          src={com}
          alt="123"
          style={{
            width: "28px",
            height: "26px",
            marginRight: "15px",
            color: "#fff",
          }}
        />
        All Products
      </div>
      <div
        className={
          navTitle === "Newprod"
            ? "comp-nav-item comp-nav-item-selected"
            : "comp-nav-item"
        }
        onClick={() => redirectTo("/velvethomes/seller/newproduct")}
      >
        {" "}
        <img
          src={del}
          alt=""
          style={{
            width: "26px",
            height: "25px",
            marginRight: "15px",
            color: "#fff",
          }}
        />
        Add Product
      </div>
      {/* <img src="https://bciglobal.com/uploads/9/ecommerce-3.png" className='CompNavImg' alt="" /> */}
      <div className="comp-nav-item comp-nav-logout" onClick={handleLogout}>
        <img
          src={out}
          alt=""
          style={{ width: "28px", height: "28px", marginRight: "15px" }}
        />
        Logout
      </div>
    </div>
  );
}
