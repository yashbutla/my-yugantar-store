import React from "react";


import Newarrival from "../components/Newarrival";
import Herosection from "../components/Herosection";
import Collection from "../components/Collection";

import Group from "../assets/images/Group.png";
import offer from "../assets/images/saree_banner.png";
import books from "../assets/images/books.png";



import saree1 from "../assets/images/Green and Red Cotton Saree.png";
import saree2 from "../assets/images/Kumkum Red Cotton Saree.png";
import saree3 from "../assets/images/Yellow and Blue Cotton Saree.png";
import saree4 from "../assets/images/Red & Gold Cotton Saree.png";
import saree5 from "../assets/images/Wheat and Gold Cotton Saree.png";
import saree6 from "../assets/images/Midnight Green and Cream Cotton Saree.png";

import spiritualHomeDecor  from "../assets/images/decor_banner.png";
import Journal  from "../assets/images/Journal Notebook.png";
import Printed  from "../assets/images/Printed Notebook.png";
import NotePad from "../assets/images/Note Pad.png";
import Cloth  from "../assets/images/Cloth Notebook.png";
import Adiyogi from "../assets/images/Adiyogi Notebook.png";
import LingaBhairaviLamp from "../assets/images/Linga Bhairavi Lamp with Spoon.png";
import GelMagnet from "../assets/images/Gel Magnet.png";
import sadhguru__possibility from "../assets/images/sadhguru__possibility.png";
import sadhguru__creation from "../assets/images/sadhguru__creation.png";
import LingaBhairaviLampPlate from "../assets/images/Linga Bhairavi Lamp Plate.png";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Topproducts from "../components/Topproducts";
import Bestseller from "../components/Bestseller";


function Index() {

    return (
        <>

            {/*hero section */}
            <Herosection />


            {/* values  */}
            {<section className="px-[20px] pt-[20px]">
                <div className="flex w-full items-center justify-center gap-[20px]">

                    <div className="w-[19%] bg-[#FBF5DD] p-[20px] flex gap-[20px] items-center   justify-center">
                        <div className="bg-[#16404D] w-[45px] h-[35px] rounded-[50%] flex items-center justify-center">
                            <i class="fa-regular fa-face-smile text-[#fff] text-[17px]"></i>
                        </div>
                        <div>
                            <h2 className="text-[22px] text-[#16404D]">Rich collection</h2>
                            <p className="text-[16px] text-[#16404D]">Explore diverse book collection.</p>
                        </div>
                    </div>

                    <div className="w-[19%] bg-[#FBF5DD] p-[20px] flex gap-[20px] items-center   justify-center">
                        <div className="bg-[#16404D] w-[45px] h-[35px] rounded-[50%] flex items-center justify-center">
                            <i class="fa-regular fa-face-smile text-[#fff] text-[17px]"></i>
                        </div>
                        <div>
                            <h2 className="text-[22px] text-[#16404D]">Rich collection</h2>
                            <p className="text-[16px] text-[#16404D]">Explore diverse book collection.</p>
                        </div>
                    </div>

                    <div className="w-[19%] bg-[#FBF5DD] p-[20px] flex gap-[20px] items-center   justify-center">
                        <div className="bg-[#16404D] w-[45px] h-[35px] rounded-[50%] flex items-center justify-center">
                            <i class="fa-regular fa-face-smile text-[#fff] text-[17px]"></i>
                        </div>
                        <div>
                            <h2 className="text-[22px] text-[#16404D]">Rich collection</h2>
                            <p className="text-[16px] text-[#16404D]">Explore diverse book collection.</p>
                        </div>
                    </div>

                    <div className="w-[19%] bg-[#FBF5DD] p-[20px] flex gap-[20px] items-center   justify-center">
                        <div className="bg-[#16404D] w-[45px] h-[35px] rounded-[50%] flex items-center justify-center">
                            <i class="fa-regular fa-face-smile text-[#fff] text-[17px]"></i>
                        </div>
                        <div>
                            <h2 className="text-[22px] text-[#16404D]">Rich collection</h2>
                            <p className="text-[16px] text-[#16404D]">Explore diverse book collection.</p>
                        </div>
                    </div>

                   
                </div>
            </section>}

            {/* shop by category  */}
            <Collection />

            {/* Top Products, Best Seller, offer sections */}
            <section className=' '>


                {/* Top Products */}
                <Newarrival />

               

            </section>
            <section className="w-full bestSeller p-[40px] flex  items-center justify-center">
                 {/* Best Seller  */}

               <Bestseller/>

            </section>
            <section className="px-[20px] bg-[#16404D] w-full h-full
            ">
                {/* Top Products  */}
                <Topproducts />
            </section>

            {/* offer  */}



            {/* sarees products  */}
            <section className="px-[20px] pt-[10px]">
                <div className="flex justify-center items-center mb-[10px]">
                    <h1 className="text-[30px] text-[#16404D] font-medium">Explore Our Saree</h1>
                    <img src={Group} alt="Group" className="mb-[25px] ml-[5px]" />
                </div>

                {/* Big banner  */}
                <div>
                    <a href="#">
                        <div>
                            <img src={offer} alt="offer-banner" className="w-full  object-cover" />
                        </div>
                    </a>
                </div>

                <div className='flex flex-wrap gap-[10px] mt-[10px]'>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree1} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Green and Red Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree2} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Kumkum Red Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree3} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Yellow and Blue Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree4} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Red & Gold Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree5} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Wheat and Gold Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree6} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Midnight Green and Cream Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree6} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Midnight Green and Cream Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree5} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Wheat and Gold Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree4} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Red & Gold Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree3} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Yellow and Blue Cotton Saree</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={saree2} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Kumkum Red Cotton Saree</h1>
                            </div>
                        </a>
                    </div>
                </div>

            </section>

            {/* Home decor  */}
            {/* Notebooks  */}

            <section className="px-[20px] pt-[30px]">
                <div className="flex justify-center items-center mb-[10px]">
                    <h1 className="text-[30px] text-[#16404D] font-medium">Home Decor</h1>
                    <img src={Group} alt="Group" className="mb-[25px] ml-[5px]" />
                </div>

                {/* Big banner  */}
                <div>
                    <a href="#">
                        <div>
                            <img src={spiritualHomeDecor} alt="offer-banner" className="w-full h-[425px] object-cover" />
                        </div>
                    </a>
                </div>

                 <div className='flex flex-wrap gap-[10px] mt-[10px]'>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={Adiyogi} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Adiyogi Notebook</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={Cloth} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Cloth Notebook</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={NotePad} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>YNote Pad</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={Printed} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Printed Notebook</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={Journal} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Journal Notebook</h1>
                            </div>
                        </a>
                    </div>

                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={LingaBhairaviLamp} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Linga Bhairavi Lamp</h1>
                            </div>
                        </a>
                    </div>
                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={GelMagnet} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Gel Magnet</h1>
                            </div>
                        </a>
                    </div>
                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={sadhguru__possibility} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Sadhguru possibility</h1>
                            </div>
                        </a>
                    </div>
                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={sadhguru__creation} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Sdhguru creation</h1>
                            </div>
                        </a>
                    </div>
                    <div className='w-[16%]'>
                        <a href="#">
                            <div className="group">
                                <img src={LingaBhairaviLampPlate} alt="productphoto" className="w-full max-h-[237px] mb-[15px] object-cover" />
                            </div>

                            <div className='product-details'>
                                <h1 className='text-[18px] text-[#575757] font-medium leading-tight'>Linga Bhairavi Lamp Plate</h1>
                            </div>
                        </a>
                    </div>

                </div> 

            </section>

        </>
    );
}

export default Index;
