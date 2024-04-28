import React, { useState } from 'react'
import "../stylesheets/SAECard.css"
import RatingProduct from './RatingProduct'
import { useNavigate } from 'react-router-dom';

export default function SAECard({product}) {
    const navigate = useNavigate();
    let x = Math.min(25,product.title.length)
    const t = product.title.slice(0,x)
    
    
  return (
    <div className='SAECard'>
      <img src={product.images[0]} className='SAEImage' alt="" />
      <div className="SAE-title">{t}{x<product.title.length && "..."}</div>
      <RatingProduct/>
      <div className="SAE-price">
        <div className="SAE-price-title">Price : </div>
        <div className="SAE-price-value">Rs. {product.price}</div>
      </div>
      <div 
        onClick={()=>navigate(`/velvethomes/showproduct/${product._id}`)}
        className="SAE-btn"
    >Buy Now</div>
    </div>
  )
}
