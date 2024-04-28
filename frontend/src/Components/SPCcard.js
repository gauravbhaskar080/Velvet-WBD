import React from 'react'
import "../stylesheets/SPCcard.css"
import { useNavigate } from 'react-router-dom';

export default function SPCcard({evt}) {
  const navigate = useNavigate();
  return (
    <div className='SPCcard1'>
        <img src={evt.showtopimg} className='SPCcardImg' alt="" />
        <div className="SPCdetails">
          <button 
            class="custom-btn btn-12"
            onClick={()=>navigate(`/velvethomes/showallprodsubcat/${evt._id}`)}
          >
            <span>See More..</span><span>{evt.title}</span>
          </button>
        </div>
    </div>
  )
}
