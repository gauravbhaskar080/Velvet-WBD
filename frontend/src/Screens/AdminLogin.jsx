import React, { useState } from "react";
import "../stylesheets/AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../features/login/loginSlice";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isValidInput, setIsValidInput] = useState({
    username: false,
    password: false,
  });
  const [loginPassword, setLoginPassword] = useState(false);
  const [wrongInput,setWrongInput] = useState(false);
  const [compStateLogin, setCompStateLogin] = useState({
    username: "",
    password: "",
  });
  const [showGif,setShowGif] = useState(false);
  const handleLoginChange = (evt) => {
    setWrongInput(false);
    if (evt.target.name === "password") {
      if (evt.target.value.length <= 6) {
        setIsValidInput({ ...isValidInput, [evt.target.name]: false });
      } else {
        setIsValidInput({ ...isValidInput, [evt.target.name]: true });
      }
    }
    if (evt.target.name === "username") {
      setIsValidInput({
        ...isValidInput,
        [evt.target.name]: emailRegex.test(evt.target.value),
      });
    }
    setCompStateLogin({
      ...compStateLogin,
      [evt.target.name]: evt.target.value,
    });
  };
  // Function To handle OnSubmit event of login form 
  async function handleLoginSubmit(evt){
    evt.preventDefault();
    const val = Object.values(isValidInput).every(
      (value) => value === true
    );
    if(val){
      const response = await fetch(
        "http://localhost:5000/velvethomes/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: compStateLogin.username,
            password: compStateLogin.password
          }),
        }
      );
      const json = await response.json();
      if (!json.success) {
        setWrongInput(true);
        setIsValidInput({...isValidInput,"username": false,"password": false})
        setShowGif(false);
      }
      if (json.success) {
        localStorage.setItem('adminEmail',compStateLogin.username);
        localStorage.setItem("authTokenAdmin",json.authToken);
        localStorage.setItem('adminLogin',true);
        dispatch(loginAdmin());
        setShowGif(false);
        navigate('/velvethomes/admin/home');
      }
    }else{
      setShowGif(false);
      alert("Enter All Valid Enteries")
    }
  }
  return (
    <div className="adminLoginPage">
      <div className="LoginFormAdmin">
        <div className="ImgBack">Velvet Home's Admin Login Page</div>
        <div className="LoginFormCon">
          <div className="FormAdminHead">
            <div className="FormBtnHead">Login Form</div>
          </div>
          <form action="" onSubmit={handleLoginSubmit} className="AdminLogin">
            <div
              className="input-company-wrapper"
              style={{ marginTop: "25px" }}
            >
              <label htmlFor="username" className="input-clf-label">
                Enter Username : <span className="required-span">*</span>
              </label>
              <input
                type="text"
                id="username"
                className="login-company-input"
                name="username"
                onChange={handleLoginChange}
                value={compStateLogin.username}
                style={
                  isValidInput.username
                    ? { color: "#1A5D1A", borderBottom: "1px solid #1A5D1A" }
                    : { color: "red", borderBottom: "1px solid red" }
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "90%",
                  fontSize: "large",
                }}
              >
                {isValidInput.username ? (
                  <div style={{ color: "#1A5D1A", fontWeight: "400" }}>
                    Seems Good
                  </div>
                ) : (
                  <div style={{ color: "red" }}>Invalid Input</div>
                )}
              </div>
              <div className="input-company-wrapper">
                <label htmlFor="loginPassword" className="input-clf-label">
                  Enter Password : <span className="required-span">*</span>
                </label>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <input
                    type={loginPassword ? "text" : "password"}
                    id="loginPassword"
                    className="login-company-input cfl-pass"
                    value={compStateLogin.password}
                    onChange={handleLoginChange}
                    name="password"
                    style={
                      isValidInput.password
                        ? {
                            color: "#1A5D1A",
                            borderBottom: "1px solid #1A5D1A",
                            width: "95%",
                          }
                        : {
                            color: "red",
                            borderBottom: "1px solid red",
                            width: "95%",
                          }
                    }
                  />
                  <img
                    src={
                      loginPassword
                        ? "https://p.kindpng.com/picc/s/327-3273865_password-eye-icon-png-transparent-png.png"
                        : "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-512.png"
                    }
                    alt=""
                    style={
                      isValidInput.password
                        ? {
                            height: "27px",
                            width: "8%",
                            borderBottom: "3px solid #1A5D1A",
                            backgroundColor: "#ffffffae",
                            marginTop: "5px",
                            cursor: "pointer",
                          }
                        : {
                            height: "25px",
                            width: "8%",
                            borderBottom: "1px solid red",
                            backgroundColor: "#ffffffae",
                            marginTop: "5px",
                            cursor: "pointer",
                          }
                    }
                    onClick={() => {
                      setLoginPassword(!loginPassword);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    fontSize: "large",
                  }}
                >
                  {isValidInput.password ? (
                    <div style={{ color: "#1A5D1A", fontWeight: "400" }}>
                      Seems Good
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>Invalid Input</div>
                  )}
                </div>
              </div>
            </div>
            {wrongInput && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "70%",
                      fontSize: "large",
                    }}
                  >
                    <div style={{ color: "red" }}>Username Or Email didn't match</div>
                  </div>
                )}
              <div className="btn-clf-wrapper">
                <button type="submit" onClick={()=>setShowGif(true)} className="btn-submit-company-login">
                  Sign In
                </button>
          {showGif && <img src="https://i.gifer.com/ZZ5H.gif" className="LoaderGif" alt="" />}
              </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
