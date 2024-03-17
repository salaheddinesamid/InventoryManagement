import React from "react";
import "../Dashboard.css"
import { Header } from "../Components/Header";
import { Main } from "../Components/Main";
export function Dashboard(){
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