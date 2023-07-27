// import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
    {admin && <Topbar />} 
      <Routes>
        <Route path="/login" element={admin ? <Navigate to="/" /> : <Login/>} />
        {!admin ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
          </>
        )}
      </Routes>
  </Router>
  );
}

export default App;
