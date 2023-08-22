import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import getAxiosConfig from "./apiconfig";
function Content(props) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const submitAddtocart = (
    e,
    productId,
    produtName,
    productPrice,
    productDescp,
    productImage
  ) => {
    if (!isLoggedIn) {
      swal("Error", "You must be logged in to add items to the cart.", "error");
      return;
    }
    const axiosConfig = getAxiosConfig();
    const data = {
      product_id: productId,
      quantity: quantity,
      name: produtName,
      price: productPrice,
      description: productDescp,
      image: productImage,
    };

    axios
      .post("http://localhost:8000/api/add-to-cart", data, axiosConfig)
      .then((res) => {
        if (res.data.status === 201) {
          swal("Success", res.data.message, "success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (res.data.status === 409) {
          swal("Success", res.data.message, "success");
        } else if (res.data.status === 404) {
          swal("Warning", res.data.message, "warning");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <main>
        <div class="banner">
          <div class="container">
            <div class="slider-container has-scrollbar">
              <div class="slider-item">
                <img
                  src="assets/images/banner-1.jpg"
                  alt="women's latest fashion sale"
                  class="banner-img"
                />
                <div class="banner-content">
                  <p class="banner-subtitle">Trending item</p>
                  <h2 class="banner-title">Women's latest fashion sale</h2>
                  <p class="banner-text">
                    {" "}
                    starting at &dollar; <b>20</b>.00{" "}
                  </p>
                  <a href="#" class="banner-btn">
                    Shop now
                  </a>
                </div>
              </div>
              <div class="slider-item">
                <img
                  src="assets/images/banner-2.jpg"
                  alt="modern sunglasses"
                  class="banner-img"
                />
                <div class="banner-content">
                  <p class="banner-subtitle">Trending accessories</p>
                  <h2 class="banner-title">Modern sunglasses</h2>
                  <p class="banner-text">
                    {" "}
                    starting at &dollar; <b>15</b>.00{" "}
                  </p>
                  <a href="#" class="banner-btn">
                    Shop now
                  </a>
                </div>
              </div>
              <div class="slider-item">
                <img
                  src="assets/images/banner-3.jpg"
                  alt="new fashion summer sale"
                  class="banner-img"
                />
                <div class="banner-content">
                  <p class="banner-subtitle">Sale Offer</p>
                  <h2 class="banner-title">New fashion summer sale</h2>
                  <p class="banner-text">
                    {" "}
                    starting at &dollar; <b>29</b>.99{" "}
                  </p>
                  <a href="#" class="banner-btn">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="category">
          <div class="container">
            <div class="category-item-container has-scrollbar">
              <div class="category-item">
                <div class="category-img-box">
                  <img
                    src="assets/images/icons/dress.svg"
                    alt="dress & frock"
                    width="30"
                  />
                </div>

                <div class="category-content-box">
                  <div class="category-content-flex">
                    <h3 class="category-item-title">Dress & frock</h3>

                    <p class="category-item-amount">(53)</p>
                  </div>

                  <a href="#" class="category-btn">
                    Show all
                  </a>
                </div>
              </div>

              <div class="category-item">
                <div class="category-img-box">
                  <img
                    src="assets/images/icons/coat.svg"
                    alt="winter wear"
                    width="30"
                  />
                </div>

                <div class="category-content-box">
                  <div class="category-content-flex">
                    <h3 class="category-item-title">Winter wear</h3>

                    <p class="category-item-amount">(58)</p>
                  </div>

                  <a href="#" class="category-btn">
                    Show all
                  </a>
                </div>
              </div>

              <div class="category-item">
                <div class="category-img-box">
                  <img
                    src="assets/images/icons/glasses.svg"
                    alt="glasses & lens"
                    width="30"
                  />
                </div>

                <div class="category-content-box">
                  <div class="category-content-flex">
                    <h3 class="category-item-title">Glasses & lens</h3>

                    <p class="category-item-amount">(68)</p>
                  </div>

                  <a href="#" class="category-btn">
                    Show all
                  </a>
                </div>
              </div>
              <div class="category-item">
                <div class="category-img-box">
                  <img
                    src="assets/images/icons/hat.svg"
                    alt="hat & caps"
                    width="30"
                  />
                </div>

                <div class="category-content-box">
                  <div class="category-content-flex">
                    <h3 class="category-item-title">Hat & caps</h3>

                    <p class="category-item-amount">(39)</p>
                  </div>

                  <a href="#" class="category-btn">
                    Show all
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="product-container">
          <div class="container">
            <div class="product-box">
              <div class="product-minimal">
                <div class="product-showcase">
                  <div class="showcase-wrapper has-scrollbar">
                    <div class="showcase-container">
                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/clothes-1.jpg"
                            alt="relaxed short full sleeve t-shirt"
                            width="70"
                            class="showcase-img"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Relaxed Short full Sleeve T-Shirt
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Clothes
                          </a>

                          <div class="price-box">
                            <p class="price">$45.00</p>
                            <del>$12.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/clothes-2.jpg"
                            alt="girls pink embro design top"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Girls pnk Embro design Top
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Clothes
                          </a>

                          <div class="price-box">
                            <p class="price">$61.00</p>
                            <del>$9.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/clothes-3.jpg"
                            alt="black floral wrap midi skirt"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Black Floral Wrap Midi Skirt
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Clothes
                          </a>

                          <div class="price-box">
                            <p class="price">$76.00</p>
                            <del>$25.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/shirt-1.jpg"
                            alt="pure garment dyed cotton shirt"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Pure Garment Dyed Cotton Shirt
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Mens Fashion
                          </a>

                          <div class="price-box">
                            <p class="price">$68.00</p>
                            <del>$31.00</del>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="showcase-container">
                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/jacket-5.jpg"
                            alt="men yarn fleece full-zip jacket"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              MEN Yarn Fleece Full-Zip Jacket
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Winter wear
                          </a>

                          <div class="price-box">
                            <p class="price">$61.00</p>
                            <del>$11.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/jacket-1.jpg"
                            alt="mens winter leathers jackets"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Mens Winter Leathers Jackets
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Winter wear
                          </a>

                          <div class="price-box">
                            <p class="price">$32.00</p>
                            <del>$20.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/jacket-3.jpg"
                            alt="mens winter leathers jackets"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Mens Winter Leathers Jackets
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Jackets
                          </a>

                          <div class="price-box">
                            <p class="price">$50.00</p>
                            <del>$25.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/shorts-1.jpg"
                            alt="better basics french terry sweatshorts"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Better Basics French Terry Sweatshorts
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Shorts
                          </a>

                          <div class="price-box">
                            <p class="price">$20.00</p>
                            <del>$10.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="product-showcase">
                  <div class="showcase-wrapper  has-scrollbar">
                    <div class="showcase-container">
                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/sports-1.jpg"
                            alt="running & trekking shoes - white"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Running & Trekking Shoes - White
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Sports
                          </a>

                          <div class="price-box">
                            <p class="price">$49.00</p>
                            <del>$15.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/sports-2.jpg"
                            alt="trekking & running shoes - black"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Trekking & Running Shoes - black
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Sports
                          </a>

                          <div class="price-box">
                            <p class="price">$78.00</p>
                            <del>$36.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/party-wear-1.jpg"
                            alt="womens party wear shoes"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Womens Party Wear Shoes
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Party wear
                          </a>

                          <div class="price-box">
                            <p class="price">$94.00</p>
                            <del>$42.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/sports-3.jpg"
                            alt="sports claw women's shoes"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Sports Claw Women's Shoes
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Sports
                          </a>

                          <div class="price-box">
                            <p class="price">$54.00</p>
                            <del>$65.00</del>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="showcase-container">
                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/sports-6.jpg"
                            alt="air tekking shoes - white"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Air Trekking Shoes - white
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Sports
                          </a>

                          <div class="price-box">
                            <p class="price">$52.00</p>
                            <del>$55.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/shoe-3.jpg"
                            alt="Boot With Suede Detail"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Boot With Suede Detail
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            boots
                          </a>

                          <div class="price-box">
                            <p class="price">$20.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/shoe-1.jpg"
                            alt="men's leather formal wear shoes"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Men's Leather Formal Wear shoes
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            formal
                          </a>

                          <div class="price-box">
                            <p class="price">$56.00</p>
                            <del>$78.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/shoe-2.jpg"
                            alt="casual men's brown shoes"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Casual Men's Brown shoes
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Casual
                          </a>

                          <div class="price-box">
                            <p class="price">$50.00</p>
                            <del>$55.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="product-showcase">
                  <div class="showcase-wrapper  has-scrollbar">
                    <div class="showcase-container">
                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/watch-3.jpg"
                            alt="pocket watch leather pouch"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Pocket Watch Leather Pouch
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Watches
                          </a>

                          <div class="price-box">
                            <p class="price">$50.00</p>
                            <del>$34.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/jewellery-3.jpg"
                            alt="silver deer heart necklace"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Silver Deer Heart Necklace
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Jewellery
                          </a>

                          <div class="price-box">
                            <p class="price">$84.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/perfume.jpg"
                            alt="titan 100 ml womens perfume"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Titan 100 Ml Womens Perfume
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Perfume
                          </a>

                          <div class="price-box">
                            <p class="price">$42.00</p>
                            <del>$10.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/belt.jpg"
                            alt="men's leather reversible belt"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Men's Leather Reversible Belt
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Belt
                          </a>

                          <div class="price-box">
                            <p class="price">$24.00</p>
                            <del>$10.00</del>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="showcase-container">
                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/jewellery-2.jpg"
                            alt="platinum zircon classic ring"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              platinum Zircon Classic Ring
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            jewellery
                          </a>

                          <div class="price-box">
                            <p class="price">$62.00</p>
                            <del>$65.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/watch-1.jpg"
                            alt="smart watche vital plus"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Smart watche Vital Plus
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            Watches
                          </a>

                          <div class="price-box">
                            <p class="price">$56.00</p>
                            <del>$78.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/shampoo.jpg"
                            alt="shampoo conditioner packs"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              shampoo conditioner packs
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            cosmetics
                          </a>

                          <div class="price-box">
                            <p class="price">$20.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>

                      <div class="showcase">
                        <a href="#" class="showcase-img-box">
                          <img
                            src="assets/images/products/jewellery-1.jpg"
                            alt="rose gold peacock earrings"
                            class="showcase-img"
                            width="70"
                          />
                        </a>

                        <div class="showcase-content">
                          <a href="#">
                            <h4 class="showcase-title">
                              Rose Gold Peacock Earrings
                            </h4>
                          </a>

                          <a href="#" class="showcase-category">
                            jewellery
                          </a>

                          <div class="price-box">
                            <p class="price">$20.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="product-main">
                <h2 class="title">New Products {products.length}</h2>

                <div class="product-grid">
                  {products.map((product) => (
                    <div class="showcase">
                      <div class="showcase-banner">
                        <img
                          src={product.image}
                          alt="Mens Winter Leathers Jackets"
                          class="product-img default"
                        />
                        <img
                          src={product.image}
                          alt="Mens Winter Leathers Jackets"
                          class="product-img hover"
                        />
                      </div>

                      <div class="showcase-content">
                        <a href="#" class="showcase-category">
                          {product.name} {product.id}
                        </a>

                        <a href="#">
                          <h3 class="showcase-title">{product.description}</h3>
                        </a>

                        <div class="price-box">
                          <p class="price">{product.price}$</p>
                        </div>
                      </div>
                      <button
                        class="btn btn-primary mx-5 px-4 mb-2 "
                        style={{
                          position: "relative",
                          left: "25px",
                          backgroundColor: "",
                        }}
                        onClick={(e) =>
                          submitAddtocart(
                            e,
                            product.id,
                            product.name,
                            product.price,
                            product.description,
                            product.image
                          )
                        }
                      >
                        add to cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="container">
            <div class="testimonials-box">
              <div class="service">
                <h2 class="title">Our Services</h2>

                <div class="service-container">
                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="boat-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Worldwide Delivery</h3>
                      <p class="service-desc">For Order Over $100</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="rocket-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Next Day delivery</h3>
                      <p class="service-desc">UK Orders Only</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="call-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Best Online Support</h3>
                      <p class="service-desc">Hours: 8AM - 11PM</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="arrow-undo-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Return Policy</h3>
                      <p class="service-desc">Easy & Free Return</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="ticket-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">30% money back</h3>
                      <p class="service-desc">For Order Over $100</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="cta-container">
                <img
                  src="assets/images/cta-banner.jpg"
                  alt="summer collection"
                  class="cta-banner"
                />

                <a href="#" class="cta-content">
                  <p class="discount">25% Discount</p>

                  <h2 class="cta-title">Summer collection</h2>

                  <p class="cta-text">Starting @ $10</p>

                  <button class="cta-btn">Shop now</button>
                </a>
              </div>

              <div class="service">
                <h2 class="title">Our Services</h2>

                <div class="service-container">
                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="boat-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Worldwide Delivery</h3>
                      <p class="service-desc">For Order Over $100</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="rocket-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Next Day delivery</h3>
                      <p class="service-desc">UK Orders Only</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="call-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Best Online Support</h3>
                      <p class="service-desc">Hours: 8AM - 11PM</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="arrow-undo-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">Return Policy</h3>
                      <p class="service-desc">Easy & Free Return</p>
                    </div>
                  </a>

                  <a href="#" class="service-item">
                    <div class="service-icon">
                      <ion-icon name="ticket-outline"></ion-icon>
                    </div>

                    <div class="service-content">
                      <h3 class="service-title">30% money back</h3>
                      <p class="service-desc">For Order Over $100</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Content;
