import React, { useState, useEffect } from 'react'
import Group from "../assets/images/Group.png";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Collection() {

    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await axios.get('https://my-yugantar-store.onrender.com/api/collections/');
                // console.log("Fetched collections:", res.data); 
                const filtered = res.data.filter(item => item.showOnFrontend === true);
                // console.log("Filtered collections:", filtered); 
                setCollections(filtered);
            } catch (error) {
                console.log("Error fetching collection:", error);
            }
        };

        fetchCollection();
    }, []);



    return (
        <>
            <section className="px-[20px] pt-[20px]">
                <div className="flex justify-center items-center">
                    <h1 className="text-[30px] text-[#16404D] font-medium">Shop by Category</h1>
                    <img src={Group} alt="Group" className="mb-[25px] ml-[5px]" />
                </div>

                <div className="flex flex-row flex-wrap items-center justify-center gap-[30px] mt-[10px] px-[15px] w-full">

                    {collections.map((item, index) => (
                        <div className="w-fit  mb-[30px]" key={index}>
                            <Link to={`/collection/${item.slug}`} className='flex flex-col items-center'>
                                <img
                                    src={`https://my-yugantar-store.onrender.com${item.image}`}
                                    alt={item.title}
                                    className='w-[150px] h-[150px] object-cover rounded-[50%]'
                                />
                                <h2 className="text-[17px] text-[#16404D] mt-[10px] font-normal">{item.title}</h2>
                            </Link>
                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}

export default Collection
