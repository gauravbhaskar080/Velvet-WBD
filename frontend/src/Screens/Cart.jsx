import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/Cart.css";
import CustomerNavBar from "../Components/CustomerNavBar";
import { BASE_URL } from "../api";

export default function Cart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(1);
  const [qty, setQty] = useState([]);
  const [ttlQty, setTttlQty] = useState(0);
  const [message, setMessage] = useState("This is a test message");
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");

  const applyCode = async () => {
    if (code.length == 0) {
      setShow(true);
      setMessage("Please Enter Code To Be Applied");
    } else {
      const response = await fetch(
        `${BASE_URL}/velvethomes/customer/validcode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            username: localStorage.getItem("customerUsername"),
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setShow(true);
        setMessage(json.message);
        setDiscount(parseInt(json.discountpercent));
      } else {
        setShow(true);
        setMessage(json.message);
      }
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      `${BASE_URL}/velvethomes/customer/cartdetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("customerUsername"),
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      json.ca.product.reverse();
      setProducts(json.ca.product);
      let s = 0;
      const arr = [];
      for (let i = 0; i < json.ca.product.length; i++) {
        s += json.ca.product[i].price;
        arr.push(1);
      }
      setQty(arr);
      setTttlQty(json.ca.product.length);
      setTotal(s);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (evt, ind) => {
    let q = parseInt(evt.target.value);
    const arr = qty;
    if (q < 1) {
      setTttlQty(ttlQty - arr[ind] + 1);
      setTotal(total - arr[ind] * products[ind].price + products[ind].price);
      arr[ind] = 1;
      setQty(arr);
    } else {
      // console.log(q,arr)
      setTttlQty(ttlQty - arr[ind] + q);
      setTotal(
        total - arr[ind] * products[ind].price + q * products[ind].price
      );
      arr[ind] = q;
      setQty(arr);
    }
  };
  const removeFromCart = async (e) => {
    const response = await fetch(
      `${BASE_URL}/velvethomes/customer/deleteElementFromCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("customerUsername"),
          idToRemove: e,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      fetchData();
    }
  };

  const Payment = async function () {
    try {
      const response = await fetch(
        `${BASE_URL}/stripe/cart-create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems: products }), // Send the products in the cart to the backend
        }
      );
      const { url } = await response.json();
      window.location.href = url; // Redirect to the Stripe checkout page
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., display an error message)
    }
  };

  const PlaceOrder = async()=>{
    try {
       const response = await fetch(`${BASE_URL}/velvethomes/customer/placeorderfromcart`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          qty:qty,
          discount:discount,
          username: localStorage.getItem("customerUsername"),
        }),
       })
       if(response.status === 201){
            navigate('/velvehomes/pinfo');
       }
    } catch (error) {
       console.log(error)
    }
  }

  const handlePlace = async()=>{
      await Payment();
      await  PlaceOrder();
  }


  return (
    <>
      <CustomerNavBar />
      <div className="CartWrapper">
        <div className="CartMain">
          <div className="CartHead">My Cart</div>
          <div className="CartItem">
            {products.map((e, ind) => {
              return (
                <div className="CartCard" key={e._id}>
                  <div className="CartImgWrapper">
                    <img src={e.images[0]} className="CartImg" alt="" />
                  </div>
                  <div className="CartCardMain">
                    <div
                      className="CartCardMainTitle"
                      onClick={() =>
                        navigate(`/velvethomes/showproduct/${e._id}`)
                      }
                    >
                      {e.title}
                    </div>
                    <div className="CartCardMainBody">
                      <div className="CartCardMainBodyHead">Price : </div>
                      <div className="CartCardMainBodyValue">
                        Rs. {e.price}/-
                      </div>
                    </div>

                    <div className="CartCardMainBody">
                      <div className="CartCardMainBodyHead">Quantity : </div>
                      <input
                        type="number"
                        value={qty[ind]}
                        onChange={(evt) => handleChange(evt, ind)}
                        className="CartCardMainBodyInput"
                      />
                    </div>
                    <div className="CartCardMainBody">
                      <div
                        className="CartCardMainBodyBtn"
                        onClick={() => removeFromCart(e._id)}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="CartBill">
          <div className="CartBillTitle">Bill</div>
          <div className="CartBillWrap">
            <div className="CartBillDetails">
              <div className="CartBillDetailsTitle">No. of Products : </div>
              <div className="CartBillDetailsValue">{ttlQty}</div>
            </div>
            <div className="CartBillDetails">
              <div className="CartBillDetailsTitle">Total Cost : </div>
              <div className="CartBillDetailsValue">Rs. {total}</div>
            </div>
            <div className="CartBillDetails">
              <div className="CartBillDetailsTitle">Discount : </div>
              <div className="CartBillDetailsValue">{discount}%</div>
            </div>
            <div className="CartBillDetails">
              <div className="CartBillDetailsTitle">Final Price : </div>
              <div className="CartBillDetailsValue">
                Rs. {Math.floor((total * (100 - discount)) / 100)} /-
              </div>
            </div>
          </div>
          <div className="CartBillDetail">
            <input
              type="text"
              className="CartBillDetailsInput"
              value={code}
              onChange={(evt) => {
                setCode(evt.target.value);
                setShow(false);
                setDiscount(1);
              }}
              placeholder="enter discount code"
            />
            <div className="CartBillDetailsBtn" onClick={applyCode}>
              Apply
            </div>
          </div>
          {show && <div className="coupon-code-message">**{message}</div>}
          <div className="CartBillBtnWrapper">
            <div className="CartBillBtn" onClick={handlePlace}>Place Order</div>
          </div>
        </div>
      </div>
    </>
  );
}
