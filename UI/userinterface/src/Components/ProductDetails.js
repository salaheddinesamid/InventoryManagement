import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css"; // Import CSS file for styles

export function ProductDetail() {
    const axios = Axios;
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("accessToken")

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/products/${id}`,{
                    headers:{
                        "Authorization" : `Bearer ${token}`
                    }
                });
                setProduct(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:9000/products/${id}`, product);
            navigate("/"); // Navigate back to the main page after saving
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };
        if (isLoading) {
            return <div>Loading...</div>;
        }
    
        return (
            <div className="product-detail-container">
                <h2>Edit Product</h2>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.productName}
                        onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.quantity}
                        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Retail Price ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={product.status}
                        onChange={(e) => setProduct({ ...product, status: e.target.value })}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Product Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.productType}
                        onChange={(e) => setProduct({ ...product, productType: e.target.value })}
                    />
                </div>
                <div className="form-buttons">
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Cancel</button>
                </div>
            </div>
        );
    }
    