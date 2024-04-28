
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import '../stylesheets/BNBill.css';
import CustomerNavBar from "../Components/CustomerNavBar";

export default function BNBill() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [element, setElement] = useState({
    title: '',
    price: 0,
    quantity: 0,
    images: '',
  });
  const [qty, setQty] = useState(1);
  const [show, setShow] = useState(false);
  const [discount, setDiscount] = useState(1);
  const [showDc, setShowDc] = useState(false);
  const [message, setMessage] = useState('This is a test message');
  const [code, setCode] = useState('');

  const applyCode = async () => {
    if (code.length === 0) {
      setShowDc(true);
      setMessage('Please Enter Code To Be Applied');
    } else {
      const response = await fetch(
        'http://localhost:5000/velvethomes/customer/validcode',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            username: localStorage.getItem('customerUsername'),
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setShowDc(true);
        setMessage(json.message);
        setDiscount(parseInt(json.discountpercent));
      } else {
        setShowDc(true);
        setMessage(json.message);
      }
    }
  };

  const placeOrder = async function () {
    const response = await fetch(
      'http://localhost:5000/velvethomes/customer/placeorder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          username: localStorage.getItem('customerUsername'),
          quantity: qty,
          discount: discount,
          couponcode: discount === 1 ? 'none' : code,
        }),
      }
    );
    const json = await response.json();
    if (json.status) {
      navigate('/velvethomes/pinfo');
    } else {
      alert(json.message);
    }
  };

  const fetchData = async function () {
    const response = await fetch(
      'http://localhost:5000/velvethomes/customer/productdetails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oid: id,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      setElement({
        title: json.object.title,
        price: json.object.price,
        quantity: json.object.quantity,
        images: json.object.images[0],
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.value > element.quantity) {
      setShow(true);
      setQty(element.quantity);
    } else {
      setShow(false);
      setQty(e.target.value);
      if (e.target.value < 0) setQty(0);
    }
  };

  return (
    <div className='BNB-main'>
      <CustomerNavBar />
      <TableContainer component={Paper} className='BNB-table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Rate (in Rs.)</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1.</TableCell>
              <TableCell>
                <img
                  src={element.images}
                  className='BNB-product-img'
                  alt=''
                />
                <div className='BNB-product-title' style={{textAlign:"center"}}>{element.title}</div>
              </TableCell>
              <TableCell sx={{fontSize:"1.2rem"}}>{element.price}/-</TableCell>
              <TableCell>
                <TextField
                  type='number'
                  className='BNB-quantity-input'
                  value={qty}
                  onChange={handleChange}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
                {show && (
                  <Typography className='BNB-alert'>
                    **Only {element.quantity} Units Available..
                  </Typography>
                )}
              </TableCell>
              <TableCell sx={{fontSize:"1.2rem"}}>{qty * element.price}/-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Discount :</TableCell>
              <TableCell>{discount} %</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell sx={{fontWeight:"bold"}}>SubTotal :</TableCell>
              <TableCell>Rs. {qty * element.price}/-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Discount Amount :</TableCell>
              <TableCell>
                - Rs. {Math.ceil(discount * qty * element.price) / 100}/-
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell sx={{fontWeight:"bold",fontSize:"large"}} >Total :</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"green",fontSize:"large"}}>
                Rs. {Math.floor((100 - discount) * qty * element.price) / 100}/-
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className='BNB-btn-con'>
        <TextField
          type='text'
          className='BNBdc'
          value={code}
          onChange={(evt) => {
            setShowDc(false);
            setDiscount(1);
            setCode(evt.target.value);
          }}
          placeholder='Enter discount code'
          inputProps={{ style: { textAlign: 'center' } }}
        />
        <Button
          className='BNBdcsearch'
          onClick={applyCode}
          variant='contained'
          style={{fontSize:"12px",backgroundColor:"black",marginTop:"15px"}}
        >
          Check
        </Button>
      </div>
      {showDc && (
        <Typography
          className='coupon-code-message'
          style={{ textAlign: 'right', fontSize: '14px', color: '#3D0C11' }}
        >
          **{message}
        </Typography>
      )}
      <div className='BNB-btn-con'>
        <Button
   
          onClick={placeOrder}
          variant='contained'
          style={{fontSize:"12px",margin:"10px",backgroundColor:"black"}}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
