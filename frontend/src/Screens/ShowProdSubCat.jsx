import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import "../stylesheets/ShowProdSubCat.css"
import SAECard from '../Components/SAECard';
import CustomerNavBar from '../Components/CustomerNavBar'

export default function ShowProdSubCat() {
    const { id } = useParams();
    const [subcat, setSubcat] = useState({
        title: "",
        category: "",
        dispimg: "",
        filtersKeys: [],
        filtersValues: []
    })
    const [prods, setProds] = useState([])
    const [show, setShow] = useState([])
    const [open, setOpen] = useState(0)
    const [fil, setFil] = useState({ key: [], values: [] })

    const fetchData = async function () {
        const response = await fetch(
            "http://localhost:5000/velvethomes/customer/showallsubcat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            }
        );
        const json = await response.json();
        if (json.success) {
            setSubcat({
                title: json.subcategory.title,
                category: json.subcategory.category,
                dispimg: json.subcategory.dispimg,
                filtersKeys: Object.keys(json.subcategory.filters),
                filtersValues: Object.values(json.subcategory.filters)
            })
            setProds(json.allitems)
            setShow(json.allitems)
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const arr = [];
        for (let i = 0; i < prods.length; i++) {
            const keys = Object.keys(prods[i].features)
            const values = Object.values(prods[i].features)
            // console.log(keys, values)
            for (let j = 0; j < fil.key.length; j++) {
                const ind = keys.indexOf(fil.key[j])
                // console.log(ind)
                if (ind !== -1) {
                    // console.log(values[ind],fil.values)
                    if (fil.values[j].indexOf(values[ind]) !== -1) {
                        arr.push(prods[i])
                        // console.log(arr)
                    }
                }
            }
        }
        const uniqueArray = arr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        // console.log(uniqueArray)
        if (uniqueArray.length === 0) {
            setShow(prods)
        } else {
            setShow(uniqueArray)
        }
    }, [fil])


    const handleFilter = (e, val) => {
        const ind = fil.key.indexOf(e);
        if (ind !== -1) {
            const i = fil.values[ind].indexOf(val);
            // console.log(i)
            if (i !== -1) {
                console.log("here")
                const arr = fil.values;
                const brr = fil.key;
                console.log(arr[ind])
                arr[ind] = arr[ind].filter((va, index) => {
                    console.log(va === val)
                    return va !== val;
                })
                console.log(arr)
                if (arr[ind].length === 0) {
                    arr.filter((va, index) => {
                        return index !== ind;
                    })
                    brr.filter((va, index) => {
                        return index !== ind
                    })
                }
                setFil({ key: brr, values: arr })
            }
            else {
                const arr = fil.values;
                arr[ind].push(val);
                setFil({ ...fil, values: arr })
            }
        } else {
            const k = fil.key
            const v = fil.values
            k.push(e);
            v.push([val])
            setFil({ key: k, values: v })
        }
    }
    return (
        <div className='sap-big-con'>
            <CustomerNavBar />
            <img src={subcat.dispimg} className='sap-dispimg' alt="" />
            <div className="sap-title"><span>{subcat.title}</span></div>

            <div className="sap-main">
                <div className="sap-filters">
                    {subcat.filtersKeys?.map((e, i) => (
                        <div className="filter-div">
                            <div className="sap-filter-div-title" onClick={() => setOpen(i)} key={i}>
                                {e}
                                {open === i ? (
                                    <span
                                        style={{
                                            fontSize: "medium",
                                            fontWeight: "bolder",
                                            fontFamily: "Arial, sans-serif",
                                        }}
                                    >
                                        &#x2013;
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            fontSize: "medium",
                                            fontFamily: "Arial, sans-serif",
                                        }}
                                    >
                                        &#43;
                                    </span>
                                )}
                            </div>
                            <div className="line"></div>
                            {subcat.filtersValues[i]?.map((val, ind) => (
                                <div style={{
                                    display: open !== i && 'none'
                                }} className="sap-filter-val" key={ind}>
                                    <input
                                        type='checkbox'
                                        onChange={() => handleFilter(e, val)}
                                        id={i * 100 + ind}
                                    />
                                    <label htmlFor={i * 100 + ind}>{val}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="sap-prods">
                    {show?.map((e, i) => (
                        <SAECard product={e} />
                    ))}
                </div>
            </div>
        </div>
    )
}
