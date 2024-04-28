import React,{useState} from 'react'
import "../stylesheets/AddNewProduct.css"
import { useNavigate } from 'react-router-dom';

export default function AddNewProduct() {
    let navigate = useNavigate();
    const [formData,setFormData] = useState({
        cnpTitle: "",
        cnpCat: "Tiles",
        cnpSubcat: "Living Room Floor Tiles",
        cnpQuantity: 0,
        cnpPrice: 0,
        cnpDes: "",
        cnpImages: [""],
        cnpKeyPoints: [""],
        cnpFeaturesKeys: [""],
        cnpFeaturesValues: [""]
    })

    const handleCatChange = (e)=>{
        if(e.target.value==="Paints"){
            setFormData({...formData,cnpCat: e.target.value,cnpSubcat: ""});
        }else if(e.target.value==="Furniture"){
            setFormData({...formData,cnpCat: e.target.value,cnpSubcat: "Sofa"});
        }else if(e.target.value==="Tiles"){
            setFormData({...formData,cnpCat: e.target.value,cnpSubcat: "Living Room Floor Tiles"});
        }else if(e.target.value==="Artifacts"){
            setFormData({...formData,cnpCat: e.target.value,cnpSubcat: "Painting"});
        }else{
            setFormData({...formData,cnpCat: e.target.value,cnpSubcat: "Taps"});
        }
    }
    const handleSubCatChange = (e)=>{
        setFormData({...formData,cnpSubcat: e.target.value});
    }
    function handleArrayChange(evt,ind){
        const nd = evt.target.name;
        let newArr
        if(nd==="cnpImages"){
            newArr = formData.cnpImages
        }else if(nd==="cnpKeyPoints"){
            newArr = formData.cnpKeyPoints
        }else if(nd==="cnpFeaturesKeys"){
            newArr = formData.cnpFeaturesKeys;
        }else{
            newArr = formData.cnpFeaturesValues
        }
        newArr[ind] = evt.target.value;
        setFormData({...formData,[nd]: newArr})
    }
    async function handleNewElementSubmit(evt){
        evt.preventDefault();
        const newArrayKeys = formData.cnpFeaturesKeys
        const newArrayValues = formData.cnpFeaturesValues
        let s = formData.cnpSubcat
        if(formData.cnpCat==="Paints"){
            newArrayKeys.push('Color')
            newArrayValues.push(formData.cnpSubcat)
            s = "Paints"
        }else if(formData.cnpCat==="Artifacts"){
            newArrayKeys.push('Artifact Type')
            newArrayValues.push(formData.cnpSubcat)
            s = "Artifacts"
        }
        const response = await fetch(
            "http://localhost:5000/velvethomes/seller/addnewprod",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: formData.cnpTitle,
                price: formData.cnpPrice,
                quantity: formData.cnpQuantity,
                description: formData.cnpDes,
                companyusername: localStorage.getItem("userEmail"),
                images: formData.cnpImages,
                key_points: formData.cnpKeyPoints,
                features_keys: newArrayKeys,
                features_values: newArrayValues,
                subcategory: s
              }),
            }
          );
          const json = await response.json();
          if (json.success) {
            const id = json._id;
            navigate(`velvethomes/seller/allproducts`);
          }
    }
  return (
    <div className='cnp-body-wrapper'>
      <form action="" onSubmit={handleNewElementSubmit} className='cnp-body-form'>
        <h1 style={{color:"black"}}>Add a new product</h1>
        <div className='cnp-wrapper'>
            <label htmlFor="cnp-title">Title Of The Product : </label>
            <input 
                type="text" 
                name="cnpTitle" 
                value={formData.cnpTitle} 
                id='cnp-title' 
                onChange={(e)=>{
                    setFormData({...formData,cnpTitle: e.target.value})
                }}
            />
        </div>
        <div className='cnp-wrapper'>
            <div className="cnp-l-wrapper">
            <label htmlFor="cnp-category">Category Of The Product : </label>
            <select 
                name="cnpCat" 
                id="cnp-category" 
                value={formData.cnpCat}
                onChange={handleCatChange}
            >
                    <option value="Tiles">Tiles</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Sanitary">Sanitary Product</option>
                    <option value="Artifacts">Artifacts</option>
                    <option value="Paints">Paints</option>
            </select>
            </div>
        </div>
        <div className="cnp-wrapper">
            <div>
        <label htmlFor="cnp-subcat">{formData.cnpCat==='Paints' ? 'Enter Color Of Paint : ' : 'Select The Subcategory : '}</label>
            {formData.cnpCat==='Tiles'  &&
                <select name="cnpSubcat" value={formData.cnpSubcat} onChange={handleSubCatChange}  id="cnp-subcat">
                    <option value="Living Room Floor Tiles">Living Room Floor Tiles</option>
                    <option value="Bed Room Floor Tiles">Bed Room Floor Tiles</option>
                    <option value="Bath Room Floor Tiles">Bath Room Floor Tiles</option>
                    <option value="Kitchen Floor Tiles">Kitchen Floor Tiles</option>
                    <option value="Living Room Wall Tiles">Living Room Wall Tiles</option>
                    <option value="Bed Room Wall Tiles">Bed Room Wall Tiles</option>
                    <option value="Bath Room Wall Tiles">Bath Room Wall Tiles</option>
                    <option value="Kitchen Wall Tiles">Kitchen Wall Tiles</option>
                </select>
            }
            {
                formData.cnpCat==='Furniture'  &&
                <select name="cnpSubcat" value={formData.cnpSubcat} onChange={handleSubCatChange} id="cnp-subcat">
                    <option value="Sofa">Sofa</option>
                    <option value="Beds">Beds</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Tables">Tables</option>
                    <option value="Cabinets">Cabinets</option>
                    <option value="Dinning Tables">Dinning Tables</option>
                    <option value="Almirah">Almirah</option>
                    <option value="Shoe Storage">Shoe Storage</option>
                </select>
            }
            {
                formData.cnpCat==='Sanitary'  &&
                <select name="cnpSubcat" value={formData.cnpSubcat} onChange={handleSubCatChange} id="cnp-subcat">
                    <option value="Taps">Taps</option>
                    <option value="Toilets">Toilets</option>
                    <option value="Urinals">Urinals</option>
                    <option value="Shower">Shower</option>
                    <option value="BathTubs">Bath Tubs</option>
                    <option value="WashBasin">WashBasin</option>
                    <option value="Kitchen Sinks">Kitchen Sinks</option>
                    <option value="Bath Accessroies">Bath Accessories</option>
                </select>
            }
            {
                formData.cnpCat==='Artifacts'  &&
                <select name="cnpSubcat" value={formData.cnpSubcat} onChange={handleSubCatChange} id="cnp-subcat">
                    <option value="Painting">Painting</option>
                    <option value="Chandelliers">Chandelliers</option>
                    <option value="Flower Pots">Flower Pots</option>
                    <option value="Wall Clocks">Wall Clocks</option>
                    <option value="Sculptures">Sculptures</option>
                </select>
            }
            </div>
            {
                formData.cnpCat==='Paints'  &&
                <input type="text" name='cnpSubcat' value={formData.cnpSubcat} onChange={handleSubCatChange} id='snp-subcat' placeholder='Enter Color Of Paint'/>
            }
        </div>
        <div className="cnp-wrapper">
            <label htmlFor="cnp-quantity">Enter The Quantity of Product Available : </label>
            <input type="number" name='cnpQuantity' onChange={(e)=>setFormData({...formData,cnpQuantity: e.target.value})} value={formData.cnpQuantity} id='cnp-quantity'/>
        </div>
        <div className="cnp-wrapper">
            <label htmlFor="cnp-price">Enter The Price of the Product : </label>
            <input type="number" name='cnpPrice' value={formData.cnpPrice} onChange={(e)=>setFormData({...formData,cnpPrice: e.target.value})}  id='cnp-price'/>
        </div>
        <div className="cnp-wrapper">
            <label htmlFor="cnp-desc">Description Of The Product : </label>
            <textarea name="cnpDes" id="cnp-desc" cols="40" rows="3" value={formData.cnpDes} onChange={(e)=>setFormData({...formData,cnpDes: e.target.value})}></textarea>
        </div>
        <div className="cnp-wrapper">
            <label htmlFor="cnp-img">Give URL Of The Images : </label>
            {formData.cnpImages.map((e,ind)=>(
                <div className='cnpTextWrapperIcon'  style={{display:"flex",alignItems:"center"}}>
                    <input type='text' name='cnpImages' className='cnp-input-icon' style={{marginRight: '0px'}} onChange={(evt)=>handleArrayChange(evt,ind)} value={e} key={ind} />
                    <img src="https://tl.vhv.rs/dpng/s/481-4811206_delete-icon-png-free-download-delete-icon-for.png" onClick={(e)=>{
                        setFormData({
                            ...formData,
                            cnpImages: formData.cnpImages.filter((e,index)=>{
                                return index!==ind;
                            })
                        })
                    }}  className='cnp-icons' alt="" />
            <span className='cnpAddNewBox' onClick={()=>{
                setFormData({...formData,cnpImages: [...formData.cnpImages,""]})
            }}>+</span>
                </div>
            ))}
        </div>
        <div className="cnp-wrapper">
            <label htmlFor="cnp-keyPoints">Give Some Key Points About The Product : </label>
            {formData.cnpKeyPoints.map((e,ind)=>(
                <div className="cnpTextWrapperIcon" style={{display:"flex",alignItems:"center"}}>
                    <input type="text" name='cnpKeyPoints' className='cnp-input-icon' onChange={(evt)=>handleArrayChange(evt,ind)} value={e} key={ind}/>
                    <img src="https://tl.vhv.rs/dpng/s/481-4811206_delete-icon-png-free-download-delete-icon-for.png" style={{height: '27px'}} onClick={(e)=>{
                        setFormData({
                            ...formData,
                            cnpKeyPoints: formData.cnpKeyPoints.filter((e,index)=>{
                                return index!==ind;
                            })
                        })
                    }}    className='cnp-icons' alt="" />
            <span  className='cnpAddNewBox' onClick={()=>{
                setFormData({...formData,cnpKeyPoints: [...formData.cnpKeyPoints,""]})
            }}>+</span>
                </div>
            ))}
        </div>
        <div className="cnp-wrapper">
            <label htmlFor="">Enter Some features Of The Product (e.g: - "color","size","design-type"... )</label>
            <div className="cnp-feature">
                {
                    formData.cnpFeaturesKeys.map((e,ind)=>{
                        return <div className='cnpTextWrapperIcon'  style={{display:"flex",alignItems:"center"}}>
                            <input type="text" value={e} className='cnp-key' onChange={(evt)=>handleArrayChange(evt,ind)} style={{border: '1px solid black'}} name='cnpFeaturesKeys'/> : 
                            <input type="text" value={formData.cnpFeaturesValues[ind]} onChange={(evt)=>handleArrayChange(evt,ind)} style={{border: '1px solid black'}} className='cnp-value' name='cnpFeaturesKeysValues'/>
                            <img src="https://tl.vhv.rs/dpng/s/481-4811206_delete-icon-png-free-download-delete-icon-for.png" style={{height: '27px'}} onClick={(e)=>{
                        setFormData({
                            ...formData,
                            cnpFeaturesKeys: formData.cnpFeaturesKeys.filter((e,index)=>{
                                return index!==ind;
                            }),
                            cnpFeaturesValues: formData.cnpFeaturesValues.filter((e,index)=>{
                                return index!==ind;
                            })
                        })
                    }}   className='cnp-icons' alt="" />
                <span className='cnpAddNewBox' onClick={()=>{
                    setFormData({...formData,cnpFeaturesKeys: [...formData.cnpFeaturesKeys,""],cnpFeaturesValues: [...formData.cnpFeaturesValues,""]})
                }}>+</span>
                        </div>
                    })
                }
            </div>
        </div>
        <button className='cnp-btn'>Register</button>
      </form>
    </div>
  )
}