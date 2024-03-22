import React, { useState } from "react";
import { Header } from "../Components/Header";
import  Axios  from "axios";
export function NewProductForm(){
    let [productName,setProductName] = useState("");
    let [productType, setProductType] = useState("");
    let [quantity,setQuantity] = useState();
    let [status,setStatus] = useState("");
    let [price,setPrice] = useState();
    let [isAvailable,setIsAvailable] = useState(false)
    let product = {productName,productType,quantity,status,price}
    const productTypes = [
        
        {
            "type":"Laptop"
        },
        {
            "type":"Phone"
        },
        {
            "type":"Cloth"
        },
        {
            "type":"Book"
        }

    ]
    const productStatus = [
        {
            "status":"Active"
        },
        {
            "status":"Inactive"
        }
    ]
    const isAvailableStatus = [
        {
            "status":"Available"
        },
        {
            "status":"Not Available"
        }
    ]
    function displayAndHide() {
        setAlertDisplay("flex") // Display the div
        setTimeout(function(){
          setAlertDisplay("none") // Hide the div after 3 seconds
        }, 3000);
      }
    let [alertDisplay,setAlertDisplay] = useState("none");
    const axios = Axios
    return(
        <div className="row">
            <div className="row">
                <Header/>
            </div>
            <div className="row ">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-4">
                    <div class="alert alert-success" role="alert" id="alert" style={{
                        display:alertDisplay
                    }}>
                            Product has been added successfully
                          </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-center mt-4">
                        <div className="col-xl-3">
                            <input placeholder="Product name" className="form-control" value={productName} onChange={(e)=>{
                                setProductName(e.target.value)
                            }}/>
                        </div>
                        <div className="col-xl-3">
                        <select className="form-select" aria-label="Select the Symptom" onChange={(e)=>{
                           setProductType(e.target.value)
                               }}>
                                <option selected>Category</option>
                    
                                 {productTypes.map((element)=>(
                            
                              <option value={element.type}
                              >{element.type}</option>
                               ))}
                    </select>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-4">
                        <div className="col-xl-3">
                            <input placeholder="Quantity" className="form-control" value={quantity} onChange={(e)=>{
                                setQuantity(e.target.value)
                            }}/>
                        </div>
                        <div className="col-xl-3">
                            <select className="form-select" name="" id="" onChange={(e)=>{
                                setStatus(e.target.value)
                                
                            }}>
                                <option selected>Status</option>
                                {productStatus.map((status)=>(
                                <option value={status.status}>{status.status}</option>
                            ))}</select>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-4">
                        <div className="col-xl-3">
                            <select className="form-select" name="" id="" onChange={(e)=>{
                                if(e.target.value === "Available"){
                                    setIsAvailable(true)
                                }else if( e.target.value === "Not Available"){
                                    setIsAvailable(false);
                                }
                            }}>
                                {isAvailableStatus.map((el)=>(
                                    <option value={el.status}>{el.status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-xl-3">
                            <input placeholder="Price $" className="form-control" value={price} onChange={(e)=>{
                                setPrice(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-4">
                       <div className="col-xl-6">
                         <button className="btn btn-primary" onClick={()=>{
                                let req = axios.post("http://localhost:8080/products/newproduct",product);
                                setProductName("")
                                setProductType("")
                                setIsAvailable()
                                setQuantity(0)
                                setPrice(0)
                                displayAndHide()
                            }}>Add</button>  
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}