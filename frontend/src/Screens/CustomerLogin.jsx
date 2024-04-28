import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/companyLogin.css";
import { useDispatch } from "react-redux";
import { loginCustomer } from "../features/login/loginSlice";
const CustomerLogin = ({show}) => {
  // Variable To Redirect To any Page
  let navigate = useNavigate();

  // Regular Expressions For Checking Valid Email and Name
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

  // useState variables for making The Website Dynamic

  // val is used for setting Which Form to Display SignIn or SignUp
  const [val, setVal] = useState("Login");

  // compStateLogin is the object made for maintaining the record of Login Form input
  const [compStateLogin, setCompStateLogin] = useState({
    username: "",
    password: "",
  });

  // wrongInput is the state maintained for keeping track whether a entered credentials are true or not for Login Form
  const [wrongInput, setWrongInput] = useState(false);

  // isValidInput state is maintained for showing whether the entered data in Login Form is valid or not
  const [isValidInput, setIsValidInput] = useState({
    username: false,
    password: false,
  });

  // loginPassword State is maintained for keeping treack whether the password to be shown or not in Login form
  const [loginPassword, setLoginPassword] = useState(false);

  // compStateSignup is the object made for maintaining the record of Sign Up Form input
  const [compStateSignup, setCompStateSignup] = useState({
    email: "",
    companyname: "",
    password: "",
    confirmPassword: "",
  });

  // isValidSignupInput state is maintained for showing whether the entered data in SignUp Form is valid or not
  const [isValidSignupInput, setIsValidSignupInput] = useState({
    email: false,
    companyname: false,
    password: false,
    confirmPassword: false,
  });

  // signupPassword object state is maintained to keep track whether the confirmPassword or password to be shown or not
  const [signupPassword, setSignupPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  // emailUsed state is used when the user wants to create account with an used email
  const [emailUsed, setEmailUsed] = useState(false);

  // signupButton state is Used to Show the user to fill all boxes with correct values when signUp button is clicked
  const [signupButton, setSignupButton] = useState(false);

  const [showRedirectedMessage, setShowRedirectedMessage] = useState(show ? true : false);

  // Css Properties Which differ the buttons In Order To Show Which Form is Selected Login or SignUp
  const selectedStyle = {
    height: "60px",
    backgroundColor: "gray",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  };

  // handleLoginChange is the function used mainly for handling the changes done in the Input Form
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

  const dispatch = useDispatch();
  // Function To handle OnSubmit event of login form
  async function handleLoginSubmit(evt) {
    evt.preventDefault();
  
    try {
      const val = Object.values(isValidInput).every((value) => value === true);
  
      if (val) {
        const response = await fetch("http://localhost:5000/velvethomes/customer/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: compStateLogin.username,
            password: compStateLogin.password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const json = await response.json();
  
        if (!json.success) {
          setWrongInput(true);
          setIsValidInput({ ...isValidInput, username: false, password: false });
        }
  
        if (json.success) {
          localStorage.setItem("customerUsername", compStateLogin.username);
          dispatch(loginCustomer());
          navigate("/");
        }
      } else {
        alert("Enter All Valid Entries");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      // Add more detailed error handling here
    }
  }
  
  // Function to handle the changes done in the SignUp Form
  const handleSignUpChange = (evt) => {
    setEmailUsed(false);
    if (evt.target.name === "password") {
      setIsValidSignupInput({
        ...isValidSignupInput,
        [evt.target.name]: evt.target.value.length > 6,
        confirmPassword: evt.target.value === compStateSignup.confirmPassword,
      });
    }
    if (evt.target.name === "email") {
      setIsValidSignupInput({
        ...isValidSignupInput,
        [evt.target.name]: emailRegex.test(evt.target.value),
      });
    }
    if (evt.target.name === "companyname") {
      setIsValidSignupInput({
        ...isValidSignupInput,
        [evt.target.name]: namePattern.test(evt.target.value),
      });
    }
    if (evt.target.name === "confirmPassword") {
      setIsValidSignupInput({
        ...isValidSignupInput,
        [evt.target.name]: evt.target.value === compStateSignup.password,
      });
    }
    setCompStateSignup({
      ...compStateSignup,
      [evt.target.name]: evt.target.value,
    });
  };

  // Function To Handle onSubmit Event of SignUp Form
  const hadleSignupSubmit = async (evt) => {
    evt.preventDefault();
    const val = Object.values(isValidSignupInput).every(
      (value) => value === true
    );
    if (val) {
      setSignupButton(false);
      const response = await fetch(
        "http://localhost:5000/velvethomes/customer/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: compStateSignup.email,
            password: compStateSignup.password,
            fullname: compStateSignup.companyname,
          }),
        }
      );
      const json = await response.json();
      if (json.errors === "Email already used") {
        setEmailUsed(true);
        setIsValidSignupInput({ ...isValidSignupInput, email: false });
      } else {
        setEmailUsed(false);
      }
      if (json.success) {
        localStorage.setItem("customerUsername", compStateSignup.email);
        localStorage.setItem("customerLogin", true);
        navigate("/");
      }
    } else {
      setSignupButton(true);
    }
  };
  return (
    <div className="page-wrapper">
      {/* Main Part Of Where The Form Is Present  */}
      <div className="main">
        <div className="design">
          <div className="img-back"></div>
          <div className="overlay-company">
            <div className="text-company">
              Welcome To <br /> VelvetHome's Customer <br /> {val} Page
            </div>
          </div>
        </div>
        <div className="form">
          <div className="btns-company-login">
            <div
              className="btn-company-login"
              style={val === "Login" ? selectedStyle : { height: "50px" }}
              onClick={() => setVal("Login")}
            >
              Sign In
            </div>
            <div
              className="btn-company-login"
              style={val === "Sign Up" ? selectedStyle : { height: "50px" }}
              onClick={() => setVal("Sign Up")}
            >
              Sign Up
            </div>
          </div>
          {val === "Login" && (
            <form action="" onSubmit={handleLoginSubmit} className="clf">
              { showRedirectedMessage && <div
                className="input-company-wrapper"
                style={{ marginTop: "25px" }}
              >
                <label className="input-clf-label" style={{color: "black"}}>
                  **Please Login To Continue Your Shopping
                </label>
              </div>}
              <div
                className="input-company-wrapper"
                style={{ marginTop: "25px" }}
              >
                <label htmlFor="username" className="input-clf-label">
                  Enter Email : <span className="required-span">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  className="login-company-input"
                  value={compStateLogin.username}
                  name="username"
                  onChange={handleLoginChange}
                  style={
                    isValidInput.username
                      ? { color: "#1A5D1A", borderBottom: "3px solid #1A5D1A" }
                      : { color: "red", borderBottom: "3px solid red" }
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
                    <div style={{ color: "#1A5D1A", fontWeight: "600" }}>
                      Seems Good
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>Invalid Input</div>
                  )}
                </div>
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
                            borderBottom: "3px solid #1A5D1A",
                            width: "82%",
                          }
                        : {
                            color: "red",
                            borderBottom: "3px solid red",
                            width: "82%",
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
                            height: "27px",
                            width: "8%",
                            borderBottom: "3px solid red",
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
                    width: "90%",
                    fontSize: "large",
                  }}
                >
                  {isValidInput.password ? (
                    <div style={{ color: "#1A5D1A", fontWeight: "600" }}>
                      Seems Good
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>Invalid Input</div>
                  )}
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
                  <div style={{ color: "red" }}>
                    Username Or Email didn't match
                  </div>
                </div>
              )}
              <div className="btn-clf-wrapper">
                <button type="submit" className="btn-submit-company-login">
                  Sign In
                </button>
              </div>
            </form>
          )}
          {val === "Sign Up" && (
            <form action="" onSubmit={hadleSignupSubmit} className="clf">
              { showRedirectedMessage && <div
                className="input-company-wrapper"
                style={{ marginTop: "25px" }}
              >
                <label className="input-clf-label" style={{color: "black", marginTop:"20px"}}>
                  **Please Sign Up To Continue Your Shopping
                </label>
              </div>}
              <div
                className="input-company-wrapper"
                style={{ marginTop: "25px" }}
              >
                <label htmlFor="companyname" className="input-clf-label">
                  Enter Your Full Name : <span className="required-span">*</span>
                </label>
                <input
                  type="text"
                  id="companyname"
                  className="login-company-input"
                  value={compStateSignup.companyname}
                  name="companyname"
                  onChange={handleSignUpChange}
                  style={
                    isValidSignupInput.companyname
                      ? { color: "#1A5D1A", borderBottom: "3px solid #1A5D1A" }
                      : { color: "red", borderBottom: "3px solid red" }
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
                  {isValidSignupInput.companyname ? (
                    <div style={{ color: "#1A5D1A", fontWeight: "600" }}>
                      Seems Good
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>Invalid Input</div>
                  )}
                </div>
              </div>
              <div className="input-company-wrapper">
                <label htmlFor="email" className="input-clf-label">
                  Enter Email : <span className="required-span">*</span>
                </label>
                {emailUsed && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "90%",
                      fontSize: "large",
                    }}
                  >
                    <div style={{ color: "red" }}>Email Already Used</div>
                  </div>
                )}
                <input
                  type="text"
                  id="email"
                  className="login-company-input"
                  value={compStateSignup.email}
                  name="email"
                  onChange={handleSignUpChange}
                  style={
                    isValidSignupInput.email
                      ? { color: "#1A5D1A", borderBottom: "3px solid #1A5D1A" }
                      : { color: "red", borderBottom: "3px solid red" }
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
                  {isValidSignupInput.email ? (
                    <div style={{ color: "#1A5D1A", fontWeight: "600" }}>
                      Seems Good
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>Invalid Input</div>
                  )}
                </div>
              </div>
              <div className="input-company-wrapper">
                <label htmlFor="signuppassword" className="input-clf-label">
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
                    type={signupPassword.password ? "text" : "password"}
                    id="signuppassword"
                    className="login-company-input cfl-pass"
                    value={compStateSignup.password}
                    onChange={handleSignUpChange}
                    name="password"
                    style={
                      isValidSignupInput.password
                        ? {
                            color: "#1A5D1A",
                            borderBottom: "3px solid #1A5D1A",
                            width: "82%",
                          }
                        : {
                            color: "red",
                            borderBottom: "3px solid red",
                            width: "82%",
                          }
                    }
                  />
                  <img
                    src={
                      signupPassword.password
                        ? "https://p.kindpng.com/picc/s/327-3273865_password-eye-icon-png-transparent-png.png"
                        : "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-512.png"
                    }
                    alt=""
                    style={
                      isValidSignupInput.password
                        ? {
                            height: "27px",
                            width: "8%",
                            borderBottom: "3px solid #1A5D1A",
                            backgroundColor: "#ffffffae",
                            marginTop: "5px",
                            cursor: "pointer",
                          }
                        : {
                            height: "27px",
                            width: "8%",
                            borderBottom: "3px solid red",
                            backgroundColor: "#ffffffae",
                            marginTop: "5px",
                            cursor: "pointer",
                          }
                    }
                    onClick={() => {
                      setSignupPassword({
                        ...signupPassword,
                        password: !signupPassword.password,
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "90%",
                    fontSize: "large",
                  }}
                >
                  {isValidSignupInput.password ? (
                    <div style={{ color: "#1A5D1A", fontWeight: "600" }}>
                      Seems Good
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      Minimum 7 letters required For Password
                    </div>
                  )}
                </div>
              </div>
              <div className="input-company-wrapper">
                <label
                  htmlFor="signupconfirmpassword"
                  className="input-clf-label"
                >
                  Confirm Password : <span className="required-span">*</span>
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
                    type={signupPassword.confirmPassword ? "text" : "password"}
                    id="signupconfirmpassword"
                    className="login-company-input cfl-pass"
                    value={compStateSignup.confirmPassword}
                    onChange={handleSignUpChange}
                    name="confirmPassword"
                    style={
                      isValidSignupInput.confirmPassword
                        ? {
                            color: "#1A5D1A",
                            borderBottom: "3px solid #1A5D1A",
                            width: "82%",
                          }
                        : {
                            color: "red",
                            borderBottom: "3px solid red",
                            width: "82%",
                          }
                    }
                  />
                  <img
                    src={
                      signupPassword.confirmPassword
                        ? "https://p.kindpng.com/picc/s/327-3273865_password-eye-icon-png-transparent-png.png"
                        : "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-512.png"
                    }
                    alt=""
                    style={
                      isValidSignupInput.confirmPassword
                        ? {
                            height: "27px",
                            width: "8%",
                            borderBottom: "3px solid #1A5D1A",
                            backgroundColor: "#ffffffae",
                            marginTop: "5px",
                            cursor: "pointer",
                          }
                        : {
                            height: "27px",
                            width: "8%",
                            borderBottom: "3px solid red",
                            backgroundColor: "#ffffffae",
                            marginTop: "5px",
                            cursor: "pointer",
                          }
                    }
                    onClick={() => {
                      setSignupPassword({
                        ...signupPassword,
                        confirmPassword: !signupPassword.confirmPassword,
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "90%",
                    fontSize: "large",
                  }}
                >
                  {isValidSignupInput.confirmPassword ? (
                    <div style={{ color: "#1A5D1A", fontWeight: "600" }}>
                      Passwords Matched
                    </div>
                  ) : (
                    <div style={{ color: "red" }}>
                      Password and Confirm Password didn't match
                    </div>
                  )}
                </div>
              </div>
              {signupButton && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "10px",
                    width: "90%",
                    fontSize: "x-large",
                  }}
                >
                  <div style={{ color: "red" }}>
                    Please Fill The Correct Credentials
                  </div>
                </div>
              )}
              <div className="btn-clf-wrapper">
                <button type="submit" className="btn-submit-company-login">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
