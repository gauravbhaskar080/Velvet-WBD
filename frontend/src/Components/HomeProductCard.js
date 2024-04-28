import React from 'react'
import { Link } from 'react-router-dom'
import "../stylesheets/HomeProductCard.css"

export default function HomeProductCard({ product }) {
    console.log(product)
    return (
        <Link to={`/velvethomes/showproduct/${product._id}`}>
            <div class="card">
                <img src={product.images[0]} class="card-img-top" alt="..."/>
                    <div class="overlay-card">
                        <div class="text-1">
                            <span>{ product.category }</span>
                        </div>
                    </div>
            </div>
        </Link>
    )
}
