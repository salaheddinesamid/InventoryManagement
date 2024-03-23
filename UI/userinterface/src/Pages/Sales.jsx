import { faArrowRight, faChartLine, faFileInvoice, faFilter, faMoneyBill, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useEffect, useState } from "react";
import Axios from "axios"
export function Sales(){
    const axios = Axios
    let [orderDetails,setOrderDetails] = useState([]);
    useEffect(()=>{
        let req = axios.get("http://localhost:9000/orders/").then(res=>setOrderDetails(res.data))
    },[])
    return(
        <div className="row ms-3 mt-4">
            <div className="row">
                <div className="col-xl-3">
                    <div className="row" style={{
                        border:"0.3px solid gray",
                        padding:"10px 10px",
                        borderRadius:"20px"
                    }}>
                        <div className="col-xl-3">
                            <button className="btn btn-success"><FontAwesomeIcon icon={faPeopleGroup}/></button>
                        </div>
                        <div className="col-xl-6">
                            <div className="row d-block">
                                <div className="col-xl-6">
                                    <p>10</p>
                                </div>
                                <div className="col-xl-6">
                                    <p style={{
                                        color:"gray",
                                        fontWeight:"lighter"
                                    }}>Customers</p>
                                </div>
                            </div>
                        </div>
                            <hr />
                        <div className="row">
                           <div className="col-xl-9">
                               <p><span style={{color:"green"}}>+6.5%</span>since last week</p>
                           </div>
                           <div className="col-xl-3">
                            <button className="btn btn-light"><FontAwesomeIcon icon={faArrowRight}/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="row ms-2" style={{
                        border:"0.3px solid gray",
                        borderRadius:"20px",
                        padding:"10px 10px"
                    }}>
                        <div className="row">
                            <div className="col-xl-3">
                                <button className="btn" style={{
                                    backgroundColor:"#BA55D3",
                                    color:"white",

                                }}><FontAwesomeIcon icon={faFileInvoice}/></button>
                            </div>
                            <div className="col-xl-9">
                                <div className="row d-block">
                                    <div className="col-xl-6">
                                        <p>56</p>
                                    </div>
                                    <div className="col-xl-6">
                                        <p style={{
                                            fontWeight:"lighter",
                                            color:"gray"
                                        }}>Invoices</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                           <hr />
                        <div className="row">
                            <div className="col-xl-9">
                                <p><span style={{
                                    color:"green"
                                }}>+11.5%</span>since last week</p>
                            </div>
                            <div className="col-xl-3">
                                <button className="btn btn-light"><FontAwesomeIcon icon={faArrowRight}/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                  <div className="row ms-2" style={{
                        border:"0.3px solid gray",
                        borderRadius:"20px",
                        padding:"10px 10px"
                    }}>
                    <div className="row">
                        <div className="col-xl-3">
                            <button className="btn btn-warning"><FontAwesomeIcon icon={faMoneyBill}/></button>
                        </div>
                        <div className="col-xl-9">
                            <div className="row d-block">
                                <div className="col-xl-6">
                                    <p>17</p>
                                </div>
                                <div className="col-xl-6">
                                    <p style={{color:"gray",fontWeight:"lighter"}}>Revenue</p>
                                </div>
                            </div>
                        </div>
                    </div>
                      <hr />
                    <div className="row">
                        <div className="col-xl-9">
                            <p><span style={{color:"green"}}>+8.05%</span>since last week</p>
                        </div>
                        <div className="col-xl-3">
                            <button className="btn btn-light"><FontAwesomeIcon icon={faArrowRight}/></button>
                        </div>
                    </div>
                  </div>  
                </div>
                <div className="col-xl-3">
                    <div className="row ms-2"  style={{
                        border:"0.3px solid gray",
                        borderRadius:"20px",
                        padding:"10px 10px"
                    }}>
                        <div className="row">
                            <div className="col-xl-3">
                                <button className="btn btn-primary">
                                   <FontAwesomeIcon icon={faChartLine}/>
                                </button>
                            </div>
                            <div className="col-xl-9">
                                <div className="row d-block">
                                    <div className="col-xl-6">
                                        <p>50</p>
                                    </div>
                                    <div className="col-xl-6">
                                        <p style={{color:"gray",fontWeight:"lighter"}}>Profit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <hr />
                        <div className="row">
                            <div className="col-xl-9">
                                <p><span style={{color:"green"}}>+10%</span>since last week</p>
                            </div>
                            <div className="col-xl-3">
                                <button className="btn btn-light"><FontAwesomeIcon icon={faArrowRight}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
              <div className="col-xl-12 d-inline-flex">
                <div className="col-xl-7" style={{
                    border:"0.3px solid gray",
                    borderRadius:"20px",
                    padding:"20px 20px"

                }}>
                    <div className="row">
                        <div className="col-xl-8">
                            <h4>Sales Analytics</h4>
                        </div>
                    </div>
                    <div className="row">
                        <BarChart
                            series={[
                              { data: [35,44,20,10,45,80,70,10,66,55,33,11] },
                              { data: [35,12,10,10,50,70,23,45,65,21,77,76] },
                            ]}
                            height={290}
            
                            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jui','Jul','Aou','Sep','Oct','Nov','Dec'], scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                    </div>
                
                </div>
                <div className="col-xl-5 ms-2" style={{
                    border:"0.3px solid gray",
                    borderRadius:"20px",
                    padding:"20px 20px"

                }}>
                    <div className="row">
                        <div className="col-xl-8">
                            <h4>Invoices Statistics</h4>
                        </div>
                    </div>
                    <div className="row">
                    <PieChart
                               series={[
                                 {
                                   data: [
                                     { id: 0, value: 10, label: 'Total unpaid' },
                                     { id: 1, value: 15, label: 'Total overdue' },
                                     { id: 2, value: 20, label: 'Total paid' },
                                   ],
                                 },
                               ]}
                               width={400}
                               height={200}
                             />
                    </div>
                </div>
            </div>
            </div>
            <div className="row mt-2 pb-3" style={{
                border:"0.3px solid #DCDCDC",
                borderRadius:"10px"
            }}>
               <div className="container">
                   <div className="row mt-2">
                     <div className="col-xl-10">
                        <h4>Customer Details</h4>
                     </div>
                     <div className="col-xl-2">
                        <button className="btn btn-light">
                            <FontAwesomeIcon icon={faFilter}/> Filter
                        </button>
                     </div>
                   </div>
                   <div className="row mt-4" >
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
                            {orderDetails.map((order)=>(
                                <div className="row mt-2">
                                    <div className="col-xl-2">{order.id}</div>
                                    <div className="col-xl-2">{order.idOfCustomer}</div>
                                    <div className="col-xl-2">{order.nameOfCustomer}</div>
                                    <div className="col-xl-2">{order.date}</div>
                                    <div className="col-xl-2">
                                        {order.status === "Requested" ? <p style={{backgroundColor:"#FFA500",padding:"4px 10px",borderRadius:"20px",color:"white",fontWeight:"bold",justifyContent:"center"}}>{order.status}</p> : order.status === "Delivered" ? <p></p> :""}
                                    </div>
                                    <div className="col-xl-2">{order.price}</div>
                                </div>
                            ))}
                        </div>
                   </div>
                </div> 
            </div>
        </div>
    )
}