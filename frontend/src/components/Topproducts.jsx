import React, { useEffect, useState } from 'react';
import '../App.css';
import Group from '../assets/images/arrow2cream.png';

function Topproducts() {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        // Fetch only top products from the server
        fetch('https://my-yugantar-store.onrender.com/api/collections/slug/top-products?limit=10')
            .then((res) => res.json())
            .then((data) => {
                setTopProducts(data);
            })
            .catch((error) => console.error('Error fetching top products:', error));
    }, []);

    return (
        <section className='w-full h-auto  py-[50px]'>
            <div className="flex items-center justify-center">
                <h1 className="text-[30px] text-[#FBF5DD] font-normal">Top Products</h1>
                <img src={Group} alt="Top Products Section" className="mb-[25px] ml-[5px] filter" />
            </div>

            <div className="flex gap-[16px] flex-wrap mt-[10px]">
                {topProducts.map((product) => (
                    <article key={product._id} className="w-[19%]">
                        <a href={`/product/${product.slug || product._id}`}>
                            <div className="relative group overflow-hidden aspect-square">
                                <img
                                    src={`https://my-yugantar-store.onrender.com${product.images[0]}`}
                                    alt={product.title}
                                    className="w-full mb-[15px]"
                                />
                                <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                    <button className="bg-white px-[15px] py-[6px] text-[#16404D] shadow-lg">
                                        <i className="fa-regular fa-heart mr-2"></i>
                                        Wishlist
                                    </button>
                                </div>
                            </div>

                            <div className="product-details">
                                <h1 className="text-[18px] text-white font-normal">{product.title}</h1>
                                <h4 className="text-[15px] text-[#e3e3e3]">
                                    ₹ {product.price.toLocaleString('en-IN', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </h4>
                            </div>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Topproducts;
