import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./Reducers/AuthSlice";
import swal from "sweetalert";
export default function NavBar(props) {
  const userName = useSelector((state) => state.auth.user?.name);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = props;

  const checkLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect the user or show an error message
      swal("Error", "You must be logged in to add items to the cart.", "error");
      // Example: Redirect to the login page after 3 seconds
      setTimeout(() => {
        navigate("/AuthForm");
      }, 3000);
    } else {
      // User is logged in, proceed to the cart
      // Example: Redirect to the cart page
      navigate("/cart");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/AuthForm");
  };

  return (
    <div>
      <header>
        <div class="header-main">
          <div class="container">
            <a href="#" class="header-logo">
              ShoopingMarket
            </a>
            <nav class="desktop-navigation-menu ">
              <div class="container">
                <ul class="desktop-menu-category-list">
                  <li class="menu-category">
                    <a href="/" class="menu-title">
                      Home
                    </a>
                  </li>

                  <li class="menu-category">
                    <a href="/productlist" class="menu-title">
                      All Products
                    </a>
                  </li>

                  <li class="menu-category">
                    <a href="/productlist" class="menu-title">
                      Men's
                    </a>
                  </li>

                  <li class="menu-category">
                    <a href="/productlist" class="menu-title">
                      Women's
                    </a>
                  </li>

                  <li class="menu-category">
                    <a href="/productlist" class="menu-title">
                      Jewelry
                    </a>
                  </li>

                  <li class="menu-category">
                    <a href="/productlist" class="menu-title">
                      Perfume
                    </a>
                  </li>

                  <li class="menu-category">
                    <a href="#" class="menu-title" >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <div class="header-user-actions">
              <button class="action-btn" onClick={checkLocalStorage}>
                <ion-icon name="cart-outline"></ion-icon>
                <span class="count">{cartCount}</span>
              </button>
              {isLoggedIn && userName ? (
                <>
                  <button class="action-btn">
                    <ion-icon name="person-outline"></ion-icon>
                    <span
                      style={{
                        fontSize: "20px",
                        position: "absolute",
                        right: "-5px",
                      }}
                    >
                      {userName}
                    </span>
                  </button>
                  <button className="banner-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="banner-btn">
                    <Link style={{ color: "white" }} to="/AuthForm">
                      Login
                    </Link>
                  </button>
                </>
              )}{" "}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
