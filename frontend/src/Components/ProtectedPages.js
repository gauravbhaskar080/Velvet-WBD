import React from 'react'
import { useSelector } from 'react-redux'
import ShowProduct from '../Screens/ShowProduct';
import BNBill from '../Screens/BNBill';
import Cart from '../Screens/Cart';
import PinfoCustomer from '../Screens/PinfoCustomer';
import CompanyHome from '../Screens/companyHome';
import CompanyLogin from '../Screens/Company_Login';
import AdminHome from '../Screens/AdminHome';
import AdminLogin from '../Screens/AdminLogin';
import CustomerLogin from '../Screens/CustomerLogin';

const ProtectedPages = ({ component }) => {
    const isCustomerLoggedIn = useSelector(state => state.isCustomerLoggedIn);
    const isSellerLoggedIn = useSelector(state => state.isSellerLoggedIn);
    const isAdminLoggedIn = useSelector(state => state.isAdminLoggedIn);
    return (
        <>
            {(component === "ShowProduct" || component === "BNBill" || component === "Cart" || component === "pinfo") && <>
                {isCustomerLoggedIn ? <>
                    {component === "ShowProduct" && <ShowProduct />}
                    {component === "BNBill" && <BNBill />}
                    {component === "Cart" && <Cart />}
                    {component === "pinfo" && <PinfoCustomer />}
                </> : <>
                    <CustomerLogin show={true} />
                </>}
            </>}
            {(component === "CompanyHome" || component === "CompanyAllProducts" || component === "CompanyNewProduct") && <>
                {isSellerLoggedIn ? <>
                    {component === "CompanyHome" && <CompanyHome element="Home" />}
                    {component === "CompanyAllProducts" && <CompanyHome element="Allprod" />}
                    {component === "CompanyNewProduct" && <CompanyHome element="Newprod" />}
                </> : <>
                    <CompanyLogin show={true} />
                </>}
            </>}
            {(component === "AdminHome" || component === "AdminAllCust" || component === "AdminAllComp" || component === "AdminAllDel") && <>
                {isAdminLoggedIn ? <>
                    {component === "AdminHome" && <AdminHome element="home" />}
                    {component === "AdminAllCust" && <AdminHome element="allcust" />}
                    {component === "AdminAllComp" && <AdminHome element="allcomp" />}
                    {component === "AdminAllDel" && <AdminHome element="admindel" />}
                </> : <>
                    <AdminLogin show={true} />
                </>}
            </>}
        </>
    )
}

export default ProtectedPages
