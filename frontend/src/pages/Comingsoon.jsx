import React from 'react'
import { useState } from "react";
import ganeshImage from '../assets/images/Ganesh.png'
import logo from '../assets/images/Yugantarlogo.png'
import bgSoon from '../assets/images/bgSoon.png'

function Comingsoon() {

    const [email, setEmail] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
            setEmail(""); 
        } else {
            console.error("Error:", res);
        }
    };


    return (
        <>
            <section className='mt-[50px]'>
                <div className='flex items-center justify-center flex-col'>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={ganeshImage} alt="ganesh-Image" />
                        <img src={logo} alt="ganesh-Image" className='mt-[15px]' />
                    </div>

                    <div className='md:w-[60%] my-[35px] px-[20px] md:p-0'>
                        <h1 className='text-[30px] md:text-[38px] text-center text-[#16404D] leading-[38px] md:leading-[48px] mb-[20px] font-semibold'>Yugantar - A Journey  into <br /> Timeless Sanskrit Wisdom</h1>
                        <div>
                            <p className='text-[15px] md:text-[16px] text-center text-[#2f5764]'>Discover the rich heritage of Vedic products at Yugantar.Shop. Our carefully curated selection brings you closer to the ancient wisdom and wellness of Vedic traditions. From natural herbs and organic supplements to spiritual accessories and artisanal crafts, we have everything you need to enrich your life.</p>
                        </div>
                    </div>

                    <div className='bgSoon bg-cover bg-center bg-no-repeat w-[100%] h-[325px]
                    relative '
                        style={{ backgroundImage: `url(${bgSoon})` }}>
                        <div className="overlay flex items-center justify-center flex-col">
                            <p className='text-[15px] md:text-[16px] text-[#fff] text-center'>Stay tuned...! We're putting the final touches on our online store. Your <br /> one-stop destination for all things Vedic is almost here."</p>

                            {/* form  */}
                            <div className='mt-[25px]'>
                                <form onSubmit={onSubmit}>

                                    <input type="hidden" name="access_key" value="5642e03e-134c-4fe1-95ad-15acc8a8b871" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        autoComplete='off'
                                        className="bg-[#FBF5DD] px-[15px] w-[201px] md:w-[310px] h-[35px] md:h-[45px]"
                                    />

                                    <button type="submit" className="bg-[#DDA853] text-[#fff] text-[15px] py-[5px] px-[15px] md:py-[11px] md:px-[30px] ml-[15px]"
                                    >
                                        Submit
                                    </button>
                                </form>

                            </div>

                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default Comingsoon
