import React, { useState } from 'react'
import AddNewProduct from "./AddNewProduct";
import '../stylesheets/AddProductLoop.css'
import { useNavigate } from "react-router-dom";

function AddProductLoop() {
  const [loopSize, setLoopSize] = useState(1);
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  let navigate = useNavigate();
  const addItem = () => { setLoopSize(loopSize + 1) };
  const removeItem = () => {
    if (loopSize > 1) {
      setLoopSize(loopSize - 1)
    }
  };
  const submit = () => {
    setIsSubmitForm(!isSubmitForm);
    setLoopSize(1);
    navigate(`/velvethomes/seller/allproducts`);
  }
  return (
    <>
      <div className='addProductMain'>
        <div className="add-product-loop">
          {[...Array(loopSize)].map((_, index) => (
            <AddNewProduct key={index} isSubmitForm={isSubmitForm} submit={submit}/>
          ))}
        </div>
        <div className='addItemButtonMain' >
          <button onClick={removeItem} className='addItemButton'>-</button>
          <button onClick={addItem} className='addItemButton'>+</button>
        </div>
        <div className='SubmitCon'>
          <button className='submitForm' onClick={submit}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default AddProductLoop