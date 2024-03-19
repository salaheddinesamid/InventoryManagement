import React from "react";
import logo from "../logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartSimple, faFile, faGlobe, faListCheck, faShop, faWarehouse, faGear, faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons"
export function Header(){
    const listOfLinks = [
        {
            "name":"Dashboard",
            "href":"/",
            "logo": faGlobe,
        },
        {
            "name":"Inventory",
            "href":"/inventory/",
            "logo":faWarehouse
        },
        {
            "name":"Sales",
            "href":"/sales/",
            "logo":faShop
        },
        {
            "name":"Orders",
            "href":"/orders/",
            "logo":faListCheck
        },
        {
            "name":"Report",
            "href":"http:localhost:3000/report/",
            "logo":faChartSimple
        },
        {
            "name":"Documents",
            "href":"http:localhost:3000/documents/",
            "logo":faFile
        }

    ]
    return(
        <div className="row align-items-center">
            <div className="col-xl-2">
                <h4 className="text-center" style={{
                    fontWeight:"bold"
                }}><img src={logo} style={{
                    height:"40px"
                }}/>Inventar</h4>
            </div>
            <div className="col-xl-8">
               {listOfLinks.map((link)=>(
                   <a href={link.href} style={{
                    textDecoration:"none",
                    color:"gray",
                    border:"0.3px solid #DCDCDC",
                    padding:"5px 10px",
                    borderRadius:"8px",
                    margin:"0 10px",
                    fontWeight:"bold"
                   }}>
                    <FontAwesomeIcon icon={link.logo} style={{
                        color:"#DCDCDC",
                        padding:"0 4px"
                    }}/>
                    {link.name}</a>
               ))}
            </div>
            <div className="col-xl-2 d-inline-flex mt-1 ps-1 pt-1">
               <p style={{
                color:"gray",
                border:"0.4px solid gray",
                padding:"5px 8px",
                borderRadius:"5px",
                marginRight:"5px"
               }}><FontAwesomeIcon icon={faGear}/></p>
               <p style={{
                color:"gray",
                border:"0.4px solid gray",
                padding:"5px 8px",
                borderRadius:"5px",
                fontWeight:"bold",
                marginRight:"5px"
               }}><FontAwesomeIcon icon={faEnvelope}/></p>
               <p style={{
                color:"gray",
                border:"0.4px solid gray",
                padding:"5px 8px",
                borderRadius:"5px"
               }}><FontAwesomeIcon icon={faUser}/></p>
            </div>
        </div>
    )
}