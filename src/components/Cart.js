import React, { useState, useEffect } from "react";
import axios from "axios";
import getAxiosConfig from "./apiconfig";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function Cart(props) {
  const axiosConfig = getAxiosConfig();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  if (!localStorage.getItem("user")) {
    swal("Warning", "login to go to cart page!", "error");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
  useEffect(() => {
    let isMounted = true;
    axios.get("http://localhost:8000/api/carts", axiosConfig).then((res) => {
      if (isMounted) {
        setProducts(res.data);
      } else if (res.data.status === 401) {
        navigate("/");
        swal("Warning", res.data.message, "error");
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const deleteCartItem = (e, id) => {
    e.preventDefault();
    const thisclicked = e.currentTarget;
    axios
      .delete(`http://localhost:8000/api/supprimer/${id}`, axiosConfig)
      .then((res) => {
        if (res.data.status === 201) {
          swal("Success", res.data.message, "success");
          thisclicked.closest("tr").remove();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        }
      })
      .catch((error) => {
        console.log(error);
      });
 
  };

  return (
    <div class="container px-3 my-5 clearfix">
      <div class="card">
        <div class="card-header">
          <h2>Shopping Card </h2>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table  m-0">
              <thead>
                <tr>
                  <th
                    class="text-center py-3 px-4 "
                    style={{ minWidth: "400px" }}
                  >
                    Product Name &amp; Details
                  </th>
                  <th class="text-right py-3 px-4" style={{ width: "100px" }}>
                    Price
                  </th>
                  <th class="text-center py-3 px-4" style={{ width: "120px" }}>
                    Quantity
                  </th>
                  <th class="text-right py-3 px-4" style={{ width: "100px" }}>
                    Total
                  </th>
                  <th class="text-right py-3 px-4" style={{ width: "100px" }}>
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td class="p-2">
                      <div class="media align-center">
                        <img
                          src={product.image}
                          class="img-fluid h-25"
                          style={{ width: "120px" }}
                          alt=""
                        />
                        <div class="media-body m-1 mb-0">
                          <h5 class="mt-2  mb-0">{product.name}</h5>
                          <p class="text-muted mt-0 mb-0">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">
                      {product.price}$
                    </td>
                    <td class="align-middle p-4">
                      <input
                        type="number"
                        min="0"
                        class="form-control text-center"
                        defaultValue={product.quantity}
                        onChange={(e) => {
                          const newProducts = products.map((p) => {
                            if (p.id === product.id) {
                              return { ...p, quantity: e.target.value };
                            } else {
                              return p;
                            }
                          });
                          setProducts(newProducts);
                        }}
                      />
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">
                      {product.price * product.quantity}.00$
                    </td>
                    <td class="text-center align-middle px-5">
                      <button
                        onClick={(e) => deleteCartItem(e, product.id)}
                        href="#"
                        class="shop-tooltip close float-none text-danger"
                        title=""
                        data-original-title="Remove"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-end">
            <div class="d-flex">
              <div class="text-right mt-4">
                <label class="text-muted font-weight-normal m-0 ">
                  Total price
                </label>
                <div class="text-large px-4">
                  <strong>
                    {products
                      .reduce(
                        (total, product) =>
                          total + product.price * product.quantity,
                        0
                      )
                      .toFixed(2)}$
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-lg btn-primary mt-2">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
