import React from "react";
import "../Dashboard.css"
import { Header } from "../Components/Header";
import { Main } from "../Components/Main";
import { Sales } from "./Sales";
export function Dashboard(){
    let Components = [
        {
            id:1,
            name:"Dashboard",
            comp: <Main/>
        },
        {
            id:2,
            name:"Sales",
            comp : <Sales/>
        }
    ]
    return(
        <div className="row col-xl-12">
            <div className="row">
                <Header/>
            </div>
            <div className="row">
                <Main/>
            </div>
        </div>
    )
}