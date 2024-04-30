import React from "react";
import "../stylesheets/CompanyNavBar.css";
import logo from "../Components/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/login/loginSlice";
import home from "../Pictures/home1.png";
import del from "../Pictures/van.png";
import cus from "../Pictures/user1.png";
import com from "../Pictures/university.png";
import out from "../Pictures/logout.png";

export default function AdminNavBar({ navTitle }) {
  const navigate = useNavigate();
  const redirectTo = (u) => {
    navigate(u);
  };
  const dispatch = useDispatch();
  const handleClick = () => {
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
        onClick={() => redirectTo("/velvethomes/admin/home")}
        className={
          navTitle === "home"
            ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected"
            : "comp-nav-item ad-nav-item"
        }
        style={{ fontSize: "1.2rem", fontWeight: "150" }}
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
            marginLeft: "2px",
          }}
        />
        Home
      </div>
      <div
        onClick={() => redirectTo("/velvethomes/admin/allcust")}
        className={
          navTitle === "allcust"
            ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected"
            : "comp-nav-item ad-nav-item"
        }
      >
        {" "}
        <img
          src={cus}
          alt="123"
          style={{
            width: "24px",
            height: "23px",
            marginRight: "15px",
            color: "#fff",
          }}
        />
        All Customers
      </div>
      <div
        onClick={() => redirectTo("/velvethomes/admin/allcomp")}
        className={
          navTitle === "allcomp"
            ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected"
            : "comp-nav-item ad-nav-item"
        }
      >
        <img
          src={com}
          alt="123"
          style={{
            width: "23px",
            height: "23px",
            marginRight: "15px",
            color: "#fff",
          }}
        />
        All Companies
      </div>
      <div
        onClick={() => redirectTo("/velvethomes/admin/admindel")}
        className={
          navTitle === "admindel"
            ? "comp-nav-item comp-nav-item-selected ad-nav-item ad-nav-item-selected"
            : "comp-nav-item ad-nav-item"
        }
      >
        {" "}
        <img
          src={del}
          alt=""
          style={{
            width: "28px",
            height: "28px",
            marginRight: "15px",
            color: "#fff",
          }}
        />{" "}
        Deliveries
      </div>
      {/* <img src="https://thumbs.dreamstime.com/b/admin-office-binder-wooden-desk-table-colored-pencil-pencils-pen-notebook-paper-79046621.jpg" className='CompNavImg' alt="" /> */}
      <div
        className="comp-nav-item comp-nav-logout ad-nav-logout"
        onClick={handleClick}
      >
        {" "}
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
