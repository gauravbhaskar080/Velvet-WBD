import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Screens/Home";
import CompanyLogin from "./Screens/Company_Login";
import ShowProdSubCat from "./Screens/ShowProdSubCat";
import ShowProdCategory from "./Screens/ShowProdCategory";
import AdminLogin from "./Screens/AdminLogin";
import CustomerNavBar from "./Components/CustomerNavBar";
import ProtectedPages from "./Components/ProtectedPages";
import CustomerLogin from "./Screens/CustomerLogin";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/velvethomes" element={<CustomerNavBar />} />
          <Route exact path="/login" element={<CustomerLogin />}/>
          <Route exact path="/velvethomes/prodsubcat/tile" element={<Home />} />
          <Route exact path="/velvethomes/showprodcat/:id" element={<ShowProdCategory />} />
          <Route exact path="/velvethomes/showallprodsubcat/:id" element={<ShowProdSubCat />} />
          <Route exact path="/velvethomes/showproduct/:id" element={<ProtectedPages component={"ShowProduct"} />} />
          <Route exact path="/velvethomes/bill/:id" element={<ProtectedPages component={"BNBill"} />} />
          <Route exact path="/velvethomes/cart" element={<ProtectedPages component={"Cart"} />} />
          <Route exact path="/velvethomes/pinfo" element={<ProtectedPages component={"pinfo"} />} />
          <Route exact path="/velvethomes/seller/login" element={<CompanyLogin />} />
          <Route exact path="/velvethomes/seller/home" element={<ProtectedPages component={"CompanyHome"} />} />
          <Route exact path="/velvethomes/seller/allproducts" element={<ProtectedPages component={"CompanyAllProducts"} />} />
          <Route exact path="/velvethomes/seller/newproduct" element={<ProtectedPages component={"CompanyNewProduct"} />} />
          <Route exact path="/velvethomes/admin/login" element={<AdminLogin />} />
          <Route exact path="/velvethomes/admin/home" element={<ProtectedPages component={"AdminHome"} />} />
          <Route exact path="/velvethomes/admin/allcust" element={<ProtectedPages component={"AdminAllCust"} />} />
          <Route exact path="/velvethomes/admin/allcomp" element={<ProtectedPages component={"AdminAllComp"} />} />
          <Route exact path="/velvethomes/admin/admindel" element={<ProtectedPages component={"AdminAllDel"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
