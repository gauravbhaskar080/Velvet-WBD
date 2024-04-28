import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/ShowProduct.css";
import CustomerNavBar from "../Components/CustomerNavBar";

export default function ShowProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgIndex, setImgIndex] = useState(0);
  const [des, setDes] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [element, setElement] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    companyusername: "",
    newItem: false,
    featuresKey: [],
    featuresvalue: [],
    images: [],
    key_points: [],
    _id: "",
  });

  const addToCart = async function () {
    const response = await fetch(
      "http://localhost:5000/velvethomes/customer/addtocart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("customerUsername"),
          id: element._id,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      navigate("/velvethomes/cart");
    } else {
      navigate("/velvethomes/cart");
    }
  };

  const fetchData = async function () {
    const response = await fetch(
      "http://localhost:5000/velvethomes/customer/productdetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oid: id,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      const r = new Date(json.object.registered);
      const givenDateMs = new Date(r).getTime();
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      setElement({
        title: json.object.title,
        description: json.object.description,
        price: json.object.price,
        quantity: json.object.quantity,
        category: json.object.category,
        companyusername: json.object.companyusername,
        featuresKey: Object.keys(json.object.features),
        featuresvalue: Object.values(json.object.features),
        images: json.object.images,
        key_points: json.object.key_points,
        newItem: givenDateMs > oneWeekAgo.getTime(),
        _id: json.object._id,
      });
      let x = Math.min(300, json.object.description.length);
      setDes(json.object.description.slice(0, x));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <CustomerNavBar />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="prod-image-display">
          <div className="image-big-prod-con">
            <img
              src={element.images[imgIndex]}
              className="prod-big-display-con"
              alt=""
            />
            <div
              className="left-key-prod"
              onClick={() =>
                imgIndex === 0
                  ? setImgIndex(element.images.length - 1)
                  : setImgIndex(imgIndex - 1)
              }
            >
              {" "}
              &lsaquo;{" "}
            </div>
            <div
              className="right-key-prod"
              onClick={() =>
                setImgIndex((imgIndex + 1) % element.images.length)
              }
            >
              {" "}
              &rsaquo;{" "}
            </div>
          </div>
          <div className="prod-small-pic-con">
            {element.images.map((pic, index) => (
              <img
                src={pic}
                onClick={() => setImgIndex(index)}
                key={index}
                className="prod-small-display-con"
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="main-prod-con">
          {element.newItem && (
            <img
              className="newprodimg"
              src="https://t3.ftcdn.net/jpg/06/09/51/76/240_F_609517602_fovkqnSd0MQ5huF7nCMsCUTXudcGQQua.jpg"
            />
          )}
          <h2 className="prod-title-display">{element.title}</h2>
          <div className="prod-con">
            <div className="prod-title" style={{ width: "30%" }}>
              Price :{" "}
            </div>
            <div className="prod-val" style={{ justifyContent: "flex-start" }}>
              Rs. {element.price} /-
            </div>
          </div>
          <div className="prod-con">
            <div className="prod-title" style={{ width: "30%" }}>
              Product Type :{" "}
            </div>
            <div className="prod-val" style={{ justifyContent: "flex-start" }}>
              {element.category}
            </div>
          </div>
          <div className="prod-con">
            <div className="prod-title" style={{ width: "90%" }}>
              Product Features :{" "}
            </div>
          </div>
          <div
            className="prod-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {element.featuresKey.map((k, ind) => {
              return (
                <div className="features-con">
                  <div className="features-con-title">{k} : </div>
                  <div className="features-con-val">
                    {element.featuresvalue[ind]}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="prod-con">
            <div
              className="prod-title"
              style={{
                width: "27%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              Description :{" "}
            </div>
            <div className="prod-val prod-desc" style={{ width: "73%" }}>
              {!showMore ? des : element.description}
              {des !== element.description && (
                <span
                  onClick={() => setShowMore(!showMore)}
                  style={{
                    color: "#555",
                    cursor: "pointer",
                    borderBottom: "1px dashed #555",
                  }}
                >
                  {!showMore ? "See More..." : `See Less...`}
                </span>
              )}
            </div>
          </div>
          <div
            className="prod-con"
            style={{ flexDirection: "column", justifyContent: "flex-end" }}
          >
            <div
              className="prod-title"
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              More Details :{" "}
            </div>
            <div className="prod-val prod-desc" style={{ width: "100%" }}>
              <ul style={{ width: "90%" }}>
                {element.key_points.map((e) => (
                  <li>{e}</li>
                ))}
              </ul>
            </div>
          </div>
          {element.quantity === 0 && (
            <div className="prod-quantity-finish">
              *Apologies, out of stock. Replenishment underway!!
            </div>
          )}
          {element.quantity <= 100 && element.quantity >= 10 && (
            <div className="prod-quantity-finish">
              *Hurry, only a precious few of these limited edition items remain
              in stock!!
            </div>
          )}
          {element.quantity < 10 && (
            <div className="prod-quantity-finish">
              *Hurry, only {element.quantity} Pieces of these limited edition
              items remain in stock!!
            </div>
          )}
          <div className="prod-btns-con">
            <div
              onClick={() => navigate(`/velvethomes/bill/${element._id}`)}
              className="prod-btn prod-bn"
              style={
                element.quantity === 0 ? { backgroundColor: "#862b0dc1" } : {}
              }
            >
              Buy Now
            </div>
            <div
              className="prod-btn prod-ac"
              style={
                element.quantity === 0 ? { backgroundColor: "#001c30be" } : {}
              }
              onClick={addToCart}
            >
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
