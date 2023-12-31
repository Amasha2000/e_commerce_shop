import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
       <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route path="/productlist/:category" element={<ProductList/>} /> 
          <Route path="/product/:id" element={<Product/>} /> 
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} /> 
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} /> 
          <Route path="/cart" element={<Cart/>} /> 
          <Route path="/success" element={<Success/>} /> 
       </Routes>
    </Router>
  );
}

export default App;
