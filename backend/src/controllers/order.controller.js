
import Order from '../models/orders.model.js'


export const placeOrder = async (req, res) => {
    try {
        const {
            firstName, lastName, email, mobile, address, city, pincode, cart, total, paymentDone
        } = req.body;

        const order = new Order({
            orderId: "ORD" + Date.now(),
            customer: `${firstName} ${lastName}`,
            email,
            mobile,
            address: `${address}, ${city} - ${pincode}`,
            cart,
            total,
            paymentStatus: paymentDone ? "Payment successful" : "Payment pending",
        });

        await order.save();
        res.status(201).json({ message: "Order placed successfully", order });

    } catch (err) {
        console.error("Order error:", err);
        res.status(500).json({ message: "Failed to place order" });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};
