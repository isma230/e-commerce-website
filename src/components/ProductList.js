import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import getAxiosConfig from "./apiconfig";
function ProductList() {
  const [products, setProducts] = useState([]);
  const axiosConfig = getAxiosConfig();
  const [category, setCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);

    }
    let isMounted = true;
    axios.get("http://localhost:8000/api/category", axiosConfig).then((res) => {
      if (isMounted) {
        setCategory(res.data);
      } else if (res.data.status === 401) {
        swal("Warning", res.data.message, "error");
      }
    });
    axios.get("http://localhost:8000/api/products").then((res) => {
      if (isMounted) {
        setProducts(res.data);
      } else if (res.data.status === 401) {
        swal("Warning", res.data.message, "error");
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const menproducts = (id) => {
    axios.get(`http://localhost:8000/api/getproducts/${id}`).then((res) => setProducts(res.data))
  };

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

  return (
    <div class="wrapper">
      <div class="d-md-flex align-items-md-center">
        <div class="h3">All Products </div>
        <div class="ml-auto d-flex align-items-center views">
          <span class="green-label px-md-2 px-1">428</span>
        </div>
      </div>
      <div class="content py-md-0 py-3">
        <section id="sidebar">
          <div class="py-3">
            <h5 class="font-weight-bold">Categories</h5>
            <ul class="list-group">
              {category.map((categ) => (
                <li onClick={()=>menproducts(categ.id)} class="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">
                  {categ.nom}
                  <span class="badge badge-primary badge-pill">
                    {categ.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="products">
          <div class="container py-3">
            <div class="row">
              {products.map((product) => (
                <div class="col-lg-4 col-md-4 col-sm-6 mb-4" id="unique-card">
                  <div class="card">
                    <img class="card-img-top" src={product.image} />
                    <div class="card-body">
                      <h6 class="font-weight-bold pt-1">{product.name}</h6>
                      <div class="text-muted description">
                        {product.description}
                      </div>
                      <div class="d-flex align-items-center justify-content-between pt-3">
                        <div class="d-flex flex-column">
                          <div class="h6 font-weight-bold">
                            {product.price}$
                          </div>
                        </div>
                        <button onClick={(e) =>
                          submitAddtocart(
                            e,
                            product.id,
                            product.name,
                            product.price,
                            product.description,
                            product.image
                          )
                        } class="btn btn-primary">add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductList;
