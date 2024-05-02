import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg";
import "../stylesheets/AdminHomePage.css";
import SalesChart from "./SalesChart";
import loader from "../Pictures/loader.gif";
import { BASE_URL } from "../api";

export default function AdminHomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const handleScroll = (event) => {
    const divElement = event.target;
    if (divElement.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const [comp, setComp] = useState([]);
  const [admin, setAdmin] = useState({
    totalTurnOver: 0,
    totalProfit: 0,
  });
  const [cust, setCust] = useState([]);
  const [sales, setSales] = useState([]);
  const [showSales, setShowSales] = useState([]);
  const [dc, setDc] = useState([]);
  const [mostSeller, setMostSeller] = useState([]);
  const [leastSeller, setLeastSeller] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    discountpercent: 0,
    to: "ALL",
    specific: "",
  });
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await fetch(`${BASE_URL}/velvethomes/admin/discountcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: formData.code,
        discountpercent: formData.discountpercent,
        to: formData.to,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setDc([...dc, json.code]);
      setFormData({
        code: "",
        discountpercent: "",
        to: "ALL",
        specific: "",
      });
    } else {
      alert("An error occured");
    }
  };
  const deleteCode = async (id) => {
    alert(id);
    const response = await fetch(
      `${BASE_URL}/velvethomes/admin/deletediscountcode`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      setDc(json.dc);
    }
  };
  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/velvethomes/admin/home`, {
      method: "GET",
      // headers: {
      //     "Content-Type": "application/json",
      // },
      // body: JSON.stringify({
      //     email: localStorage.getItem("userEmail")
      // }),
    });
    const json = await response.json();
    if (json.success) {
      setCust(json.customer);
      setComp(json.company);
      setAdmin({
        totalTurnOver: json.admin.totalBusiness,
        totalProfit: json.admin.totalProfit,
      });
      setSales(json.sales.reverse());
      setShowSales(json.sales.reverse().splice(0, 3));
      setDc(json.discountcode);
      setMostSeller(json.mostSeller);
      setLeastSeller(json.leastSeller);
      setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = [];
  const profitData = [];
  const extractDate = (date) => {
    const year = date.getFullYear();
    const mon = date.getMonth() + 1;
    const d = date.getDate();
    return `${d < 10 ? "0" : ""}${d}/${mon < 10 ? "0" : ""}${mon}/${year}`;
  };
  const isDateInPastMonth = (date) => {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    if (
      date.getFullYear() === oneMonthAgo.getFullYear() &&
      date.getMonth() === oneMonthAgo.getMonth()
    ) {
      return date.getDate() <= currentDate.getDate();
    }

    return date >= oneMonthAgo;
  };
  let p = 0;
  if (sales.length > 0) {
    for (let i = 0; i < sales.length; i++) {
      if (sales[i].status === "Cancelled") continue;
      const cd = new Date(sales[i].orderDate);
      const ed = extractDate(cd);
      if (isDateInPastMonth(cd)) {
        p += Math.floor(
          (sales[i].quantity *
            sales[i].product.price *
            (sales[i].product.margin - sales[i].discount)) /
            100
        );
      }
      if (data.length > 0) {
        if (data[data.length - 1].date === ed) {
          data[data.length - 1].sales += Math.floor(
            (sales[i].quantity *
              sales[i].product.price *
              (100 - sales[i].discount)) /
              100
          );
        } else {
          data.push({
            date: ed,
            sales: Math.floor(
              (sales[i].quantity *
                sales[i].product.price *
                (100 - sales[i].discount)) /
                100
            ),
          });
        }
      } else {
        data.push({
          date: ed,
          sales: Math.floor(
            (sales[i].quantity *
              sales[i].product.price *
              (100 - sales[i].discount)) /
              100
          ),
        });
      }
      if (profitData.length > 0) {
        if (profitData[profitData.length - 1].date === ed) {
          profitData[profitData.length - 1].profit += Math.floor(
            (sales[i].quantity *
              sales[i].product.price *
              (sales[i].product.margin - sales[i].discount)) /
              100
          );
        } else {
          profitData.push({
            date: ed,
            profit: Math.floor(
              (sales[i].quantity *
                sales[i].product.price *
                (sales[i].product.margin - sales[i].discount)) /
                100
            ),
          });
        }
      } else {
        profitData.push({
          date: ed,
          profit: Math.floor(
            (sales[i].quantity *
              sales[i].product.price *
              (sales[i].product.margin - sales[i].discount)) /
              100
          ),
        });
      }
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="AdminHomePage">
      {showLoader ? (
        <div className="AdminLoadercon">
          <img src={loader} alt="" className="AdminLoader" />
          <span className="AdminLoaderText">
            Velvet Home's Page Is Loading...
          </span>
        </div>
      ) : (
        <div className="FullPage">
          {/* <div className="CompTrackSalesHea" id='CompTrackSalesID' style={{  backgroundColor: "none", borderRadius: "none", maxWidth: "fit-content", marginLeft: "40px" , fontSize:"30px"}}> Dashboard</div> */}

          {/* <div className="AdminAdvertise" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                        <div className="AdminBrandName"><span>Velvet Home's Admin's Page</span></div>
                    </div> */}
          <div
            className="AdminHomeMainContent"
            onScroll={handleScroll}
            style={isScrolled ? { height: "100%" } : { height: "100%" }}
          >
            <div className="CompTrackSalesHead" style={{ fontSize: "25px" }}>
              Dashboard{" "}
            </div>
            <div className="CompDetails">
              <div className="CHPcardCon">
                <div className="CHPImage">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/925/925014.png"
                    className="CHPImgCon"
                    alt=""
                  />
                </div>
                <div className="CHPcard">
                  <div className="CHPcardMain">
                    <div
                      className="CHPcardMainDiv"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="CHPcardMainDivTitle"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          fontSize: "15px",
                        }}
                      >
                        Turnover
                      </div>
                      <div
                        className="CHPcardMainDivSubtitle"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "0",
                          marginTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        Rs. {admin.totalTurnOver}/-
                      </div>
                      <div
                        className="CHPcardMainDivTitleAdd"
                        style={{
                          borderTop: "1px solid #000",
                          position: "absolute",
                          top: "50px",
                          right: "0px",
                          marginTop: "22px",
                          fontSize: "13px",
                          color: "#000",
                        }}
                      >
                        Till Now
                      </div>
                    </div>
                    <div className="CHPcardMainDiv">
                      {/* <hr style={{height:"10px",color:"black"}} /> */}

                      {/* <div className="CHPcardMainDivTitle" >Rs. {admin.totalTurnOver}/-</div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="CHPcardCon">
                <div className="CHPImage">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4599/4599706.png"
                    className="CHPImgCon"
                    alt=""
                  />
                </div>
                <div className="CHPcard">
                  <div className="CHPcardMain">
                    <div
                      className="CHPcardMainDiv"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="CHPcardMainDivTitle"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          fontSize: "15px",
                        }}
                      >
                        Total Income
                      </div>
                      <div
                        className="CHPcardMainDivSubTitle"
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: "0",
                          marginTop: "20px",
                          fontSize: "20px",
                        }}
                      >
                        Rs. {admin.totalProfit}/-
                      </div>
                      <div
                        className="CHPcardMainDivTitleAdd"
                        style={{
                          borderTop: "1px solid #000",
                          position: "absolute",
                          top: "50px",
                          right: "0",
                          marginTop: "22px",
                          fontSize: "13px",
                        }}
                      >
                        +Rs.{p} this month
                      </div>
                    </div>
                    <div className="CHPcardMainDiv"></div>
                  </div>
                </div>
              </div>
              <div className="CHPcardCon">
                <div className="CHPImage">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3095/3095195.png"
                    className="CHPImgCon"
                    alt=""
                  />
                </div>
                <div className="CHPcard">
                  <div className="CHPcardMain">
                    <div
                      className="CHPcardMainDiv"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="CHPcardMainDivTitle"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          fontSize: "15px",
                        }}
                      >
                        No. Of Customers
                      </div>
                      <div
                        className="CHPcardMainDivTitle"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "0",
                          marginTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        {cust.length}
                      </div>
                      <div
                        className="CHPcardMainDivTitleAdd"
                        style={{
                          borderTop: "1px solid #000",
                          position: "absolute",
                          top: "50px",
                          right: "0",
                          marginTop: "22px",
                          fontSize: "13px",
                          color: "#000",
                        }}
                      >
                        Till Now
                      </div>
                    </div>
                    <div className="CHPcardMainDiv"></div>
                  </div>
                </div>
              </div>
              <div className="CHPcardCon">
                <div className="CHPImage">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2905/2905064.png"
                    className="CHPImgCon"
                    alt=""
                  />
                </div>
                <div className="CHPcard">
                  <div className="CHPcardMain">
                    <div
                      className="CHPcardMainDiv"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="CHPcardMainDivTitle"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          fontSize: "15px",
                        }}
                      >
                        Companies Registered
                      </div>
                      <div
                        className="CHPcardMainDivTitle"
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: "0",
                          marginTop: "20px",
                          fontSize: "20px",
                        }}
                      >
                        {comp.length}
                      </div>
                      <div
                        className="CHPcardMainDivTitleAdd"
                        style={{
                          borderTop: "1px solid #000",
                          position: "absolute",
                          top: "50px",
                          right: "0",
                          marginTop: "22px",
                          fontSize: "13px",
                          color: "#000",
                        }}
                      >
                        Till Now
                      </div>
                    </div>
                    <div className="CHPcardMainDiv"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="CompTrackSalesHea"
              id="CompTrackSalesID"
              style={{
                fontSize: "50px",
                borderBottom: "1px dashed black",
                backgroundColor: "none",
                borderRadius: "none",
                maxWidth: "fit-content",
                marginLeft: "40px",
                fontSize: "30px",
              }}
            >
              Sales Report
            </div>
            <div className="SalesChartsCon">
              <div className="SalesChartConDiv">
                <SalesChart data={data} />
              </div>

              <div className="SalesChartConDiv">
                <SalesChart data={profitData} yDateKey="profit" />
              </div>
            </div>
            <div
              className="CompTrackSalesHea"
              id="CompTrackSalesID"
              style={{
                fontSize: "50px",
                borderBottom: "1px dashed black",
                backgroundColor: "none",
                borderRadius: "none",
                maxWidth: "fit-content",
                marginLeft: "40px",
                fontSize: "30px",
              }}
            >
              Recently Sold Products
            </div>
            <div className="SalesChartsCon">
              {showSales.length === 0 ? (
                <div>No Element Sold</div>
              ) : (
                showSales.map((s) => {
                  return (
                    <div className="AdminHomeCardSales" key={s._id}>
                      <img
                        src={s.product.images[0]}
                        className="AdminHomeCardDispImg"
                        alt=""
                      />
                      <div className="AdminHomeCardMain">
                        <div
                          className="AdminHomeCardDiv"
                          style={{ fontSize: "larger" }}
                        >
                          {s.product.title.split(" ").slice(0, 6).join(" ")}
                        </div>
                        <div className="AdminHomeCardDiv">
                          <div className="AdminHomeCardDivTitle">
                            Customer:{" "}
                          </div>
                          <div className="AdminHomeCardDivValue">
                            {s.username}
                          </div>
                        </div>
                        <div className="AdminHomeCardDiv">
                          <div className="AdminHomeCardDivTitle">Company: </div>
                          <div className="AdminHomeCardDivValue">
                            {s.product.companyusername}
                          </div>
                        </div>
                        <div className="AdminHomeCardDiv">
                          <div className="AdminHomeCardDivTitle">
                            Delivery Status:{" "}
                          </div>
                          <div className="AdminHomeCardDivValue">
                            {s.status}
                          </div>
                        </div>
                        <div className="AdminHomeCardDiv">
                          <div className="AdminHomeCardDivTitle">
                            Quantity:{" "}
                          </div>
                          <div className="AdminHomeCardDivValue">
                            {s.quantity}
                          </div>
                        </div>
                        <div className="AdminHomeCardDiv">
                          <div className="AdminHomeCardDivTitle">Date: </div>
                          <div className="AdminHomeCardDivValue">
                            {extractDate(new Date(s.orderDate))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="MostAndLeastSellingCon">
              <div className="MostSellingCon">
                <div
                  className="CompTrackSalesHead"
                  id="CompTrackSalesID"
                  style={{ height: "60px", fontSize: "30px" }}
                >
                  Most Selling Comp.
                </div>
                <div className="SalesChartsCon">
                  {mostSeller.map((s) => (
                    <div className="CHPcard" key={s._id}>
                      <div
                        className="CHPcardMain"
                        style={{
                          height: "170px",
                          marginTop: "0",
                          paddingTop: "5px",
                        }}
                      >
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivTitle"
                            style={{ fontSize: "20px" }}
                          >
                            {s.companyname}
                          </div>
                        </div>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivValue"
                            style={{ fontSize: "17px" }}
                          >
                            TurnOver: Rs. {s.totalbusiness}
                          </div>

                          {/* <hr className="hey" style={{ width: "100%", borderTop: "1px solid black", marginBottom: "120px" }} /> */}
                        </div>
                        <div className="CHPcardMainDiv">
                          {/* <div className="CHPcardMainDivTitleAdd" style={{ borderTop: '1px solid #000',position: "absolute", top: "50px", right: "0", marginTop:"22px", fontSize: "13px" ,color:"#000"}}>Till Now</div> */}

                          <div
                            className="CHPcardMainDivValue"
                            style={{
                              fontSize: "13px",
                              borderTop: "1px solid #000",
                            }}
                          >
                            Registered: {extractDate(new Date(s.createdAt))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="LeastSellingCon">
                <div
                  className="CompTrackSalesHead"
                  id="CompTrackSalesID"
                  style={{ fontSize: "30px", height: "60px" }}
                >
                  Least Selling Comp.
                </div>
                <div className="SalesChartsCon">
                  {leastSeller.map((s) => (
                    <div
                      className="CHPcard"
                      key={s._id}
                      style={{
                        width: "250px",
                        height: "125px",
                        overflow: "hidden",
                      }}
                    >
                      <div className="CHPcardMain">
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivTitle"
                            style={{ fontSize: "20px" }}
                          >
                            {s.companyname}
                          </div>
                        </div>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivValue"
                            style={{ fontSize: "17px" }}
                          >
                            TurnOver: Rs. {s.totalbusiness}
                          </div>
                        </div>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivValue"
                            style={{
                              fontSize: "13px",
                              borderTop: " 1px solid #000",
                              width: "95%",
                            }}
                          >
                            Registered: {extractDate(new Date(s.createdAt))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="MostAndLeastSellingCon">
              <div className="MostSellingCon">
                <div
                  className="CompTrackSalesHead"
                  id="CompTrackSalesID"
                  style={{ fontSize: "30px", height: "60px" }}
                >
                  Discount Codes
                </div>
                <div className="SalesChartsCon">
                  {dc.map((s) => (
                    <div
                      className="CHPcard"
                      key={s._id}
                      style={{
                        width: "220px",
                        height: "200px",
                        overflow: "hidden",
                      }}
                    >
                      <div className="CHPcardMain" style={{ height: "180px" }}>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivTitle"
                            style={{ fontSize: "17px" }}
                          >
                            {s.code}
                          </div>
                        </div>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivValue"
                            style={{
                              fontSize: "15px",
                              borderTop: "1px solid #000",
                              paddingTop: "5px",
                              width: "80%",
                            }}
                          >
                            Discount: {s.discountpercent}%
                          </div>
                        </div>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardMainDivValue"
                            style={{ fontSize: "13px" }}
                          >
                            Applicable To: {s.to}
                          </div>
                        </div>
                        <div className="CHPcardMainDiv">
                          <div
                            className="CHPcardBtn"
                            style={{
                              fontSize: "15px",
                              height: "32px",
                              width: "130px",
                            }}
                            onClick={() => deleteCode(s._id)}
                          >
                            Remove Code
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="LeastSellingCon">
                <div
                  className="CompTrackSalesHead"
                  id="CompTrackSalesID"
                  style={{ fontSize: "30px", height: "60px" }}
                >
                  New Code
                </div>
                <div className="SalesChartsCon">
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className="AdminHomeForm"
                  >
                    <div className="AdminInputCon">
                      <label
                        htmlFor="code"
                        className="AdminInputLabel"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        Enter Code:{" "}
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Code"
                        id="code"
                        value={formData.code}
                        name="code"
                        className="AdminHomeText"
                        required
                      />
                    </div>
                    <div
                      className="AdminInputCon"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                      }}
                    >
                      <label htmlFor="dp" className="AdminInputLabel">
                        Enter Discount Percent:{" "}
                      </label>
                      <input
                        type="number"
                        onChange={handleChange}
                        min={1}
                        max={100}
                        id="dp"
                        name="discountpercent"
                        value={formData.discountpercent}
                        placeholder="Discount Percent"
                        className="AdminHomeNumber"
                      />
                    </div>
                    <div
                      className="AdminInputCon"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                      }}
                    >
                      <label htmlFor="to" className="AdminInputLabel">
                        Applicable To:{" "}
                      </label>
                      <select
                        name="to"
                        onChange={handleChange}
                        value={formData.to}
                        id="to"
                      >
                        <option value="ALL">ALL</option>
                        <option value="SPECIFIC">SPECIFIC</option>
                      </select>
                    </div>
                    {formData.to === "SPECIFIC" && (
                      <div className="AdminInputCon">
                        <label
                          htmlFor="username"
                          className="AdminInputLabel"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                          }}
                        >
                          Enter UserName Of Customer :{" "}
                        </label>
                        <input
                          type="text"
                          onChange={handleChange}
                          value={formData.specific}
                          placeholder="username"
                          id="username"
                          name="specific"
                          className="AdminHomeText"
                        />
                      </div>
                    )}
                    <div className="AdminInputBtnCon">
                      <button className="AdminInputBtn">Add Code</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
