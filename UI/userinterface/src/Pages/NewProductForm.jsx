import React, { useState } from "react";
import { Header } from "../Components/Header";
import Axios from "axios";
import Papa from "papaparse";

export function NewProductForm() {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const token = localStorage.getItem("accessToken");

  const productTypes = ["Laptop", "Phone", "Cloth", "Book"];
  const productStatus = ["Active", "Inactive"];
  const isAvailableStatus = ["Available", "Not Available"];

  const [alertDisplay, setAlertDisplay] = useState("none");

  function displayAndHide(message, type) {
    setAlertMessage(message);
    setAlertType(type);
    setAlertDisplay("flex");
    setTimeout(function () {
      setAlertDisplay("none");
    }, 3000);
  }

  const handleSubmit = () => {
    if (!productName || !productType || quantity <= 0 || !status || price <= 0) {
      displayAndHide("Please fill out all fields correctly.", "danger");
      return;
    }

    const product = { productName, productType, quantity, status, price, isAvailable };

    Axios.post("http://localhost:9000/products/newproduct", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        setProductName("");
        setProductType("");
        setQuantity(0);
        setStatus("");
        setPrice(0);
        setIsAvailable(false);
        displayAndHide("Product has been added successfully", "success");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        displayAndHide("Error adding product. Please try again.", "danger");
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          const data = results.data;
          // Assuming the CSV contains columns: productName, productType, quantity, status, price, isAvailable
          data.forEach((row) => {
            const product = {
              productName: row.productName,
              productType: row.productType,
              quantity: parseInt(row.quantity, 10),
              status: row.status,
              price: parseFloat(row.price),
              isAvailable: row.isAvailable === "true",
            };

            Axios.post("http://localhost:9000/products/newproduct", product, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                console.log("Product added successfully:", response.data);
                displayAndHide("Product has been added successfully", "success");
              })
              .catch((error) => {
                console.error("Error adding product:", error);
                displayAndHide("Error adding product. Please try again.", "danger");
              });
          });
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-4 d-flex justify-content-center">
        <div className="col-xl-6">
          <div className={`alert alert-${alertType}`} role="alert" style={{ display: alertDisplay }}>
            {alertMessage}
          </div>
          <div className="card p-4">
            <h3 className="text-center mb-4">Add New Product</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="" disabled>
                  Category
                </option>
                {productTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  Status
                </option>
                {productStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={isAvailable ? "Available" : "Not Available"}
                onChange={(e) => setIsAvailable(e.target.value === "Available")}
              >
                {isAvailableStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price $"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
