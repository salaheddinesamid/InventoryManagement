import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch, faTimes, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Main.css"; // Import CSS file for styles

export function Main() {
    const axios = Axios;
    const navigate = useNavigate();

    // State variables
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchProduct, setSearchProduct] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOption, setSortOption] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const token = localStorage.getItem("accessToken");

    // Fetch products and total count on initial load and when filters change
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:9000/products/${statusFilter}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setProducts(productResponse.data);
                const totalResponse = await axios.get("http://localhost:9000/products/total");
                setTotalProducts(totalResponse.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [statusFilter, token]);

    // Filter products by search input, price range, status, and category
    const filteredProducts = products
        .filter(product => product.productName.toLowerCase().includes(searchProduct.toLowerCase()))
        .filter(product => (minPrice === "" || product.price >= parseFloat(minPrice)))
        .filter(product => (maxPrice === "" || product.price <= parseFloat(maxPrice)))
        .filter(product => (categoryFilter === "" || product.productType === categoryFilter))
        .sort((a, b) => {
            if (sortOption === "Alphabetical sort") {
                return a.productName.localeCompare(b.productName);
            } else if (sortOption === "Price: Low to High") {
                return a.price - b.price;
            } else if (sortOption === "Price: High to Low") {
                return b.price - a.price;
            }
            return 0;
        });

    // Reset filters
    const resetFilters = () => {
        setStatusFilter("All");
        setSearchProduct("");
        setSortOption("");
        setMinPrice("");
        setMaxPrice("");
        setCategoryFilter("");
    };

    // Handle product delete
    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:9000/products/delete/${productId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setProducts(products.filter(product => product.id !== productId));
            setTotalProducts(totalProducts - 1);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="main-container">
            {/* Left sidebar - Filters */}
            <div className="filter-container">
                <h4>Product Filter</h4>
                <p className="total-products">Total: {totalProducts}</p>
                <div className="filter-section">
                    {/* Status filter */}
                    <div className="filter-group">
                        <p>Products status:</p>
                        <div className="status-buttons">
                            <button
                                className={`status-button ${statusFilter === "All" ? "active" : ""}`}
                                onClick={() => setStatusFilter("All")}
                            >
                                All
                            </button>
                            <button
                                className={`status-button ${statusFilter === "Active" ? "active" : ""}`}
                                onClick={() => setStatusFilter("Active")}
                            >
                                Active
                            </button>
                            <button
                                className={`status-button ${statusFilter === "Inactive" ? "active" : ""}`}
                                onClick={() => setStatusFilter("Inactive")}
                            >
                                Inactive
                            </button>
                            <button className="status-button">Draft</button>
                        </div>
                    </div>
                    {/* Sort by */}
                    <div className="filter-group">
                        <p>Sort by:</p>
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Sort by"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Alphabetical sort">Alphabetical sort</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                            </select>
                            <label htmlFor="floatingSelect">Select</label>
                        </div>
                    </div>
                    {/* Price filter */}
                    <div className="filter-group">
                        <p>Price:</p>
                        <input
                            className="form-control"
                            placeholder="Minimum price $"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            type="number"
                        />
                        <input
                            className="form-control"
                            placeholder="Maximum price $"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            type="number"
                        />
                    </div>
                    {/* Category filter */}
                    <div className="filter-group">
                        <p>Category:</p>
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="floatingCategorySelect"
                                aria-label="Sort by category"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Book">Book</option>
                                <option value="Phone">Phone</option>
                                {/* Add more options as needed */}
                            </select>
                            <label htmlFor="floatingCategorySelect">Select</label>
                        </div>
                    </div>
                    {/* Reset filters */}
                    <div className="reset-filters">
                        <button className="btn btn-danger" onClick={resetFilters}>
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Right section - Product list */}
            <div className="products-list">
                <div className="search-bar">
                    <input
                        className="form-control search-input"
                        placeholder="Search product"
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                    />
                    {searchProduct && (
                        <button className="clear-search" onClick={() => setSearchProduct("")}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                    <button className="btn btn-light search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="add-product">
                    <button className="btn btn-success font-weight-bold" onClick={() => navigate("/newproduct")}>
                        Add Product
                    </button>
                </div>
                <div className="products-container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Retail Price</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.status === "Active" ? <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} /> : <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />}</td>
                                    <td>{product.productType || "Undefined"}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
