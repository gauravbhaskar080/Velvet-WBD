
import React from 'react'
import "../stylesheets/companyHome.css";
// import SalesChart from './SalesChart';
import AddNewProduct from './AddNewProduct';
import CompanyHomePage from './CompanyHomePage';
import CompanyAllProducts from './CompanyAllProducts';

export default function CompanyHomeMain({element}) {
    
    return (
        <div
            className="cm-main-main"
            style={{
                width: "80%",
                height: "100%",
                border: "1px solid black",
                marginTop: "1%",
                overflowY: "scroll"
            }}
        >

            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: "#C38154"
            }}>

                {element==="Home" && <CompanyHomePage/>}
                {element==="Allprod" && <CompanyAllProducts/>}
                {element==="Newprod" && <AddNewProduct/>}
            </div>
        </div>
    )
}
