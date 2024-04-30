import React, {  useState } from "react";
import { BASE_URL } from "../api.js";
import "../stylesheets/CompanyAllProducts.css";

function CompanyCard({o,fetchData}) {
    const [isEdit,setIsEdit] = useState(true);
    const edit =()=>{setIsEdit(!isEdit)}; 
    const [newTitle,setNewTitle] = useState(o.title);
    const [newPrice,setNewPrice] = useState(o.price);
    const [newQuantity,setNewQuantity] = useState(o.quantity);

    const getDateString = (d) => {
        const curr = new Date(d);
        const da = curr.getDate();
        const m = curr.getMonth() + 1;
        const y = curr.getFullYear();
        return `${da < 10 ? "0" : ""}${da}/${m < 10 ? "0" : ""}${m}/${y}`;
      };
    const update = async() =>{
          if(newTitle || newQuantity || newPrice){
               const product ={
                 title:newTitle,
                 price:newPrice,
                 quantity:newQuantity
               }
               try {
                  const res = await fetch(`${BASE_URL}/velvethomes/seller/updateProduct/${o._id}`,{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(product),
                  })
                  if(res.status ===201){
                        fetchData();
                        edit();
                  }
               } catch (error) {
                  console.log(error)
               }
          }
    }
    return (
        <div className="CLPCard">
            <img src={o.images[0]} className="CLPCardImg" alt="" />
            <div className="CLP-Main">
                <hr style={{ color: "black", width: "90%" }} />
                {isEdit?(<div
                    className="CLP-title"
                    style={{ justifyContent: "center" }}
                >
                    {o.title}
                </div>):<input className="editCompanyCard" placeholder="Title" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}}/>}
                <hr style={{ color: "black", width: "90%" }} />
                <div className="CLP-title">
                    <div className="CLP-title-head">Price: </div>
                    {isEdit?(<div className="CLP-title-val">Rs. {o.price}/-</div>):(<input className="editCompanyCard" placeholder="Price" value={newPrice} onChange={(e)=>{setNewPrice(e.target.value)}}/>)}
                </div>
                <div className="CLP-title">
                    <div className="CLP-title-head">Quantity Left: </div>
                    {isEdit?(<div className="CLP-title-val">{o.quantity}</div>):(<input className="editCompanyCard" placeholder="Quntity" value={newQuantity} onChange={(e)=>{setNewQuantity(e.target.value)}}/>)}
                </div>
                <div className="CLP-title">
                    <div className="CLP-title-head">Quantity Sold: </div>
                    <div className="CLP-title-val">{o.quantitySold}</div>
                </div>
                <div className="CLP-title">
                    <div className="CLP-title-head">Registered: </div>
                    <div className="CLP-title-val">
                        {getDateString(o.registered)}
                    </div>
                </div>
                <div className="CLP-card-btn-con">
                    <div className="CLP-card-btn" onClick={edit}>{isEdit?"Edit":"cancle"}</div>
                    {!isEdit && <div className="CLP-card-btn" onClick={update}>update</div>}
                </div>
            </div>
        </div>
    )
}

export default CompanyCard