
import React from 'react'
import AdminHomePage from './AdminHomePage'
import AdminAllCustomers from './AdminAllCustomers'
import AdminAllCompanies from './AdminAllCompanies'
import AdminDeliveries from './AdminDeliveries'

export default function AdminHomeMain({element}) {
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
                backgroundColor: "#ebe8e269"
            }}>

                {element==="home" && <AdminHomePage/>}
                {element==="allcust" && <AdminAllCustomers/>}
                {element==="allcomp" && <AdminAllCompanies/>}
                {element==="admindel" && <AdminDeliveries/>}
                
            </div>
        </div>
  )
}

