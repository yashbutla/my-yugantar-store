import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://my-yugantar-store.onrender.com/api/orders/all")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Order fetch error:", err));
  }, []);

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 whitespace-nowrap">
          <thead className="bg-gray-200 text-gray-900">
            <tr>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Mobile</th>
              <th className="px-6 py-3">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="bg-white border-b">
                <td className="px-6 py-4">{order.orderId}</td>
                <td className="px-6 py-4">{new Date(order.date).toLocaleString()}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">₹ {order.total.toFixed(2)}</td>
                <td className="px-6 py-4">{order.paymentStatus}</td>
                <td className="px-6 py-4">{order.cart.length} items</td>
                <td className="px-6 py-4">{order.email}</td>
                <td className="px-6 py-4">{order.mobile}</td>
                <td className="px-6 py-4">{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Orders;
