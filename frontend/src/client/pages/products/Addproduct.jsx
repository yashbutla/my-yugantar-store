import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import '../app.css';

function AddProduct() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        compareAtPrice: "",
        stock: "",
        vendor: "",
        collections: [],
        subcollections: [],
        images: []
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [collections, setCollections] = useState([]);
    const [subcollections, setSubcollections] = useState([]);

    // Fetch all collections
    useEffect(() => {
        axios.get("https://my-yugantar-store.onrender.com/api/collections/all")
            .then((response) => {
                const cleaned = response.data.map((col) => ({
                    _id: col._id.toString(),
                    title: typeof col.title === "object" ? col.title?.en || "Untitled" : col.title,
                    slug: col.slug,
                }));
                setCollections(cleaned);
            })
            .catch((error) => {
                console.error("Error fetching collections:", error);
            });
    }, []);



    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "number" ? e.target.value.toString() : e.target.value,
        });
    };

    // Handle collection selection
    const handleCollectionSelect = (e) => {
        const selectedId = e.target.value;
        if (selectedId && !formData.collections.includes(selectedId)) {
            setFormData((prev) => {
                const updatedCollections = [...prev.collections, selectedId];
                console.log("Updated Collections (State Change):", updatedCollections);
                return { ...prev, collections: updatedCollections };
            });
        }
    };

    // Remove collection
    const removeCollection = (id) => {
        setFormData((prev) => ({
            ...prev,
            collections: prev.collections.filter((col) => col !== id),
        }));
    };


    // fetch subcolllection 

    useEffect(() => {
        const fetchAllSubcollections = async () => {
            try {
                const responses = await Promise.all(
                    formData.collections.map((id) =>
                        axios.get(`https://my-yugantar-store.onrender.com/api/collections/subcollections/${id}`)
                    )
                );

                const combined = responses.flatMap((res, idx) =>
                    res.data.map((sub) => ({
                        ...sub,
                        collectionId: formData.collections[idx],
                    }))
                );

                // Debugging log to check if subcollections are being set correctly
                console.log("🧾 Combined Subcollections:", combined);

                setSubcollections(combined);
            } catch (err) {
                console.error("Subcollections fetch error", err);
            }
        };

        if (formData.collections.length > 0) {
            fetchAllSubcollections();
        } else {
            setSubcollections([]);
        }
    }, [formData.collections]);



    // subcolllection handle Subcollection Select
    const handleSubcollectionSelect = (e) => {
        const selectedId = e.target.value;
        if (selectedId && !formData.subcollections.includes(selectedId)) {
            setFormData((prev) => ({
                ...prev,
                subcollections: [...prev.subcollections, selectedId]
            }));
        }
    };

    // subcolllection remove Subcollection
    const removeSubcollection = (id) => {
        setFormData((prev) => ({
            ...prev,
            subcollections: prev.subcollections.filter((subId) => subId !== id),
        }));
    };



    // Handle image upload
    const handleImageUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length + images.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));

        setImages([...images, ...selectedFiles]);
        setImagePreviews([...imagePreviews, ...newPreviews]);

        // ✅ Update formData.images as well
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...selectedFiles]
        }));
    };


    // Remove image
    const removeImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...imagePreviews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    // Product Form Submitting
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("compareAtPrice", formData.compareAtPrice || 0);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("vendor", formData.vendor);
    
        // Debugging log for collections
        console.log("🔍 Selected Collections Before Sending:", formData.collections);
    
        if (Array.isArray(formData.collections) && formData.collections.length > 0) {
            formDataToSend.append("collection", JSON.stringify(formData.collections)); // Send all collections
        } else {
            console.error("❌ Collection is missing or not an array:", formData.collections);
            setAlertMessage("⚠️ Please select at least one collection!");
            return;
        }
    
        // Debugging log for subcollections
        console.log("🔍 Selected Subcollections Before Sending:", formData.subcollections);
    
        if (Array.isArray(formData.subcollections) && formData.subcollections.length > 0) {
            formDataToSend.append("subcollections", JSON.stringify(formData.subcollections)); // Send subcollections
        } else {
            console.error("❌ Subcollections are missing or not an array:", formData.subcollections);
        }
    
        console.log("🖼️ Selected Images:", images);
    
        if (images.length > 0) {
            images.forEach((image) => {
                formDataToSend.append("images", image);
            });
        } else {
            console.error("❌ No images selected. Make sure you're selecting files.");
            setAlertMessage("⚠️ Please upload at least one image.");
            return;
        }
    
        // Final debug log before sending
        console.log("🚀 Final FormData Before Sending:");
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0], pair[1]);
        }
    
        try {
            const response = await fetch("https://my-yugantar-store.onrender.com/api/addproduct", {
                method: "POST",
                body: formDataToSend,
            });
    
            const result = await response.json();
            console.log("✅ Response from Server:", result);
    
            if (response.ok) {
                alert("🎉 Product added successfully!");
                navigate("/dashboard/listproducts");
            } else {
                alert(result.message || "❌ Something went wrong!");
            }
        } catch (error) {
            console.error("❌ Error submitting product:", error);
        }
    };
    

    return (
        <section>
            <div className="w-[75%] border border-[#f1f1f1] p-[30px] rounded-[15px]">
                <h4 className="text-[#16404D] text-[19px] mb-6">
                    <i className="fa-solid fa-arrow-left mr-3 cursor-pointer" onClick={() => navigate(-1)}></i>
                    Add Product
                </h4>

                <form onSubmit={handleSubmit} className="formContainer">

                    <div className="w-full flex flex-col">
                        <label htmlFor="title" className="mb-2">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]" placeholder="Enter Product title" required />
                    </div>

                    <div className="w-full flex flex-col my-5">
                        <label htmlFor="description" className="mb-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="border border-[#b9b9b9] py-[10px] px-[15px] rounded-[15px]" placeholder="Enter Product Description" required />
                    </div>

                    {/* Image Upload and Preview Section */}
                    <div className="w-full flex flex-col">
                        <label htmlFor="images" className="mb-2">Media (Max 4 images)</label>
                        <input type="file" id="images" accept="image/*" multiple onChange={handleImageUpload} className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]" />

                        {/* Image Preview */}
                        <div className="flex gap-4 mt-4 flex-wrap">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative w-20 h-20 border rounded-lg overflow-hidden">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl" onClick={() => removeImage(index)}>
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex flex-col my-5">
                        <label className="mb-2">Collections</label>

                        <select onChange={handleCollectionSelect} className="border p-[5px] rounded-[15px]">
                            <option value="">Select a collection</option>
                            {collections.map((collection) => (
                                <option key={collection._id} value={collection._id}>
                                    {collection.title}
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.collections.map((colId) => {
                                const collection = collections.find((c) => c._id === colId);
                                return (
                                    <div key={colId} className="bg-gray-200 p-2 rounded flex items-center">
                                        <span>{collection?.title || "Unknown"}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-600"
                                            onClick={() => removeCollection(colId)}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full flex flex-col my-5">
                        <label className="mb-2">Subcollections</label>
                        <select onChange={handleSubcollectionSelect} className="border p-[5px] rounded-[15px]">
                            <option value="">Select a subcollection</option>
                            {subcollections
                                .filter((sub) => formData.collections.includes(sub.collectionId))
                                .map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.subcollectionName}
                                    </option>
                                ))}
                        </select>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.subcollections.map((subId) => {
                                const sub = subcollections.find((s) => s._id === subId);
                                return (
                                    <div key={subId} className="bg-gray-200 p-2 rounded flex items-center">
                                        <span>{sub?.subcollectionName}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-600"
                                            onClick={() => removeSubcollection(subId)}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>



                    <div className="w-full flex gap-[15px]">
                        <div className="w-[50%]">
                            <label htmlFor="price" className="mb-2">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px] mt-2" placeholder="Enter Product Price" required />
                        </div>
                        <div className="w-[50%]">
                            <label htmlFor="compareAtPrice" className="pb-2">Compare-at price</label>
                            <input type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleChange} className="w-full border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px] mt-2" placeholder="Enter Product Compare-at Price" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col my-5">
                        <label htmlFor="stock" className="mb-2">Inventory stock</label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]" placeholder="Enter Inventory stock" required />
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="vendor" className="mb-2">Vendor</label>
                        <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]" placeholder="Enter Product Vendor" required />
                    </div>

                    <div className="flex justify-end mt-5">
                        <button type="submit" className="oneButton">Save</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddProduct;
