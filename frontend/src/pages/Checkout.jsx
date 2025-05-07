import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        city: "",
        pincode: "",
        address: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        const totalAmount = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input
    };


    // form validation 
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        const pincodeRegex = /^\d{6}$/;

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";
        if (!mobileRegex.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";
        if (!formData.address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        const gstAmount = parseFloat((total * 0.03).toFixed(2));
        const finalTotal = parseFloat((total + gstAmount).toFixed(2));

        try {
            const response = await axios.post("https://my-yugantar-store.onrender.com/api/orders/place", {
                ...formData,
                cart,
                subtotal: parseFloat(total.toFixed(2)),
                gst: gstAmount,
                total: finalTotal,
                paymentDone: true,
            });

            if (response.status === 201) {
                alert("Order placed successfully!");
                setFormData({
                    firstName: "", lastName: "", email: "", mobile: "",
                    city: "", pincode: "", address: "",
                });
                localStorage.removeItem("cart");
                navigate("/");
            }
        } catch (error) {
            console.error("Order error", error);
            alert("Failed to place order.");
        }

        setIsSubmitting(false);
    };

    return (
        <section className='px-[20px] py-[20px]'>
            <div className='w-full flex justify-between'>

                {/* Customer Form */}
                <div className='w-[58%] border border-[#dbdbdb] p-[25px]'>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="flex justify-between">
                            <div className="w-[48%] mb-4">
                                <label htmlFor="firstName">First name*</label>
                                <input type="text" name="firstName" placeholder="First Name"
                                    className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                    value={formData.firstName} onChange={handleInputChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-2 ml-1">{errors.firstName}</p>}
                            </div>
                            <div className="w-[48%] mb-4">
                                <label htmlFor="lastName">Last name*</label>
                                <input type="text" name="lastName" placeholder="Last Name"
                                    className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                    value={formData.lastName} onChange={handleInputChange}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-2 ml-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="w-[48%] mb-4">
                                <label htmlFor="email">Email*</label>
                                <input type="email" name="email" placeholder="Email"
                                    className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                    value={formData.email} onChange={handleInputChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-2 ml-1">{errors.email}</p>}
                            </div>
                            <div className="w-[48%] mb-4">
                                <label htmlFor="mobile">Mobile*</label>
                                <input type="tel" name="mobile" placeholder="Mobile"
                                    className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                    value={formData.mobile} onChange={handleInputChange}
                                />
                                {errors.mobile && <p className="text-red-500 text-sm mt-2 ml-1">{errors.mobile}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="w-[48%] mb-4">
                                <label htmlFor="city">City*</label>
                                <input type="text" name="city" placeholder="City"
                                    className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                    value={formData.city} onChange={handleInputChange}
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-2 ml-1">{errors.city}</p>}
                            </div>
                            <div className="w-[48%] mb-4">
                                <label htmlFor="pincode">Pincode*</label>
                                <input type="text" name="pincode" placeholder="Pincode"
                                    className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                    value={formData.pincode} onChange={handleInputChange}
                                />
                                {errors.pincode && <p className="text-red-500 text-sm mt-2 ml-1">{errors.pincode}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address">Address*</label>
                            <textarea name="address" placeholder="Address"
                                className="w-full border py-[5px] px-[15px] mt-2" autoComplete='off'
                                value={formData.address} onChange={handleInputChange}
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-sm mt-2 ml-1">{errors.address}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className='w-full bg-[#1F5D6F] text-white mt-4 py-2 px-4 hover:bg-[#16404D] transition-all duration-200'>
                            {isSubmitting ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className='w-[40%]'>
                    <div className='w-full border border-[#dbdbdb] p-[25px]'>
                        <h1 className='text-[20px] font-semibold mb-4'>Order Summary</h1>
                        <div className='space-y-3'>
                            <div className='flex justify-between'>
                                <h2 className='text-[16px]'>Subtotal</h2>
                                <p>₹ {total.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='text-[16px]'>GST (3%)</h2>
                                <p>₹ {(total * 0.03).toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='text-[16px]'>Discount</h2>
                                <p>₹ 0.00</p>
                            </div>
                            <div className='flex justify-between font-semibold'>
                                <h2 className='text-[16px]'>Total</h2>
                                <p>₹ {(total + total * 0.03).toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between mt-4 border-t pt-2 text-[18px] font-bold'>
                                <h1>Amount to Pay</h1>
                                <p>₹ {(total + total * 0.03).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Checkout;
