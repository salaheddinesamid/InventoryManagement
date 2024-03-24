import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
export function Documents(){
    const documents = [
        {
            "name":"Customers",

        },
        {
            "name":"Invoices"
        },
        {
            "name":"Orders"
        }
    ]
    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col-xl-12">
                    <h1 className="text-center">Documents:</h1>
                </div>
                <div className="row mt-3 justify-content-center">
                    {documents.map((document)=>(
                        <div className="row mt-2 justify-content-center">
                            <div className="col-xl-2">
                                <p><b>{document.name}:</b></p>
                            </div>
                            <div className="col-xl-2">
                                <button className="btn btn-success">
                                    <FontAwesomeIcon icon={faFilePdf}/> Download PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}