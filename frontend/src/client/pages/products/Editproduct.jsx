import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [newImages, setNewImages] = useState([]); // Base64 or File list

    const [product, setProduct] = useState({
        title: "",
        stock: 0,
        vendor: "",
        price: 0,
        description: "",
        collection: [],
        images: [],
    });

    useEffect(() => {
        axios.get(`https://my-yugantar-store.onrender.com/api/getAllProducts/${id}`)
            .then((res) => {
                setProduct(res.data);
                setImagePreviews(res.data.images); // assuming images are URLs
            })
            .catch((err) => console.error("Error fetching product:", err));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const updatedProduct = {
            ...product,
            images: imagePreviews, // only updated images
        };
    
        try {
            await axios.put(`https://my-yugantar-store.onrender.com/api/getAllProducts/${id}`, updatedProduct);
            alert("Product updated successfully!");
            navigate("/dashboard/listproducts");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    

    // image upload 

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
                setNewImages(prev => [...prev, reader.result]); // Collect for upload
            };
            reader.readAsDataURL(file);
        });
    };


    // Remove image 
    const removeImage = (index) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);
    };
    


    // Delete product function 

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            await axios.delete(`https://my-yugantar-store.onrender.com/api/addproduct/${id}`);
            alert("Product deleted successfully!");
            navigate("/dashboard/listproducts");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product.");
        }
    };

    return (
        <section>
            <div className="w-[75%] border border-[#f1f1f1] p-[30px] rounded-[15px]">
                <h4 className="text-[#16404D] text-[19px] mb-6">
                    <i className="fa-solid fa-arrow-left mr-3 cursor-pointer" onClick={() => navigate(-1)}></i>
                    Edit Product
                </h4>

                <form onSubmit={handleUpdate} className="grid gap-4">
                    <div className="w-full flex flex-col">
                        <label htmlFor="title" className="mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="title" className="mb-2">Inventory stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="title" className="mb-2">Vendor</label>
                        <input
                            type="text"
                            name="vendor"
                            value={product.vendor}
                            onChange={handleChange}
                            placeholder="Vendor"
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="title" className="mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="title" className="mb-2">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border p-2 rounded"
                        />
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

                    <div className="flex justify-end gap-[15px] mt-5">
                        <button type="button" onClick={handleDelete} className="bg-red-600
                         text-white px-4 py-2 rounded"> Delete Product </button>

                        <button type="submit" className="oneButton bg-blue-600 text-white
                         px-4 py-2 rounded"> Save </button>
                    </div>

                </form>
            </div>

        </section>
    );
}

export default EditProduct;
