import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import "../stylesheets/AdminHomePage.css";
import loader from "../Pictures/loader.gif";
import { BASE_URL } from "../api";

export default function AdminAllCompanies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [show, setShow] = useState([]);

  const handleScroll = (event) => {
    const divElement = event.target;
    if (divElement.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleSearch = (evt) => {
    const str = evt.target.value.toLowerCase();
    const filteredCustomers = companies.filter((cust) =>
      cust.companyname.toLowerCase().includes(str)
    );
    setShow(filteredCustomers);
  };

  const extractDate = (date) => {
    const year = date.getFullYear();
    const mon = date.getMonth() + 1;
    const d = date.getDate();
    return `${d < 10 ? "0" : ""}${d}/${mon < 10 ? "0" : ""}${mon}/${year}`;
  };

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/velvethomes/admin/allcompanies`, {
      method: "GET",
    });
    const json = await response.json();
    if (json.success) {
      setCompanies(json.company);
      setShow(json.company);
      setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCompany = async (companyId) => {
    const response = await fetch(
      `${BASE_URL}/velvethomes/admin/deletecompany`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: companyId }),
      }
    );
    const json = await response.json();
    if (json.success) {
      // Refresh the customer list after deletion
      fetchData();
    } else {
      // Handle error
      console.error(json.message);
    }
  };

  return (
    <div className="AdminHomePage">
      {showLoader ? (
        <div className="AdminLoadercon">
          <img src={loader} alt="" className="AdminLoader" />
          <span className="AdminLoaderText">
            Velvet Home's Companies are Loading...
          </span>
        </div>
      ) : (
        <div className="FullPage" style={{ marginTop: "20px" }}>
          {/* <div className="AdminAdvertise" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
                        <img src={logo} alt="" />
                        <div className="AdminBrandName"><span>Velvet Home's Admin's Page</span></div>
                    </div> */}
          <div
            className="AdminHomeMainContent"
            onScroll={handleScroll}
            style={isScrolled ? { height: "100vh" } : { height: "100vh" }}
          >
            <div className="CompTrackSalesHead" style={{ fontSize: "25px" }}>
              All Companies{" "}
            </div>
            <div className="AdminAllCustomersSearchBar">
              <div className="AdminTitle">Search : </div>
              <input
                type="text"
                className="AdminAllCustomersSearchInput"
                onChange={(evt) => handleSearch(evt)}
                placeholder="search by company name"
              />
            </div>
            <div className="AdminAllCustomersMain">
              {show.length === 0 && (
                <div className="AdminAllCustomersNotFound">No Result Found</div>
              )}
              {show.map((s) => (
                <div
                  className="CHPcard"
                  style={{
                    height: "180px",
                    width: "200px",
                    margin: "20px",
                    justifyContent: "center",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  key={s._id}
                >
                  <div
                    className="CHPcardMain"
                    style={{ height: "180px", justifyContent: "center" }}
                  >
                    <div className="CHPcardMainDiv">
                      <div
                        className="CHPcardMainDivTitle"
                        style={{ fontSize: "18px" }}
                      >
                        {s.companyname}
                      </div>
                    </div>
                    <div className="CHPcardMainDiv">
                      <div
                        className="CHPcardMainDivTitle"
                        style={{ fontSize: "16px" }}
                      >
                        ({s.username})
                      </div>
                    </div>
                    <div
                      className="CHPcardMainDiv"
                      style={{ position: "relative" }}
                    >
                      <hr
                        style={{
                          width: "100%",
                          borderTop: "1px solid black",
                          marginBottom: "5px",
                        }}
                      />
                      <div
                        className="CHPcardMainDivValue"
                        style={{ fontSize: "14px" }}
                      >
                        TurnOver: Rs. {s.totalbusiness}
                      </div>
                    </div>
                    <div className="CHPcardMainDiv">
                      <div
                        className="CHPcardMainDivValue"
                        style={{ fontSize: "14px" }}
                      >
                        Registered: {extractDate(new Date(s.createdAt))}
                      </div>
                    </div>

                    <button
                      style={{
                        backgroundColor: "#7a3e3e",
                        color: "whitesmoke",
                        border: "none",
                        padding: "4px",
                        borderRadius: "3px",
                        width: "70px",
                        marginTop: "5px",
                      }}
                      onClick={() => handleDeleteCompany(s._id)}
                    >
                      Delete
                    </button>

                    {/* <div className="AdminAllCompaniesBtn">More Details..</div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
