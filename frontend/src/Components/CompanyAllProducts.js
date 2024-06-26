import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import "../stylesheets/CompanyAllProducts.css";
import TypingEffect from "./TypingEffect";
import { BASE_URL } from "../api";
import CompanyCard from "./CompanyCard";

export default function CompanyAllProducts() {
  const quotes = [
    "Join our thriving community of successful sellers and unleash your potential.",
    "Discover a world of endless possibilities for your products with our innovative platform.",
    "Empowering sellers to create, grow, and thrive in the digital marketplace.",
    "Experience the power of our platform and elevate your online business to new heights.",
    "Unlock the gateway to success with our user-friendly platform designed for sellers like you.",
    "Take control of your ecommerce journey and embrace the limitless opportunities on our platform.",
    "Join us and be part of a supportive network of sellers who are making their dreams a reality.",
    "Experience the freedom to sell on your terms and watch your business flourish.",
    "Our platform is your launchpad to success, reach more customers, drive sales, and achieve your goals.",
    "Your success story starts here. Embrace the tools, resources, and community that will fuel your growth.",
  ];
  const [objs, setObjs] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (event) => {
    const divElement = event.target;
    if (divElement.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const fetchData = async () => {
    const response = await fetch(
      `${BASE_URL}/velvethomes/seller/showallprods`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      setObjs(json.objects.reverse());
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getDateString = (d) => {
    const curr = new Date(d);
    const da = curr.getDate();
    const m = curr.getMonth() + 1;
    const y = curr.getFullYear();
    return `${da < 10 ? "0" : ""}${da}/${m < 10 ? "0" : ""}${m}/${y}`;
  };
  return (
    <div className="CompanyAllProducts">
      {/* <div className="CompanyAdvertiseSeller" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
        <img src={logo} alt="" />
        <div className="SelllerBrandName"><span>Velvet Home's Seller's Page</span></div>
      </div> */}
      <div
        className="CompanyAllProductsMain"
        onScroll={handleScroll}
        style={isScrolled ? { height: "100vh" } : { height: "100vh" }}
      >
        <div className="TypingEffectCon">
          <TypingEffect
            words={quotes}
            styles={{
              color: "#3F2305",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "95%",
              height: "80px",
              fontSize: "30px",
              backgroundColor: "#f0efef",
              border: "5px solid black",
              padding: "10px",
              borderRadius: "20px",
              margin: "5px",
            }}
          />
        </div>
        <div className="CompTrackSalesHead" id="CompTrackSalesID">
          All Products
        </div>
        <div className="CompTrackSalesProdsCon">
          {objs.length === 0 ? (
            <div className="CAP-message">0 Products Registered</div>
          ) : (
            objs.map((o) => 
              <CompanyCard o={o} fetchData={fetchData}/>
            )
          )}
        </div>
      </div>
    </div>
  );
}
