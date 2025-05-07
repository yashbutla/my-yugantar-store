import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { CartContext } from '../header/CartContext';


// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

function Productdetails() {

    const { addToCart } = useContext(CartContext);

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`https://my-yugantar-store.onrender.com/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    if (!product) return <div className="p-10 text-center">Loading...</div>;

    const discount = product.compareAtPrice && product.price
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0;


    // Handle Add to Cart

    const handleAddToCart = () => {
        const cartItem = {
            productId: product._id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity,
        };
    
        addToCart(cartItem); // This will handle duplicates
    };
    
    
    const handleBuyNow = () => {
        handleAddToCart(); // first add to cart
        window.location.href = '/cart'; // then go to cart
    };

    return (

        <>

            <section className='mt-[20px] px-[20px] py-[20px]'>
                <div className='w-full flex justify-between gap-6'>

                    {/* Product Image Slider */}
                    <div className='w-[48%]'>
                        {/* Main Product Image Swiper */}
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 h-[550px]"
                        >
                            {product.images && product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`https://my-yugantar-store.onrender.com${img}`}
                                        className="object-contain h-full w-full"
                                        alt={`Product ${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnail Swiper */}
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={false}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper h-[80px] mt-4"
                        >
                            {product.images && product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`https://my-yugantar-store.onrender.com${img}`}
                                        className="object-contain h-full w-full cursor-pointer"
                                        alt={`Thumb ${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Product Info */}
                    <div className='w-[50%]'>
                        <h2 className='text-[#16404D] text-[28px]'>{product.title}</h2>

                        <div className='flex my-5 gap-10'>
                            <div className='flex items-center gap-6'>
                                <h2 className='text-[#16404D] text-[19px]'>₹ {product.price}</h2>
                                {product.compareAtPrice && (
                                    <h2 className='text-[#16404DB2] text-[19px]'>
                                        <strike>₹ {product.compareAtPrice}</strike>
                                    </h2>
                                )}
                            </div>
                            {discount > 0 && (
                                <div className='bg-[#DDA853] px-[15px] py-[5px] rounded-[25px]'>
                                    <h2 className='text-white text-[16px]'>-{discount}% OFF</h2>
                                </div>
                            )}
                        </div>

                        <div className='flex items-center gap-2'>
                            <div className='bg-[#EE94414D] w-[30px] h-[30px] rounded-full flex items-center justify-center'>
                                <div className='bg-white w-[20px] h-[20px] rounded-full flex items-center justify-center'>
                                    <div className='bg-[#EE9441] w-[15px] h-[15px] rounded-full'></div>
                                </div>
                            </div>
                            <h2 className='text-[#16404D] text-[17px]'>
                                {product.stock > 0 ? `Only ${product.stock} left in stock` : 'Out of stock'}
                            </h2>
                        </div>

                        {/* Quantity Selector */}
                        <div className='my-5'>
                            <h2 className='text-[#16404D] text-[17px]'>Quantity</h2>
                            <div className="flex items-center gap-2 mt-2 qty-container">
                                <button
                                    className="qty-btn-minus bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
                                    type="button"
                                    onClick={handleDecrease}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input
                                    type="text"
                                    name="qty"
                                    value={quantity}
                                    readOnly
                                    className="input-qty w-12 text-center border border-gray-300 rounded py-2"
                                />
                                <button
                                    className="qty-btn-plus bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
                                    type="button"
                                    onClick={handleIncrease}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div>
                            <button
                                onClick={handleAddToCart}
                                className='border-[#16404D] border-solid border-2 w-full
                                 py-[10px]'>
                                Add to Cart
                            </button>

                            <button
                                onClick={handleBuyNow} className='bg-[#16404D] text-white w-full py-[10px] mt-4'>Buy Now</button>
                        </div>

                        {/* Description */}
                        <div className='my-5'>
                            <p className='text-[16px] text-[#333]'>
                                {product.description}
                            </p>
                        </div>

                        {/* Share */}
                        <div>
                            <a href="#" className='text-[#5C5C5C]'>
                                <i className="fa-solid fa-arrow-up-from-bracket mr-1"></i> Share
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Productdetails;
