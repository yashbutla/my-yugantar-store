import React, { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Herosection() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        axios.get("https://my-yugantar-store.onrender.com/api/h1/receive/getbanner")  // ✅ Correct API
            .then((res) => setBanners(res.data))
            .catch((err) => console.error("Error fetching banners:", err));
    }, []);

    return (
        <section>
            <Swiper slidesPerView={1} loop={true} modules={[Navigation, Autoplay]} autoplay={{ delay: 3000 }}>
                {banners.map((banner) => (
                    <SwiperSlide key={banner._id}>
                        {/* <img src={`https://my-yugantar-store.onrender.com${banner.image}`} alt={banner.title} className="w-full" /> */}
                        <img
                            src={`https://my-yugantar-store.onrender.com/uploads/${encodeURIComponent(banner.image.split('/').pop())}`}
                            alt={banner.title}
                            className="w-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Herosection;
