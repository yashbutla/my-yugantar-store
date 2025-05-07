import React, { useState, useEffect, useContext } from 'react'
import logo from '../assets/images/Yugantar_logo.png'
import YogaStore from '../assets/images/YogaStore.png';
import { Link } from 'react-router-dom';
import { CartContext } from '../header/CartContext';

import '../App.css'
import axios from 'axios';
import Searchproducts from './Searchproducts';

function Header() {
    const { cartItems } = useContext(CartContext);

    const cartCount = cartItems.length;

    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [productMap, setProductMap] = useState({});
    const [loading, setLoading] = useState(true);

    // ------ Fetching collection -----

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await axios.get('https://my-yugantar-store.onrender.com/api/collections/');
                // console.log("Fetched collections:", res.data);

                const filtered = res.data.filter(item => item.showOnFrontend === true)
                    .slice(0, 10);
                // console.log("Filtered collections:", filtered);

                setCollections(filtered);
            } catch (error) {
                console.log("Error fetching collection:", error);
            }
        };

        fetchCollection();
    }, []);


    useEffect(() => {
        const fetchProductsForNavbar = async () => {
            try {
                // console.log("✅ Full collections object:", collections);

                if (!Array.isArray(collections)) {
                    console.log("❌ Collections is not an array");
                    setLoading(false);
                    return;
                }

                // Get all product IDs from all subcollections in all collections
                const productIds = collections.flatMap(col =>
                    Array.isArray(col.subcollections)
                        ? col.subcollections.flatMap(sub =>
                            Array.isArray(sub.products)
                                ? sub.products.map(p => typeof p === 'string' ? p : p._id)
                                : []
                        )
                        : []
                ).filter(Boolean);

                // console.log("✅ Extracted product IDs:", productIds);

                if (!productIds.length) {
                    console.log("⚠️ No product IDs found in subcollections");
                    setLoading(false);
                    return;
                }

                const res = await axios.post("https://my-yugantar-store.onrender.com/api/getproducts", {
                    ids: productIds,
                });

                // console.log("✅ Fetched products:", res.data);

                const map = {};
                res.data.forEach(prod => {
                    map[prod._id] = prod;
                });

                setProductMap(map);
                setLoading(false);
            } catch (err) {
                console.error("❌ Error fetching products for navbar:", err);
                setLoading(false);
            }
        };

        fetchProductsForNavbar();
    }, [collections]);


    if (loading) return <p>Loading...</p>;


    const collectionImages = {
        "yoga-and-exercise": YogaStore,
        // "books": Books,
        // "clothing": Clothing,
        // Add others based on their slugs
    };

    return (
        <>
        
            {/* top header  */}
            <section className='bg-[#DDA853] py-[12px]'>
                <div>
                    <p className='text-center text-[15px] text-[#fff]'>Explore our store</p>
                </div>
            </section>

            {/* mid-header  */}

            <section className='px-[60px] py-[20px] border border-b-[#dbdbdb] border-solid'>
                <div className='flex justify-between'>
                    
                    <div className='w-[33%] relative '>
                        <Searchproducts/>
                    </div>

                    <div className='w-[33%] flex justify-center items-center'>
                        <Link to="/" className='w-full flex items-center justify-center'>
                            <img src={logo} alt="logo" loading='lazy' className='max-w-[140px] h-auto' />
                        </Link>
                    </div>

                    <div className='w-[33%] gap-[20px] flex justify-end'>


                        <a href="#">
                            <div className='border border-[#c1c1c1] border-solid py-1 px-[15px]'>
                                <h4> Liked
                                    <i class="fa-solid fa-heart text-[16px] text-[#16404D] ml-2"></i>
                                </h4>
                            </div>
                        </a>

                        <Link to="/cart">
                            <div className='relative border border-[#c1c1c1] border-solid py-1 px-[15px]'>
                                <h4>Cart <i className="fa-solid fa-cart-shopping text-[16px] text-[#16404D]"></i></h4>
                                <div className='absolute top-[-9px] right-[-7px] bg-[#16404D] w-[20px] h-[20px] rounded-full flex items-center justify-center'>
                                    <span className='text-[13px] text-[#fff] leading-[20px]'>{cartCount}</span>
                                </div>
                            </div>
                        </Link>


                    </div>

                </div>
            </section>

            {/* lower header  */}

            <section className='lower-header px-[60px] py-[20px] '>
                <nav className="bg-white">
                    <div className="">
                        <div className="flex justify-between h-8 items-center relative">

                            {/* Desktop Menu */}
                            <div className="w-full hidden md:flex gap-[30px] ">
                                {collections.map((collection, index) => (
                                    <div className="group z-30" key={collection._id}>

                                        <button className="text-gray-600 hover:text-[#0d2c35] font-normal">
                                            {collection.title}
                                        </button>

                                        <div className="absolute left-0 top-full w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            <div className="max-w-7xl mx-auto px-6 py-6">
                                                <div className="grid grid-cols-5 gap-6">
                                                    {collection.subcollections.map((sub, i) => (
                                                        <div key={i}>
                                                            <Link
                                                                to={`/collection/${collection.slug}`}
                                                                className=""
                                                            >
                                                                {sub.subcollectionName}
                                                            </Link>

                                                            {/* <h2>{sub.subcollectionName}</h2> */}
                                                            <ul>
                                                                {sub.products?.slice(0, 4).map((product) => (
                                                                    <Link to={`/product/${product._id}`} key={product._id}>
                                                                        <li>{product.title}</li>
                                                                    </Link>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}


                                                    <div>
                                                        <img
                                                            src={collectionImages[collection.slug] || '/assets/default.png'}
                                                            alt={collection.title}
                                                            className="w-32 h-auto"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>



                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-gray-700 focus:outline-none"
                                >
                                    {mobileMenuOpen ? "✖" : "☰"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white shadow-md">
                            <div className="relative">
                                <button
                                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                    Products {mobileDropdownOpen ? "▲" : "▼"}
                                </button>
                                {mobileDropdownOpen && (
                                    <div className="bg-gray-100 ml-4">
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-300">Yoga & Exercise</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-300">Books</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-300">Clothing</a>
                                    </div>
                                )}
                            </div>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">About</a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Contact</a>
                        </div>
                    )}
                </nav>
            </section>
        </>
    )
}

export default Header
