
import React, { useState, useEffect } from 'react'
import TypingEffect from "../Components/TypingEffect";
import "../stylesheets/CompanyHomePage.css"
import logo from "./logo.jpeg"
import SalesChart from './SalesChart';

export default function CompanyHomePage() {
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
        "Your success story starts here. Embrace the tools, resources, and community that will fuel your growth."
    ]
    const [isScrolled, setIsScrolled] = useState(false);
    const [comp, setComp] = useState({
        name: "",
        totalbus: "",
        username: "",
        date: 0,
        month: 0,
        year: 0,
        sold: []
    })
    const data = []
    const [recentlySold,setRecentlySold] = useState([]);
    const handleScroll = (event) => {
        const divElement = event.target;
        if (divElement.scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    const fetchData = async function () {
        const response = await fetch(
            "http://localhost:5000/velvethomes/seller/home",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localStorage.getItem("userEmail")
                }),
            }
        );
        const json = await response.json();
        if (json.success) {
            const dates = new Date(json.company.createdAt);
            const d = dates.getDate();
            const m = dates.getMonth();
            const y = dates.getFullYear();
            setComp({
                name: json.company.companyname,
                username: json.company.email,
                totalbus: json.company.totalbusiness,
                date: d,
                month: m + 1,
                year: y,
                sold: json.sold
            })
            setRecentlySold(json.sold.reverse().slice(0,4))
        }
    };
    const isDateInPastWeek = (date) => {
        const currentDate = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(currentDate.getDate() - 7);

        return date >= oneWeekAgo && date <= currentDate;
    }
    const isDateInPastMonth = (date) => {
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        if (date.getFullYear() === oneMonthAgo.getFullYear() && date.getMonth() === oneMonthAgo.getMonth()) {
            return date.getDate() <= currentDate.getDate();
        }

        return date >= oneMonthAgo;
    }
    const isDateInPastYear = (date) => {
        const currentDate = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
        return date.getFullYear() >= oneYearAgo.getFullYear();
    }


    const extractDate = (date) => {
        const year = date.getFullYear();
        const mon = date.getMonth() + 1;
        const d = date.getDate();
        return `${d < 10 ? '0' : ''}${d}/${mon < 10 ? '0' : ''}${mon}/${year}`
    }
    const d = {
        week: 0,
        month: 0,
        year: 0
    }
    if (comp.sold.length > 0) {
        for (let i = comp.sold.length-1; i >=0; i--) {
            const cd = new Date(comp.sold[i].orderDate)
            const ed = extractDate(cd)
            if (isDateInPastWeek(cd)) {
                d.week += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
                d.month += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
                d.year += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
            }
            else if (isDateInPastMonth(cd)) {
                d.month += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
                d.year += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
            }
            else if (isDateInPastYear(cd)) {
                d.year += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
            }

            if (data.length > 0) {
                if (data[data.length - 1].date === ed) {
                    data[data.length - 1].sales += Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
                }
                else {
                    data.push({
                        date: ed,
                        sales: Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
                    })
                }
            } else {
                data.push({
                    date: ed,
                    sales: Math.floor(comp.sold[i].quantity * comp.sold[i].product.price * (100 - comp.sold[i].product.margin) / 100)
                })
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='CompanyHomePage'>
            <div className="CompanyAdvertiseSeller" style={isScrolled ? { height: '95px' } : { height: '120px' }}>
                <img src={logo} alt="" />
                <div className="SelllerBrandName"><span>Velvet Home's Seller's Page</span></div>
            </div>
            <div className="CompanyHomeMainContent" onScroll={handleScroll} style={isScrolled ? { height: '621px' } : { height: '596px' }}>
                <div className='TypingEffectCon'>
                    <TypingEffect
                        words={quotes}
                        styles={{
                            color: '#3F2305',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '95%',
                            height: '80px',
                            fontSize: '30px',
                            backgroundColor: '#F0EFEF',
                            border: '5px solid black',
                            padding: '10px', borderRadius: '20px',
                            margin: '5px'
                        }} />
                </div>
                <div className="CompDetails">
                    <div className="CHPcardCon">
                        <div className="CHPImage">
                            <img src="https://cdn-icons-png.flaticon.com/512/5309/5309779.png" className='CHPImgCon' alt="" />
                        </div>
                        <div className="CHPcard">
                            <div className="CHPcardMain">
                                <div className="CHPcardMainDiv">
                                    <div className="CHPcardMainDivTitle">{comp.name}</div>
                                </div>
                                <div className="CHPcardMainDiv">
                                    <div className="CHPcardMainDivHead">Email: </div>
                                    <div className="CHPcardMainDivValue">{comp.username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CHPcardCon">
                        <div className="CHPImage">
                            <img src="https://cdn-icons-png.flaticon.com/512/925/925014.png" className='CHPImgCon' alt="" />
                        </div>
                        <div className="CHPcard">
                            <div className="CHPcardMain">
                                <div className="CHPcardMainDiv">
                                    <div className="CHPcardMainDivTitle">Total Turnover</div>
                                </div>
                                <div className="CHPcardMainDiv">
                                    <div className="CHPcardMainDivHead">Business: </div>
                                    <div className="CHPcardMainDivValue">Rs. {comp.totalbus}/-</div>
                                </div>
                                <div className="CHPcardMainDiv">
                                    <div className="CHPcardMainDivHead">From: {comp.date}/{comp.month}/{comp.year}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CompTrackSalesHead" id='CompTrackSalesID'>Track Sales</div>
                <div className="CompTrackSalesMain">
                    <div className="CompTrackSalesDiv">
                        <div className="CHPcardCon">
                            <div className="CHPImage">
                                <img src="https://cdn-icons-png.flaticon.com/512/2311/2311838.png" className='CHPImgCon' alt="" />
                            </div>
                            <div className="CHPcard">
                                <div className="CHPcardMain">
                                    <div className="CHPcardMainDiv">
                                        <div className="CHPcardMainDivTitle">Sales(this week)</div>
                                    </div>
                                    <div className="CHPcardMainDiv">
                                        <div className="CHPcardMainDivTitle">Rs. {d.week}/-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="CHPcardCon">
                            <div className="CHPImage">
                                <img src="https://cdn-icons-png.flaticon.com/128/3133/3133463.png" className='CHPImgCon' alt="" />
                            </div>
                            <div className="CHPcard">
                                <div className="CHPcardMain">
                                    <div className="CHPcardMainDiv">
                                        <div className="CHPcardMainDivTitle">Sales(this month)</div>
                                    </div>
                                    <div className="CHPcardMainDiv">
                                        <div className="CHPcardMainDivTitle">Rs. {d.month}/-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="CHPcardCon">
                            <div className="CHPImage">
                                <img src="https://cdn-icons-png.flaticon.com/512/2590/2590580.png" className='CHPImgCon' alt="" />
                            </div>
                            <div className="CHPcard">
                                <div className="CHPcardMain">
                                    <div className="CHPcardMainDiv">
                                        <div className="CHPcardMainDivTitle">Sales(this year)</div>
                                    </div>
                                    <div className="CHPcardMainDiv">
                                        <div className="CHPcardMainDivTitle">Rs. {d.year}/-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="SalesChartCon">
                        <SalesChart data={data} />
                    </div>
                </div>
                <div className="CompTrackSalesHead">Recent Orders</div>
                <div className="CompTrackSalesProdsCon">
                    {recentlySold.map((s) => (
                        <div className="CHPprodCard">
                            <img src={s.product.images[0]} alt="" />
                            <div className="CHPprodCardMain">
                                <div className="CHPprodCardMainTitle">{s.product.title}</div>
                                <div className="CHPprodCardMainTitle">
                                    <div className="CHPprodCardMainTitleHead">Quantity Sold: </div>
                                    <div className="CHPprodCardMainTitleVal">{s.quantity}</div>
                                </div>
                                <div className="CHPprodCardMainTitle">
                                    <div className="CHPprodCardMainTitleHead">Order Date: </div>
                                    <div className="CHPprodCardMainTitleVal">{extractDate(new Date(s.orderDate))}</div>
                                </div>
                                <div className="CHPprodCardMainTitle">
                                    <div className="CHPprodCardMainTitleHead">Delivery Status: </div>
                                    <div className="CHPprodCardMainTitleVal">{s.status}</div>
                                </div>
                                <div className="CHPprodCardMainTitle">
                                    <div className="CHPprodCardMainTitleHead">Turn Over: </div>
                                    <div className="CHPprodCardMainTitleVal">Rs. {Math.floor(s.quantity*s.product.price * (100 - s.product.margin) / 100)}/-</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
