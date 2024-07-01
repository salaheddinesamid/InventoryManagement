import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faTimesCircle } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons
import "./OrderTracking.css"; // Import custom CSS for styling

export function OrderTracking(){
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from backend API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Update order status handler
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:9000/api/orders/${orderId}`, { status: newStatus });
      // Update local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Order Tracking</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {orders.map((order) => (
          <div className="col" key={order.id}>
            <div className={`card h-100 ${order.status === "Cancelled" ? "cancelled" : ""}`}>
              <div className="card-body">
                <h5 className="card-title">Order Number: {order.orderNumber}</h5>
                <p className="card-text">Customer: {order.customerName}</p>
                <p className="card-text">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="card-text">Status: {order.status}</p>
                <p className="card-text">Price: ${order.price ? order.price.toFixed(2) : '-'}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => updateOrderStatus(order.id, "Shipped")}
                      disabled={order.status === "Shipped" || order.status === "Cancelled"}
                    >
                      <FontAwesomeIcon icon={faTruck} className="me-1" /> Mark as Shipped
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateOrderStatus(order.id, "Cancelled")}
                      disabled={order.status === "Cancelled"}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} className="me-1" /> Cancel Order
                    </button>
                  </div>
                  <small className="text-muted">ID: {order.id}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
