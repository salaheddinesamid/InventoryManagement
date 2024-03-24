import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Modification } from "./Modification";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Items } from "./Items";
export function Main(){
    const axios = Axios
    const navigate = useNavigate();
    let [productClicked,setProductClicked] = useState(false)
    let [clicked,setClicked] = useState(false);
    let [products,setProducts] = useState([]);
    let[totalProducts,setTotalProducts] = useState(0);
    let [targetProduct,setTargetProduct] = useState();
    let [searchProduct,setSearchProduct] = useState("");
    let [items,setItems] = useState([]);
    
    function handleSearch(){
        
        
        
    }
    let [status,setStatus] = useState("All");
    useEffect(()=>{
        // Extract the first letter for the products
        let startsWith = searchProduct[0]
        // API call to get all the products from database
        let result  = axios.get(`http://localhost:9000/products/${status}`).then(res=>setProducts(res.data))
        // API call to get the total number of products 
        let total = axios.get("http://localhost:9000/products/total").then(res=>setTotalProducts(res.data))
        //let req = axios.get(`http://localhost:9000/products/${startsWith}`).then(res => setItems(res.data))
        
    },)
    return(
        // Main division
        <div className="row mt-3" style={{
            position:"absolute",
            zIndex:1
        }}>
            
            <div className="col-xl-3 col-md-3 ms-4 pt-3 pe-3 ps-3" id="product_filter" style={{
                backgroundColor:"#001f3f",
                color:"white",
                height:"700px",
                borderRadius:"10px"
            }}>
                <div className="row">
                    <div className="col-xl-6">
                        <h4><b>Products</b></h4>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <p style={{
                            border:"0.2px solid gray",
                            padding:"5px 10px",
                            borderRadius:"10px"
                        }}><b>Total:{totalProducts}</b></p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="row">
                        <div className="col-xl-12">
                            <p><b>Products status:</b></p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xl-6 col-md-12">
                            <button className="btn btn-light col-md-12 mt-1" onClick={()=>{
                                setStatus("All")
                            }}>All</button>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <button className="btn btn-light col-md-12 mt-1" onClick={()=>{
                                setStatus("Active")
                            }}>Active</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-xl-6">
                            <button className="btn btn-light col-md-12 mt-1" onClick={()=>{
                                setStatus("Inactive")
                            }}>Inactive</button>
                        </div>
                        <div className="col-xl-6">
                            <button className="btn btn-light col-md-12 mt-1">Draft</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row mt-3">
                        <div className="col-xl-12">
                            <p><b>Product type:</b></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            <button className="btn btn-light col-md-12 mt-1">Retail</button>
                        </div>
                        <div className="col-xl-6">
                            <button className="btn btn-light col-md-12 mt-1">Wholesale</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row mt-2">
                        <div className="col-xl-12">
                            <p><b>Sort by:</b></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                        <div class="form-floating">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                  <option selected>Alphabetical sort</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                                <label for="floatingSelect">Select</label>
                              </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-xl-12">
                        <p><b>Price:</b></p>
                    </div>
                    <div className="row">
                        <div className="col-xl-10 mt-1">
                            <input className="form-control" placeholder="Minimum price $"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-10 mt-1">
                            <input className="form-control" placeholder="Maximum price $"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-xl-5 mt-4">
                        <button className="btn btn-danger">Reset Filters</button>
                    </div>
                </div>
            </div>
            <div className="col-xl-8 col-md-8">
                <div className="row">
                    <div className="row">
                        <div className="col-xl-7 col-md-7">
                            <input className="form-control" placeholder="Search product" onChange={(e)=>{
                                setSearchProduct(e.target.value)
                                
                            }}/>
                            {items.length !==0 ? <Items data={items}/> : ""}
                        </div>
                        <div className="col-xl-1 col-md-1">
                            <button className="btn btn-light"><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                        <div className="col-xl-3 col-md-4">
                            <button className="btn" style={{
                                backgroundColor:"#00ff00",
                                fontWeight:"bold"
                            }} onClick={()=>{
                                navigate("/newproduct")
                            }}>Add Product</button>
                        </div>
                        
                    </div>
                    <div className="row mt-4" style={{
                        overflowY:"scroll",
                        height:"700px",
                    }}>
                        <div className="col-xl-12 col-md-12">
                        {products.map((product)=>(
                            <div className="row mt-3 ms-2 mb-2" style={{
                                border:"none",
                                backgroundColor:"#001f3f",
                                color:"white",
                                padding:"10px 10px",
                                borderRadius:"10px",
                                cursor:"pointer"
                            }} onClick={()=>{
                                setProductClicked(true)
                                setTargetProduct(product.id)
                            }} key={product.id}>
                                <div className="col-xl-4 col-md-4">
                                    <h4>{product.productName}</h4>
                                </div>
                                <div className="col-xl-2 col-md-2">
                                     <p style={{
                                        color:"gray"
                                       }}>Quantity</p>
                                </div>
                                <div className="col-xl-4 col-md-4">
                                    <p style={{
                                        color:"gray"
                                    }}>Retail price</p>
                                </div>
                                <div className="col-xl-2 col-md-2">
                                    <p style={{
                                        color:"gray"
                                    }}>Status</p>
                                </div>
                                <div className="col-xl-4 col-md-4">
                                    <p>Type:{product.productType === "" ? "undefined": product.productType}</p>
                                </div>
                                <div className="col-xl-2 col-md-2">
                                    {product.quantity}
                                </div>
                                <div className="col-xl-4 col-md-4">
                                    <p>{product.price}$</p>
                                </div>
                                <div className="col-xl-2 col-md-1">
                                    {product.status === "Active" ? <p><FontAwesomeIcon icon={faCheck} style={{
                                        color:"green"
                                    }}/>{product.status}</p>:<p><FontAwesomeIcon icon={faXmark} style={{
                                        color:"red"
                                    }}/>{product.status}</p>}
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                      {productClicked && targetProduct === product.id ? <Modification index={product.id} />:""}
                                    </div>
                                </div>
                                   
                                   
                            </div>
                            
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}