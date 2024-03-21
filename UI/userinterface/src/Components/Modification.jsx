import React, { useState } from "react";
import Axios from "axios"
export function Modification(props){
    const axios = Axios
    const [display,setDisplay] = useState("flex")
    const [newPrice,setNewPrice] = useState()
    const [newQuantity,setNewQuantity] = useState()
    const [newStatus,setNewStatus] = useState("")
    let id = props.index;
    const request = {id,newPrice,newQuantity,newStatus}
    return(
        <div className="row" style={{
            display:display
        }}>
            <div className="col-xl-3">
                <input className="form-control" placeholder="New Price $" value={newPrice} onChange={(e)=>{
                    setNewPrice(e.target.value)
                }}/>
            </div>
            <div className="col-xl-3">
               <input className="form-control" placeholder="New Quantity" value={newQuantity} onChange={(e)=>{
                    setNewQuantity(e.target.value)
                }}/>
            </div>
            <div className="col-xl-3">
               <input className="form-control" placeholder="New Status" value={newStatus} onChange={(e)=>{
                    setNewStatus(e.target.value)
                }}/>
            </div>
            <div className="col-xl-3">
               <button className="btn btn-success" onClick={()=>{
                let modificationRequest = axios.put("http://localhost:8080/products/update",request);
                setDisplay("none")
               }}>Modify</button>
               <button className="btn btn-danger ms-1" onClick={()=>{
                 let deleteRequest = axios.delete(`http://localhost:8080/products/delete/${id}`);
               }}>Delete</button>
            </div>
            
        </div>
    )
}