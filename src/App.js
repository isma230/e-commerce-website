import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./components/AuthForm";
import AuthForm from "./components/AuthForm";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/checkoutform";
import getAxiosConfig from "./components/apiconfig";
axios.defaults.withCredentials = true;
function App() {
  const [cartCount, setCartCount] = useState(0);
  const axiosConfig = getAxiosConfig();
 

  useEffect(() => {
    let isMounted = true;
    axios.get("http://localhost:8000/api/carts", axiosConfig).then((res) => {
      if (isMounted) {
        setCartCount(res.data.length);
      } 
    });
    return () => {
      isMounted = false;
    };
  }, []);  
  
  return (
    <div className="App">
      <NavBar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/AuthForm" element={<AuthForm></AuthForm>} />
        <Route path="/cart" element={<Cart  />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/check" element={<CheckoutForm />} />
      </Routes>
    </div>
  );
}

function DefaultLayout(props) {


  return (
    <>
      <Content  />
      <Footer  />
    </>
  );
}

export default App;
