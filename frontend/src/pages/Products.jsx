import { useParams, Link, Links } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Group from "../assets/images/Group.png";
import '../App.css';


function Products() {

  const { slug } = useParams();


  // --- filteration Collection, Price, Sort, Tag --- 

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    collections: [],
    minPrice: '',
    maxPrice: '',
    tags: [],
    sortBy: 'Newest',
  });

  const [collectionList, setCollectionList] = useState([
    { _id: "67fb93ba589f81ef22297c07", name: "Books", slug: "books" },
    { _id: "661fc1d5a1b4c2a9df2e3b20", name: "Best Seller", slug: "best-seller" },
    { _id: "67fb7d46589f81ef22297b31", name: "Top Products", slug: "top-products" },
    { _id: "67fb7d26589f81ef22297b21", name: "Yoga and Exercise", slug: "yoga-and-exercise" },
    { _id: "661fc208a1b4c2a9df2e3b23", name: "New Arrival", slug: "new-arrival" },
  ]);

  // 👇 Handle collection slug on page load
  useEffect(() => {
    if (slug) {
      const selected = collectionList.find(col => col.slug === slug);
      if (selected) {
        setFilters(prev => ({
          ...prev,
          collections: [selected._id]
        }));
      }
    }
  }, [slug, collectionList]);

  // 👇 Fetch when filters change (especially collection is set)
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        console.log("Fetching products with filters:", filters); // ✅ Debug here
        const response = await axios.post("https://my-yugantar-store.onrender.com/api/filterproducts", filters);
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Error fetching filtered products:", error);
      }
    };

    if (filters.collections.length > 0) {
      fetchFilteredProducts();
    }
  }, [filters]);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  return (
    <>
      {/* <section className='bg-[#FBF5DD] h-[270px] flex justify-center items-center'>
        <div className="flex justify-center items-center mb-[10px]">
          <h1 className="text-[30px] text-[#16404D]">Products</h1>
          <img src={Group} alt="Group" className="mb-[25px] ml-[5px]" />
        </div>
      </section> */}

      <div className='border border-t-[#dbdbdb] border-solid'></div>

      <section className='mt-[20px] px-[20px] py-[20px]'>
        <div className='w-full flex justify-between'>

          {/* Filters */}
          <div className='w-[20%]'>
            <h2 className="text-[#16404D] text-lg font-medium mb-2">Filter</h2>

            <div className="w-full md:w-64 p-4 bg-white space-y-6">
              {/* Collections */}
              <div>
                <h2 className="text-[#16404D] text-lg font-medium mb-2">Collections</h2>
                {collectionList.map((col) => (
                  <label key={col._id} className="flex items-center my-1">
                    <input
                      type="checkbox"
                      value={col._id}
                      checked={filters.collections.includes(col._id)}
                      onChange={() => handleCheckboxChange("collections", col._id)}
                      className="form-checkbox text-indigo-600 mr-2"
                    />
                    {col.name}
                  </label>
                ))}
              </div>

              {/* Price Range */}
              <div>
                <h2 className="text-[#16404D] text-lg font-medium mb-2">Price Range</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                    className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-[#16404D] text-lg font-medium mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {["New", "Popular", "Sale"].map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleCheckboxChange("tags", tag)}
                      className={`px-3 py-1 text-sm border rounded-full cursor-pointer ${filters.tags.includes(tag)
                        ? "bg-indigo-100"
                        : "bg-gray-100 hover:bg-indigo-100"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h2 className="text-[#16404D] text-lg font-medium mb-2">Sort By</h2>
                <select
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="Newest">Newest</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className='w-[78%]'>
            <div className="flex flex-wrap gap-[14px] mt-[10px]">
              {products.map((product) => (
                <div className="w-[19%]" key={product._id}>


                  <Link to={`/product/${product._id}`}>
                    <div className="relative group">
                      <img
                        src={`https://my-yugantar-store.onrender.com${product.images[0]}`}
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
                      <div className='flex justify-between w-[55%]'>
                        <h4 className="text-[15px] mt-[5px] text-[#16404D]">₹ {product.price}</h4>
                        <h4 className="text-[15px] mt-[5px] text-[#6c1e2b]">
                          <strike>₹ {product.compareAtPrice}</strike>
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
