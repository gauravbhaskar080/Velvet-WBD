import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function RatingProduct() {
  const starIcon = <StarIcon style={{ color: 'black',fontSize: '25px' }} />;
  const emptyStarIcon = <StarBorderIcon style={{ color: 'black' ,fontSize: '25px'}} />;
  const [ratingValue, setRatingValue] = useState(3.5)
  return (

    <div style={{marginTop: '5px', width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <div style={{width: '50%'}}>
        <Rating
          name="half-rating-read"
          defaultValue={ratingValue}
          precision={0.5}
          readOnly
          emptyIcon={emptyStarIcon}
          icon={starIcon}
        />
      </div>
      <div 
        style={{width: '45%',display: 'flex',justifyContent: 'flex-end',fontSize: '20px',color: '#333',textDecoration: 'underline'}}>0 reviews</div>
    </div>
  )
}
