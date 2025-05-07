import React, { useEffect, useState } from "react";
import axios from "axios";
import Group from "../assets/images/Group.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Bestseller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://my-yugantar-store.onrender.com/api/collections/slug/best-seller?limit=8"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch best seller", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-[#fff] px-[20px] py-[20px] w-[90%]">
      <div className="flex justify-center items-center mb-[10px]">
        <h1 className="text-[30px] text-[#16404D] font-medium ">Best Seller</h1>
        <img src={Group} alt="Group" className="mb-[25px] ml-[5px]" />
      </div>

      {products.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={4}
          spaceBetween={10}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="bestsellerSlider"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product._id || index}>
              <div>
                <img
                  src={`https://my-yugantar-store.onrender.com/${product.images[0]}`}
                  alt={product.title}
                  className="w-full h-[306px] object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </section>
  );
}

export default Bestseller;
