
import React, { useEffect, useState } from 'react'
import logo from "./logo.jpeg"
import "../stylesheets/AdminHomePage.css"
import loader from '../Pictures/loader.gif'

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
        const filteredCustomers = companies.filter((cust) => cust.companyname.toLowerCase().includes(str));
        setShow(filteredCustomers);
    }

    const extractDate = (date) => {
        const year = date.getFullYear();
        const mon = date.getMonth() + 1;
        const d = date.getDate();
        return `${d < 10 ? '0' : ''}${d}/${mon < 10 ? '0' : ''}${mon}/${year}`
    }

    const fetchData = async () => {
        const response = await fetch(
            "http://localhost:5000/velvethomes/admin/allcompanies",
            {
                method: "POST",

            }
        );
        const json = await response.json();
        if (json.success) {
            setCompanies(json.company)
            setShow(json.company)
            setShowLoader(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='AdminHomePage'>
            {showLoader ? <div className="AdminLoadercon">
                <img src={loader} alt='' className='AdminLoader' />
                <span className='AdminLoaderText'>
                    Velvet Home's Companies are Loading...
                </span>
            </div> :
                <div className="FullPage">
                    <div className="AdminAdvertise" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
                        <img src={logo} alt="" />
                        <div className="AdminBrandName"><span>Velvet Home's Admin's Page</span></div>
                    </div>
                    <div className="AdminHomeMainContent" onScroll={handleScroll} style={isScrolled ? { height: '621px' } : { height: '596px' }}>
                        <div className="AdminAllCustomersSearchBar">
                            <div className="AdminTitle">Search : </div>
                            <input type="text" className="AdminAllCustomersSearchInput" onChange={(evt) => handleSearch(evt)} placeholder='search by company name' />
                        </div>
                        <div className="AdminAllCustomersMain">
                            {show.length === 0 && <div className='AdminAllCustomersNotFound'>No Result Found</div>}
                            {show.map((s) => (
                                <div className="CHPcard" style={{ height:"250px",justifyContent: 'center' }} key={s._id}>
                                    <div className="CHPcardMain" style={{ height:"250px",justifyContent: 'center' }}>
                                        <div className="CHPcardMainDiv">
                                            <div className="CHPcardMainDivTitle">{s.companyname}</div>
                                        </div>
                                        <div className="CHPcardMainDiv">
                                            <div className="CHPcardMainDivTitle" style={{ fontSize: '20px' }}>({s.username})</div>
                                        </div>
                                        <div className="CHPcardMainDiv">
                                            <div className="CHPcardMainDivValue">TurnOver:  Rs. {s.totalbusiness}</div>
                                        </div>
                                        <div className="CHPcardMainDiv">
                                            <div className="CHPcardMainDivValue">Registered:  {extractDate(new Date(s.createdAt))}</div>
                                        </div>
                                        {/* <div className="AdminAllCompaniesBtn">More Details..</div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </div>
    )
}
