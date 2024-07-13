import React, { useEffect, useState } from 'react'
import video from './video-home.mp4'
import '../stylesheets/home.css'
import HomeRightDesign from '../Components/HomeRightDesign'
import HomeLeftDesign from '../Components/HomeLeftDesign'
import CustomerNavBar from '../Components/CustomerNavBar'
import Footer from "../Components/Footer";
import { BASE_URL } from '../api'
import loader from "../Pictures/loader.gif";


export default function Home() {
  const [prods,setProds] = useState([]);
  const [showLoader,setShowLoader] = useState(true);
  const fetchData = async()=>{
    const response = await fetch(
      `${BASE_URL}/velvethomes/customer/home`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const json = await response.json();
    if(json.success){
      setProds(json.objects);
      // console.log(json.objects)
      setShowLoader(false);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
        <CustomerNavBar />
        <div className='vidcon'>
            <video autoPlay muted loop playsInline id='homevideo'>
                <source src={video}/>
            </video>
        </div>
        <h1><div className="quotes">Experience the power of exceptional design.</div></h1>
        {showLoader ? <div className="AdminLoadercon">
                <img src={loader} alt='' className='AdminLoader' />
                <span className='AdminLoaderText'>
                    Velvet Home's Products are Loading...
                </span>
            </div> :
            <div className='HomeElementsMain'>
                {prods.length>0 && prods.map((m,ind)=>{
                  if(ind%2===0){
                    return <HomeRightDesign key={ind} title={m.title} ind={ind} products={m.products} openid={m.openid} dimg={m.designimg} />
                  }
                  return<HomeLeftDesign key={ind} title={m.title} ind={ind} products={m.products} openid={m.openid} dimg={m.designimg} />
                })}
            </div>}
            <Footer/>
    </>
  )
}
