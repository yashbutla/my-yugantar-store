import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

function Searchproducts() {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showResults, setShowResults] = useState(false); // To manage the visibility of the suggestions modal

    const fetchSearchResults = async (query) => {
        try {
            if (query.trim() === '') {
                setFilteredProducts([]);
                return;
            }

            const res = await axios.get(`https://my-yugantar-store.onrender.com/api/products/search?query=${query}`);
            setFilteredProducts(res.data);
        } catch (err) {
            console.error('Search error:', err);
        }
    };

    // Debounce for better UX and to reduce requests
    const debouncedSearch = debounce(fetchSearchResults, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);

        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    // Handle product click to set input value and hide the suggestions modal
    const handleProductClick = (productTitle) => {
        setSearchTerm(productTitle); // Set the clicked product title in the input field
        setFilteredProducts([]); // Clear the suggestions model
        setShowResults(false); // Hide the suggestions modal
    };

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="searchInput relative flex items-center border border-[#16404D] px-[20px] gap-[15px] w-[70%]">
                    <i className="fa-solid fa-magnifying-glass text-[#16404D] text-[16px]"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className=" py-[5px] w-full"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowResults(true); // Show the suggestions when typing
                        }}
                    />
                    
                </div>
            </form>

            {/* Conditionally render search results */}
            {showResults && searchTerm && (
                <div className="absolute z-[99999] max-h-[300px] overflow-y-auto w-[323px] mx-auto bg-white bg-opacity-90 text-black p-4 flex flex-col gap-[10px] border border-[#16404D]">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link
                                to={`/product/${product._id}`}
                                key={product._id}
                                onClick={() => handleProductClick(product.title)} // Update search term and hide modal
                            >
                                <h5 className="text-[15px]">{product.title}</h5>
                            </Link>
                        ))
                    ) : (
                        <p className='text-[15px] font-light'>No products found</p>
                    )}
                </div>
            )}
        </>
    );
}

export default Searchproducts;
