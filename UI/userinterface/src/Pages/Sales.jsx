import React, { useEffect, useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChartLine, faFileInvoice, faFilter, faMoneyBill, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import "./Sales.css"; // Import your CSS file for styles

export function Sales() {
    const axiosInstance = Axios.create({
        baseURL: "http://localhost:9000",
        headers: {
            "Content-type": "application/json"
        }
    });

    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get("/orders/");
                setOrderDetails(response.data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchOrderDetails();
    }, [axiosInstance]);

    return (
        <div className="sales-container">
            <div className="row mt-4">
                {/* Sales cards */}
                <div className="col-xl-3">
                    <SalesCard icon={faPeopleGroup} value={10} label="Customers" change="+6.5%" />
                </div>
                <div className="col-xl-3">
                    <SalesCard icon={faFileInvoice} value={56} label="Invoices" change="+11.5%" />
                </div>
                <div className="col-xl-3">
                    <SalesCard icon={faMoneyBill} value={17} label="Revenue" change="+8.05%" />
                </div>
                <div className="col-xl-3">
                    <SalesCard icon={faChartLine} value={50} label="Profit" change="+10%" />
                </div>
            </div>

            {/* Analytics section */}
            <div className="row mt-4">
                <div className="col-xl-7">
                    <div className="analytics-card">
                        <h4>Sales Analytics</h4>
                        <BarChart
                            series={[
                                { data: [35, 44, 20, 10, 45, 80, 70, 10, 66, 55, 33, 11] },
                                { data: [35, 12, 10, 10, 50, 70, 23, 45, 65, 21, 77, 76] },
                            ]}
                            height={290}
                            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    </div>
                </div>
                <div className="col-xl-5">
                    <div className="analytics-card">
                        <h4>Invoices Statistics</h4>
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

            {/* Customer details */}
            <div className="row mt-4">
                <div className="col-xl-12">
                    <div className="customer-details">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Customer Details</h4>
                            <button className="btn btn-light">
                                <FontAwesomeIcon icon={faFilter} /> Filter
                            </button>
                        </div>
                        <div className="customer-table mt-4">
                            <div className="table-header">
                                <div>No</div>
                                <div>IdCustomer</div>
                                <div>Customer name</div>
                                <div>Order date</div>
                                <div>Status</div>
                                <div>Price</div>
                            </div>
                            {orderDetails.map((order) => (
                                <div className="table-row" key={order.id}>
                                    <div>{order.id}</div>
                                    <div>{order.idOfCustomer}</div>
                                    <div>{order.nameOfCustomer}</div>
                                    <div>{order.date}</div>
                                    <div>
                                        <span className={`status-badge ${order.status === "Requested" ? "requested" : order.status === "Delivered" ? "delivered" : ""}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div>{order.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Separate functional component for sales card
const SalesCard = ({ icon, value, label, change }) => (
    <div className="sales-card">
        <div className="sales-header">
            <button className="btn btn-icon">
                <FontAwesomeIcon icon={icon} />
            </button>
            <div className="sales-info">
                <div className="sales-value">{value}</div>
                <div className="sales-label">{label}</div>
            </div>
        </div>
        <hr />
        <div className="sales-footer">
            <div className="change">
                <p>
                    <span className="change-value">{change}</span> since last week
                </p>
            </div>
            <div className="arrow">
                <button className="btn btn-light">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    </div>
);

export default Sales;
