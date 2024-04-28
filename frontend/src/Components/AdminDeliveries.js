
import React, { useEffect, useState } from 'react'
import logo from "./logo.jpeg"
import "../stylesheets/AdminHomePage.css"
import loader from '../Pictures/loader.gif'

export default function AdminDeliveries() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [show, setShow] = useState([]);
    const [showDelDetail, setShowDelDetail] = useState();
    const [del, setDel] = useState({ date: "", month: "", year: "" })


    const handleScroll = (event) => {
        const divElement = event.target;
        if (divElement.scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    const extractDate = (date) => {
        const year = date.getFullYear();
        const mon = date.getMonth() + 1;
        const d = date.getDate();
        return `${d < 10 ? '0' : ''}${d}/${mon < 10 ? '0' : ''}${mon}/${year}`
    }
    const check = (d) => {
        return new Date() >= d;
    }
    const showMoreDetails = (ind) => {
        setShowDelDetail(show[ind])
        const d = new Date(show[ind].deliveryDate)
        const day = d.getDate()
        const month = d.getMonth()+1
        const year = d.getFullYear()
        setDel({ date: day, month: month, year: year })
    }
    const deliver = async (id) => {
        console.log(id)
        const response = await fetch(
            "http://localhost:5000/velvethomes/admin/delivered",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: id,
                  })
            }
        );
        const json = await response.json();
        if (json.success) {
            setShowDelDetail();
            fetchData();
        }
    }
    const fetchData = async () => {
        setShowLoader(true);
        const response = await fetch(
            "http://localhost:5000/velvethomes/admin/deliveries",
            {
                method: "POST",

            }
        );
        const json = await response.json();
        if (json.success) {
            const arr = json.delivery;
            setShow(arr.filter((del)=>del.status==="Pending"))
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
                    Velvet Home's Delivery Page Is Loading...
                </span>
            </div> :
                <div className="FullPage">
                    <div className="AdminAdvertise" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
                        <img src={logo} alt="" />
                        <div className="AdminBrandName"><span>Velvet Home's Customer's Page</span></div>
                    </div>
                    <div className="AdminHomeMainContent" onScroll={handleScroll} style={isScrolled ? { height: '621px' } : { height: '596px' }}>
                        <div className="CompTrackSalesHead" style={{ fontSize: '35px' }} id='CompTrackSalesID'>Pending Deliveries : </div>
                        <div className="AdminAllCustomersMain">
                            {show.length === 0 && <div className='AdminAllCustomersNotFound'>No Pending Deliveries</div>}
                            {show.map((cust, ind) => (
                                <div className='AdminHomeCardSales' style={{ marginTop: '10px', justifyContent: 'space-between' }}>
                                    <img src={cust.product.images[0]} style={{ height: '150px' }} className="AdminHomeCardDispImg" alt="" />
                                    <div className="AdminHomeCardDiv" style={{ fontSize: 'large', textAlign: 'center', width: '100%', justifyContent: 'center' }}>{cust.product.title}</div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Customer: </div>
                                        <div className="AdminHomeCardDivValue">{cust.username}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Company Id: </div>
                                        <div className="AdminHomeCardDivValue">{cust.companyName}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">quantity: </div>
                                        <div className="AdminHomeCardDivValue">{cust.quantity}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Discount: </div>
                                        <div className="AdminHomeCardDivValue">{cust.discount}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">Order Date: </div>
                                        <div className="AdminHomeCardDivValue">{extractDate(new Date(cust.orderDate))}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px' }}>
                                        <div className="AdminHomeCardDivTitle">{cust.status==="Pending" ? "Expected Dilivery" : "Delivery Date"}: </div>
                                        <div className="AdminHomeCardDivValue" style={check(new Date(cust.deliveryDate)) ? { color: 'red' } : { color: '#555' }}>{extractDate(new Date(cust.deliveryDate))}</div>
                                    </div>
                                    <div className="AdminHomeCardDiv" style={{ marginTop: '5px', marginBottom: '5px' }}>
                                        <div className="AdminAllCustomersSearchBtn" style={{ marginLeft: '0', width: '100px' }} onClick={() => showMoreDetails(ind)}>See More</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {showDelDetail && <div className="PinfoOverlay" style={show ? { display: 'flex' } : { display: 'none' }}>
                <div className="PinfoOverlayCloseBtn">
                    <div className="PinfoOverlayCrossBtn" onClick={() => {
                        setShowDelDetail()
                    }}>&times;</div>
                </div>
                <div className="PinfoOverlayMain" style={{ backgroundColor: "#d7d5d3" }}>
                    <div className="PinfoOverlayImgWrapper">
                        <img src={showDelDetail.product.images[0]} className='PinfoOverlayImg' alt="" />
                    </div>
                    <div className="PinfoOverlayMainContent">
                        <div className="PinfoOverlayMainContentTitle">{showDelDetail.product.title}</div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Order Id :- </div>
                            <div className="PinfoOverlayMainDesValue">{showDelDetail._id}</div>
                        </div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Price :- </div>
                            <div className="PinfoOverlayMainDesValue">Rs. {showDelDetail.product.price} /unit</div>
                        </div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Quantity :- </div>
                            <div className="PinfoOverlayMainDesValue">{showDelDetail.quantity}</div>
                        </div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Code Used :- </div>
                            <div className="PinfoOverlayMainDesValue">{showDelDetail.couponcode}</div>
                        </div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Discount :- </div>
                            <div className="PinfoOverlayMainDesValue">{showDelDetail.discount}%</div>
                        </div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Amount Paid :- </div>
                            <div className="PinfoOverlayMainDesValue">Rs. {Math.floor(showDelDetail.quantity * showDelDetail.product.price * (100 - showDelDetail.discount) / 100)} /-</div>
                        </div>
                        <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Delivery Status :- </div>
                            <div className="PinfoOverlayMainDesValue">{showDelDetail.status}</div>
                        </div>
                        {showDelDetail.status === "Pending" && <div className="PinfoOverlayMainDes">
                            <div className="PinfoOverlayMainDesTitle">Expected Delivery Date :- </div>
                            <div className="PinfoOverlayMainDesValue">{del.date}/{del.month}/{del.year}</div>
                        </div>}
                        {showDelDetail.status === "Pending" && <div className='PinfoOverlayBtn'>
                            <div className="PinfoOverlayBtnMain" onClick={() => deliver(showDelDetail._id)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',height:"60px",marginTop:"30px" }}>Mark As Delivered</div>
                        </div>}
                    </div>
                </div>
            </div>}
        </div>
    )
}

