import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Mainslider() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [banners, setBanners] = useState([]);
    const fileInputRef = useRef(null);


    // ----- Get banner logic -----

    useEffect(() => {
        fetchBanners();
    })

    const fetchBanners = async () => {
        try {
            const res = await axios.get("https://my-yugantar-store.onrender.com/api/h1/receive/getbanner");
            setBanners(res.data)
        } catch (err) {
            console.error("Error fetching banners:", err);
        }
    }


    // ---- uploadBanner banner logic -----

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        try {
            const res = await axios.post("https://my-yugantar-store.onrender.com/api/h1/receive/uploadBanner", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Banner uploaded successfully!");
            console.log(res.data);

            // Rest form data
            setTitle("");
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            fetchBanners();

        } catch (err) {
            console.error("Upload failed", err);
        }
    };


    // ------ Delete banner logic --------

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
        if (!confirmDelete) return; // If user cancels, do nothing
    
        try {
            await axios.delete(`https://my-yugantar-store.onrender.com/api/h1/receive/deleteBanner/${id}`);
            alert("Banner deleted successfully!");
            fetchBanners(); // Refresh the list after deletion
        } catch (err) {
            console.error("Failed to delete banner", err);
        }
    };
    

    return (
        <section>
            <div className="border border-[#f1f1f1] border-solid p-[25px] rounded-[15px]">
                <h4 className="text-[#16404D] text-[19px] mb-6">Add New Banner</h4>

                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="w-[10%]">
                            <label className="mr-3">Banner Title</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-[#b9b9b9] border-solid rounded-[10px] px-[15px] py-[5px]"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <div className="w-[10%]">
                            <label className="mr-3">Image:</label>
                        </div>
                        <div>
                            <input type="file" onChange={handleFileChange} required className="text-[14px]" />
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button type="submit" className="oneButton">Save</button>
                    </div>
                </form>
            </div>


            {/* Listing all banner */}

            <div className="mt-6">
                <h4 className="text-[#16404D] text-[19px] mb-6">Listing all Banners</h4>
                {banners.length === 0 ? (
                    <p>No banners found.</p>
                ) : (
                    banners.map((banner) => (

                        <div key={banner._id} className="flex justify-between items-center border p-2 rounded-md mb-3">
                            <div className="flex items-center gap-3">
                                <img src={`https://my-yugantar-store.onrender.com${banner.image}`} alt={banner.title} className="w-[100px] h-[50px] object-cover rounded-md" />
                                <span className="text-[16px] ml-[25px]">{banner.title}</span>
                            </div>

                            <button onClick={() => handleDelete(banner._id)} className="text-red-500">
                                <i className="fa-solid fa-trash text-[21px]"></i>
                            </button>

                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Mainslider;
