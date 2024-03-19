import React, { useState } from "react";
export function Items(props){
    const [display,setDisplay] = useState("flex")
    const [data,setData] = useState(props.data)
    return(
        <div className="row col-xl-8 bg-light" style={{
            position:"absolute",
            zIndex:3,
            display:display
        }}>
            {data.map((element)=>(
                <div className="row ps-3 pe-3 mt-3">
                   <div className="col-xl-12 ms-3">
                    <p><b>{element.productName}</b></p>
                   </div>
                </div>
            ))}
            <div className="row">
                <div className="col-xl-12">
                    <button className="btn btn-danger" onClick={()=>{
                        setDisplay("none")
                    }}>Exit</button>
                </div>
            </div>
        </div>
    )
}