import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCollection() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState({
        title: "",
        description: "",
        subcollections: "",
        products: [],
        image: "",
        showOnFrontend: false,
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`https://my-yugantar-store.onrender.com/api/collections/${id}`)
            .then((res) => {
                const data = res.data;
                setCollection({
                    title: data.title || "",
                    description: data.description || "",
                    subcollections: data.subcollections?.map(sc => sc.subcollectionName).join(", ") || "",
                    products: data.products || [],
                    image: data.image || "",
                    showOnFrontend: data.showOnFrontend || false
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching collection:", err);
                setError("Failed to load collection.");
                setLoading(false);
            });
    }, [id]);



    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollection((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Update collection
    const handleUpdate = (e) => {
        e.preventDefault();

        // When preparing the data to update
        const updatedData = {
            ...collection,
            products: collection.products.map((p) => (typeof p === "string" ? p : p._id)), // Ensure products are just IDs
            subcollections: collection.subcollections.split(",").map((tag) => {
                return { subcollectionName: tag.trim(), products: [] }; // Initialize empty product array for each subcollection
            }),
        };

        // Send the updated collection to the backend
        axios
            .put(`https://my-yugantar-store.onrender.com/api/collections/${id}`, updatedData)
            .then(() => {
                alert("Collection updated successfully!");
                navigate("/dashboard/listcollections");
            })
            .catch((err) => {
                console.error("Error updating collection:", err);
                alert("Failed to update the collection.");
            });
    };



    //✅ RemoveProduct 

    const handleRemoveProduct = (productId) => {
        const confirmed = window.confirm("Are you sure you want to remove this product from the collection?");
        if (!confirmed) return;

        // Remove the product locally
        setCollection((prev) => ({
            ...prev,
            products: prev.products.filter((p) => p._id !== productId), // Remove product
        }));
    };

    // ✅ Delete collection
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this collection?");
        if (!confirmed) return;

        try {
            await axios.delete(`https://my-yugantar-store.onrender.com/api/collections/${id}`);
            alert("Collection deleted successfully!");
            navigate("/dashboard/listcollections");
        } catch (error) {
            console.error("Error deleting collection:", error);
            alert("Failed to delete the collection.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <section>
            <div className="w-[75%] border border-[#f1f1f1] p-[30px] rounded-[15px]">
                <h4 className="text-[#16404D] text-[19px] mb-6">
                    <i
                        className="fa-solid fa-arrow-left mr-3 cursor-pointer"
                        onClick={() => navigate(-1)}
                    ></i>
                    Edit Collection
                </h4>

                <form onSubmit={handleUpdate} className="grid gap-4">
                    {/* Title */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={collection.title}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            placeholder="Collection Title"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-2">Description</label>
                        <textarea
                            name="description"
                            value={collection.description}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            placeholder="Description"
                        />
                    </div>

                    {/* subcollections */}
                    <div className="flex flex-col">
                        <label htmlFor="subcollections" className="mb-2">Subcollections (comma separated)</label>
                        <input
                            type="text"
                            name="subcollections"
                            value={collection.subcollections}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            placeholder="e.g. Summer, Handmade, Trending"
                        />
                    </div>

                    {/* Show on Frontend */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="showOnFrontend"
                            checked={collection.showOnFrontend}
                            onChange={(e) =>
                                setCollection((prev) => ({
                                    ...prev,
                                    showOnFrontend: e.target.checked,
                                }))
                            }
                        />

                        <label htmlFor="showOnFrontend">Show this collection on frontend</label>
                    </div>


                    {/* Products */}
                    <div className="flex flex-col">
                        <label className="mb-2">Products</label>
                        {collection.products.length === 0 ? (
                            <p>No products in this collection.</p>
                        ) : (
                            collection.products.map((product, index) => (
                                <div key={product._id || index} className="border p-2 rounded flex items-center gap-4 mb-2">
                                    <div className="w-[15%]">
                                        <img
                                            src={`https://my-yugantar-store.onrender.com${product.images[0]}`}
                                            alt={product.title}
                                            className="w-[60px] h-[60px] object-cover rounded"
                                        />
                                    </div>
                                    <div className="w-[70%]">
                                        <h5 className="text-sm font-medium">{product.title}</h5>
                                    </div>
                                    <div className="w-[3%]">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProduct(product._id)}
                                        >
                                            <i className="fa-solid fa-x text-[14px]"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-5">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete Collection
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EditCollection;
