import React, { useState } from "react";
import logo from "../logo.png";
import "../Dashboard.css"
import { Header } from "../Components/Header";
import { Main } from "../Components/Main";
import { Sales } from "./Sales";
import { Orders } from "./Orders";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartSimple, faFile, faGlobe, faListCheck, faShop, faWarehouse, faGear, faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons"
import { Documents } from "./Documents";
export function Dashboard(){
    const listOfLinks = [
        {
            id:1,
            "name":"Dashboard",
            "href":"/",
            "logo": faGlobe,
            "color":"black",
            "view":<Main/>
        },
        {
            id:2,
            "name":"Sales",
            "href":"/sales/",
            "logo":faShop,
            "color":"#DEB887",
            "view": <Sales/>
        },
        {
            id:3,
            "name":"Orders",
            "href":"/orders/",
            "logo":faListCheck,
            "color":"#228B22",
            "view": <Orders/>
        },
        {
            id:4,
            "name":"Documents",
            "href":"http:localhost:3000/documents/",
            "logo":faFile,
            "color":"#1E90FF",
            "view": <Documents/>
        }

    ]
    let [targetView,setTargetView] = useState(1);
    return(
        <div className="row">
            <div className="row">
            <div className="row align-items-center">
            <div className="col-xl-2 col-md-2 col-sm-2">
                <h4 className="text-center" style={{
                    fontWeight:"bold"
                }}><img src={logo} style={{
                    height:"40px"
                }}/>Inventar</h4>
            </div>
            <div className="col-xl-8 col-md-8 col-sm-8 col-sm-8" id="menu">
                <div className="row" id="links">
                     {listOfLinks.map((link)=>(
                         <div className="col-xl-3 col-md-3 col-sm-3" id="link">
                            <button className="btn btn-light" onClick={()=>{
                                              setTargetView(link.id)
                                       }}>
                                       <FontAwesomeIcon icon={link.logo} style={{
                                           color:link.color,
                                           padding:"0 4px"
                                       }}/>
                                       {link.name}</button>
                         </div>
                     ))}
               </div>
            </div>
            <div className="col-xl-2 col-md-2 col-sm-2 d-inline-flex mt-1 ps-1 pt-1" id="services">
                <div className="col-xl-3"id="settings">
                    <button className="btn btn-primary" ><FontAwesomeIcon icon={faGear}/></button>
                </div>
                <div className="col-xl-3">
                   <button className="btn btn-warning"><FontAwesomeIcon icon={faEnvelope}/></button>
                </div>
                <div className="col-xl-3">
                       <button className="btn btn-dark"><FontAwesomeIcon icon={faUser}/></button>
                </div>
               
            </div>
        </div>
            </div>
              {
              listOfLinks.map((component)=>(
                    <div className="row">
                       {targetView === component.id ? component.view : ""}
                    </div>
                    
        ))
      }
            </div>
    )
}