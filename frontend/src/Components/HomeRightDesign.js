import React from 'react'
import {Link} from 'react-router-dom';
import "../stylesheets/category.css"
import logo from '../logo.jpeg'
import HomeProductCard from './HomeProductCard';

export default function HomeRightDesign({title,dimg,ind,products,openid}) {
    const nextLink = title==='Artifacts' || title==="Paints" ? `/velvethomes/showallprodsubcat/${openid}` : `/velvethomes/showprodcat/${openid}`
    return (
      <div style={{width: '100%'}}>
        <h2 className="head"><Link to={nextLink} className='head-link'>{title}</Link></h2>
        <div className="bigcon">
          <div className="container">
              {products.map((prod,ind)=>{
                return <HomeProductCard product={prod}/>
              })}
          </div>
          <div className="advertise">
              <img src={dimg} className="adver adver-right" alt="" />
              <div className="overlay">
              <Link to={nextLink}>
                      <div className="text">
                          <div><img src={logo} alt="" /></div>
                          <div>Velvet Homes</div>
                          <div>( {title} )</div>
                      </div>
                  </Link>
                  </div>
              </div>
      </div>
      </div>
    )
}
