
import React, { useEffect, useState } from 'react'
import logo from "./logo.jpeg"
import "../stylesheets/AdminHomePage.css"
import loader from '../Pictures/loader.gif'


export default function AdminAllCustomers() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [show,setShow] = useState([]);

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
        const filteredCustomers = customers.filter((cust) => cust.fullname.toLowerCase().includes(str));
        console.log(filteredCustomers)
        setShow(filteredCustomers);
    }

    const fetchData = async () => {
        const response = await fetch(
            "http://localhost:5000/velvethomes/admin/allcustomers",
            {
                method: "POST",

            }
        );
        const json = await response.json();
        if (json.success) {
            setCustomers(json.customers)
            setShow(json.customers)
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
                    Velvet Home's Customer's Page Is Loading...
                </span>
            </div> :
                <div className="FullPage">
                    <div className="AdminAdvertise" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
                        <img src={logo} alt="" />
                        <div className="AdminBrandName"><span>Velvet Home's Customer's Page</span></div>
                    </div>
                    <div className="AdminHomeMainContent" onScroll={handleScroll} style={isScrolled ? { height: '621px' } : { height: '596px' }}>
                        <div className="AdminAllCustomersSearchBar">
                            <div className="AdminTitle">Search : </div>
                            <input type="text" className="AdminAllCustomersSearchInput" onChange={(evt) =>handleSearch(evt)} placeholder='search by name' />
                        </div>
                        <div className="AdminAllCustomersMain">
                            {show.length === 0 && <div className='AdminAllCustomersNotFound'>No Result Found</div>}
                            {show.map((cust) => (
                                <div className='AdminHomeCardSales' style={{ marginTop: '10px' }}>
                                    <img src={cust.photo} className="AdminHomeCardDispImg" alt="" />
                                    <div className="AdminHomeCardDiv" style={{ fontSize: 'x-large', textAlign: 'center', width: '100%', justifyContent: 'center' }}>{cust.fullname}</div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Email Id: </div>
                                        <div className="AdminHomeCardDivValue">{cust.username}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Phone Number: </div>
                                        <div className="AdminHomeCardDivValue">+91-{cust.phone}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Address: </div>
                                        <div className="AdminHomeCardDivValue">{cust.address}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Total Purchase: </div>
                                        <div className="AdminHomeCardDivValue">Rs. {cust.totalPurchase}/-</div>
                                    </div>
                                    {/* <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminAllCustomersSearchBtn" style={{ marginLeft: '0', width: '100px' }}>See More</div>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
        </div>
    )
}