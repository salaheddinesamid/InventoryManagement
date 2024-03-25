import React, { useEffect, useState } from "react";
import Axios from "axios"
export function Orders(){
    const axios = Axios
    let [orders,setOrders] = useState([])
    useEffect(()=>{
        let req = axios.get("http://localhos:9000/orders/").then(res=>setOrders(res.data))
    })
    return(
        <div className="container">
           <div className="row mt-4 ms-3" >
                        <div className="row d-flex align-items-center" style={{
                      backgroundColor:"#DCDCDC",
                      borderRadius:"10px"
                   }}>
                            <div className="col-xl-2">
                                <p><b>No</b></p>
                            </div>
                            <div className="col-xl-2">
                                <p><b>IdCustomer</b></p>
                            </div>
                            <div className="col-xl-2">
                                <p><b>Customer name</b></p>
                            </div>
                            <div className="col-xl-2">    
                                <p><b>Order date</b></p>
                            </div>
                            <div className="col-xl-2">
                                <p><b>Status</b></p>
                            </div>
                            <div className="col-xl-2">
                                <p><b>Price</b></p>
                            </div>
                        </div>
                        <div className="row">
                            {orders.map((order)=>(
                                <div className="row mt-2">
                                    <div className="col-xl-2">{order.id}</div>
                                    <div className="col-xl-2">{order.idOfCustomer}</div>
                                    <div className="col-xl-2">{order.nameOfCustomer}</div>
                                    <div className="col-xl-2">{order.date}</div>
                                    <div className="col-xl-2">
                                        {order.status === "Requested" ? <p style={{backgroundColor:"#FFA500",padding:"4px 10px",borderRadius:"20px",color:"white",fontWeight:"bold",justifyContent:"center"}}>{order.status}</p> : order.status === "Delivered" ? <p style={{backgroundColor:"#2E8B57",padding:"4px 10px",borderRadius:"20px",color:"white",fontWeight:"bold",justifyContent:"center"}}>{order.status}</p> :""}
                                    </div>
                                    <div className="col-xl-2">{order.price}</div>
                                </div>
                            ))}
                        </div>
        </div>
    </div>
    )
}