
import React, { useEffect, useState } from "react";
import "../stylesheets/PinfoCustomer.css";
import CustomerNavBar from "../Components/CustomerNavBar";
import { json } from "react-router-dom";
import { BASE_URL } from "../api.js"


export default function PinfoCustomer() {

  const [cust, setCust] = useState({
    fullname: "",
    address: "",
    photo: "",
    phone: "",
    pincode: "",
  });
  const [bought, setBought] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [show, setShow] = useState();
  const [del, setDel] = useState({ date: "", month: "", year: "" });
  const [returnDate, setReturnDate] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [newFullName, setNewFullName] = useState(null);
  const [newPhone, setNewPhone] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newPincode, setNewPincode] = useState(null);



  const editinfo = () => { setEdit(!edit) };

  const handleUpdate = async () => {
    if (newFullName || newPhone || newAddress || newPincode) {
      const newCut = {
        fullname: newFullName,
        phone: newPhone,
        address: newAddress,
        pincode: newPincode
      }
      console.log(newCut)
      try {
        const res = await fetch(`${BASE_URL}/velvethomes/customer/update/${localStorage.getItem("customerUsername")}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCut)
        });
        if (res.status === 201) {
          fetchData();
          editinfo();
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const uploadImage = async (e) => {
    e.preventDefault();
    if (image) {
      const data = new FormData();
      data.append("file", image);
      const username = localStorage.getItem("customerUsername");
      try {
        const res = await fetch(`${BASE_URL}/velvethomes/customer/customerProfile/upload/${username}`, {
          method: "POST",
          body: data
        })
        if (res.ok) {
          fetchData();
        } else {
          console.log('problem  with file uploading');
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  const fetchData = async () => {
    const response = await fetch(
      `${BASE_URL}/velvethomes/customer/pinfo`,
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
      setCust({
        fullname: json.customer.fullname,
        photo: json.customer.photo,
        phone: json.customer.phone,
        address: json.customer.address,
        pincode: json.customer.pincode,
      });
      setBought(json.bought.filter((b) => b.status === "Pending"));
      setDelivered(json.bought.filter((b) => b.status === "Delivered"));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const showMoreDetailsDelivered = (ind) => {
    setShow(delivered[ind]);
    const d = new Date(delivered[ind].deliveryDate);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    setDel({ date: day, month: month, year: year });
    setReturnDate(d);
    setCurrentDate(new Date());
  };
  const showMoreDetailsPending = (ind) => {
    setShow(bought[ind]);
    const d = new Date(bought[ind].deliveryDate);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    setDel({ date: day, month: month, year: year });
    setReturnDate(d);
    setCurrentDate(new Date());
  };

  return (
    <>
      <CustomerNavBar />
      <div className="PinfoCust">
        <div className="PinfoHead">My Details</div>
        <div className="PinfoCustInfo">
          <div className="PinfoCustInfoImgwrap">
            {/* <button type="button" style={{ backgroundColor: "#c2c3c0", border: "1px solid black", borderRadius: "50%", border: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
              <img src={`${BASE_URL}/customerProfile/images/${cust.photo}`} className="PinfoCustInfoImg" alt="" />
            </button> */}

            <button
              type="button"
              style={{
                backgroundColor: "#c2c3c0",
                border: "1px solid black",
                borderRadius: "50%",
                border: "none",
              }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <img
                src={cust.photo} // Updated to use the URL from the MongoDB database
                className="PinfoCustInfoImg"
                alt=""
              />
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Chnage Photo</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="input-group mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="file"
                        name="file"
                        aria-describedby="inputFileAddon"
                        accept=".png,.jpeg,jpg"
                        onChange={(e) => { setImage(e.target.files[0]); }}
                      />
                      <label className="input-group-text" for="inputFile" >Choose Photo</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={uploadImage} >Upload Image</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="PinfoCustMain">
            <div className="editInfo" onClick={editinfo}>{!edit ? ("edit") : ("cancle")}</div>
            <div className="PinfoCustDiv">
              <div className="PinfoCustTitle">Name :- </div>
              {!edit ? <div className="PinfoCustValue">{cust.fullname}</div> : (<input className="editInput" name="newname" value={newFullName} onChange={(e) => { setNewFullName(e.target.value) }} />)}
            </div>
            <div className="PinfoCustDiv">
              <div className="PinfoCustTitle">Phone Number :- </div>
              {!edit ? <div className="PinfoCustValue">{cust.phone}</div> : (<input className="editInput" value={newPhone} onChange={(e) => { setNewPhone(e.target.value) }} />)}
            </div>
            <div className="PinfoCustDiv">
              <div className="PinfoCustTitle">Address :- </div>
              {!edit ? <div className="PinfoCustValue">{cust.address}</div> : (<input className="editInput" value={newAddress} onChange={(e) => { setNewAddress(e.target.value) }} />)}
            </div>
            <div className="PinfoCustDiv">
              <div className="PinfoCustTitle">Pincode :- </div>
              {!edit ? <div className="PinfoCustValue">{cust.pincode}</div> : (<input className="editInput" value={newPincode} onChange={(e) => { setNewPincode(e.target.value) }} />)}
            </div>
          </div>
          {edit && <div className="updateInfo" onClick={handleUpdate}>Update</div>}
        </div>

        <div className="PinfoPastOrders">
          <div className="PinfoPHead">Pending Deliveries :- </div>
          <div className="PinfoPOrders">
            {bought.map((evt, ind) => (
              <div className="PinfoCard" key={ind}>
                <img
                  src={evt.product.images[0]}
                  className="PinfoCardImg"
                  alt=""
                />
                <div className="PinfoCardMain">
                  <div className="PinfoMainTitle">{evt.product.title}</div>
                  <div className="PinfoMainTitleItem">
                    Delivery Status :- <span>{evt.status}</span>
                  </div>
                  <div className="PinfoMainBtnWrap">
                    <div
                      className="PinfoMainBtn"
                      onClick={() => showMoreDetailsPending(ind)}
                    >
                      More Details..
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="PinfoPastOrders">
          <div className="PinfoPHead">My Orders :- </div>
          <div className="PinfoPOrders">
            {delivered.map((evt, ind) => (
              <div className="PinfoCard" key={ind}>
                <img
                  src={evt.product.images[0]}
                  className="PinfoCardImg"
                  alt=""
                />
                <div className="PinfoCardMain">
                  <div className="PinfoMainTitle">{evt.product.title}</div>
                  <div className="PinfoMainTitleItem">
                    Delivery Status :- <span>{evt.status}</span>
                  </div>
                  <div className="PinfoMainBtnWrap">
                    <div
                      className="PinfoMainBtn"
                      onClick={() => showMoreDetailsDelivered(ind)}
                    >
                      More Details..
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {show && (
          <div
            className="PinfoOverlay"
            style={show ? { display: "flex" } : { display: "none" }}
          >
            <div className="PinfoOverlayCloseBtn">
              <div
                className="PinfoOverlayCrossBtn"
                onClick={() => {
                  setShow();
                }}
              >
                &times;
              </div>
            </div>
            <div className="PinfoOverlayMain">
              <div className="PinfoOverlayImgWrapper">
                <img
                  src={show.product.images[0]}
                  className="PinfoOverlayImg"
                  alt=""
                />
              </div>
              <div className="PinfoOverlayMainContent">
                <div className="PinfoOverlayMainContentTitle">
                  {show.product.title}
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">Order Id : </div>
                  <div className="PinfoOverlayMainDesValue">{show._id}</div>
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">Price :</div>
                  <div className="PinfoOverlayMainDesValue">
                    Rs. {show.product.price} /unit
                  </div>
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">Quantity : </div>
                  <div className="PinfoOverlayMainDesValue">
                    {show.quantity}
                  </div>
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">Code Used :</div>
                  <div className="PinfoOverlayMainDesValue">
                    {show.couponcode}
                  </div>
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">Discount : </div>
                  <div className="PinfoOverlayMainDesValue">
                    {show.discount}%
                  </div>
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">
                    {show.status === "Pending"
                      ? "Amount To Be Paid"
                      : "Amount Paid"}{" "}
                    :{" "}
                  </div>
                  <div className="PinfoOverlayMainDesValue">
                    Rs.{" "}
                    {Math.floor(
                      (show.quantity *
                        show.product.price *
                        (100 - show.discount)) /
                      100
                    )}{" "}
                    /-
                  </div>
                </div>
                <div className="PinfoOverlayMainDes">
                  <div className="PinfoOverlayMainDesTitle">
                    Delivery Status :{" "}
                  </div>
                  <div className="PinfoOverlayMainDesValue">{show.status}</div>
                </div>
                {show.status === "Pending" && (
                  <div className="PinfoOverlayMainDes">
                    <div className="PinfoOverlayMainDesTitle">
                      Expected Delivery Date :{" "}
                    </div>
                    <div className="PinfoOverlayMainDesValue">
                      {del.date}/{del.month}/{del.year}
                    </div>
                  </div>
                )}
                {show.status === "Delivered" && (
                  <div className="PinfoOverlayMainDes">
                    <div className="PinfoOverlayMainDesTitle">
                      Delivery Date :{" "}
                    </div>
                    <div className="PinfoOverlayMainDesValue">
                      {del.date}/{del.month}/{del.year}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

