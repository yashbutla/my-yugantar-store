import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Group from "../assets/images/Group.png";

function Newarrival() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await axios.get('https://my-yugantar-store.onrender.com/api/collections/slug/new-arrival');

                // console.log("Fetched products:", res.data);  // <-- debug here
                setProducts(res.data);
            } catch (error) {
                console.error("Error loading New Arrival collection", error.response?.data || error.message);
            }

        };

        fetchCollection();
    }, []);

    return (
        <>
            <section className="px-[20px] py-[30px] w-full bg-[#faf4dc]">
                <div className="flex items-center justify-center">
                    <h1 className="text-[30px] text-[#16404D] font-medium">New Arrivals</h1>
                    <img src={Group} alt="Group" className="mb-[25px] ml-[5px]" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-[10px] mt-[10px]">

                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div className="w-[16%]" key={index}>
                                <a href="#">
                                    <div className="relative group">
                                        <img
                                            src={`https://my-yugantar-store.onrender.com${product.images?.[0]}`}
                                            alt={product.title}
                                            className="w-full max-h-[237px] mb-[15px] object-cover"
                                        />

                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                            <button className="bg-white px-[15px] py-[6px] text-[#16404D] shadow-lg">
                                                <i className="fa-regular fa-heart mr-2"></i>
                                                Wishlist
                                            </button>
                                        </div>
                                    </div>

                                    <div className="product-details">
                                        <h1 className="text-[18px] text-[#575757]">{product.title}</h1>
                                        <h4 className="text-[15px] mt-[5px] text-[#16404D]">₹ {product.price}</h4>
                                    </div>
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No new arrivals found.</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Newarrival;
