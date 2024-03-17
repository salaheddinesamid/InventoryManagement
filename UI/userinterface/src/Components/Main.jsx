import React, { useEffect, useState } from "react";
import Axios from "axios"
export function Main(){
    const axios = Axios
    let [clicked,setClicked] = useState(false);
    let [products,setProducts] = useState([]);
    const productsStatus = [
        {
            "status":"All",
            "clicked":false
        },
        {
            "status":"active"
        },
    ]
    useEffect(()=>{
        //let result  = axios.get("http://localhost:8080/products/");
    })
    return(
        <div className="row">
            <div className="col-xl-3 ms-4 pt-3 pe-3 ps-3" style={{
                backgroundColor:"#001f3f",
                color:"white",
                height:"750px",
                borderRadius:"10px"
            }}>
                <div className="row">
                    <div className="col-xl-6">
                        <h4><b>Products</b></h4>
                    </div>
                    <div className="col-xl-6">
                        <p style={{
                            border:"0.2px solid gray",
                            padding:"5px 10px",
                            borderRadius:"10px"
                        }}><b>Total:</b></p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="row">
                        <div className="col-xl-12">
                            <p><b>Products status:</b></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            <button className="btn btn-light">All</button>
                        </div>
                        <div className="col-xl-6">
                            <button className="btn btn-light">Active</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-xl-6">
                            <button className="btn btn-light">Inactive</button>
                        </div>
                        <div className="col-xl-6">
                            <button className="btn btn-light">Draft</button>
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
                            <button className="btn btn-light">Retail</button>
                        </div>
                        <div className="col-xl-6">
                            <button className="btn btn-light">Wholesale</button>
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
            <div className="col-xl-8">
                <div className="row">
                    <div className="row">
                        <div className="col-xl-9">
                            <input className="form-control" placeholder="Search product"/>
                        </div>
                        <div className="col-xl-3">
                            <button className="btn" style={{
                                backgroundColor:"#00ff00"
                            }}>Add Product</button>
                        </div>
                    </div>
                    <div className="row">
                        {products.map((product)=>(
                            <div className="col-xl-12">
                                {product.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}