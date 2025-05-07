import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCollection() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subcollections, setsubcollections] = useState(""); // ✅ Store subcollections as a string
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showOnFrontend, setShowOnFrontend] = useState(false);
  const [showInNavigation, setShowInNavigation] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreateCollection = async (event) => {
    event.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subcollections", subcollections); // ✅ Send subcollections as a string
    formData.append("showOnFrontend", showOnFrontend);
    formData.append("image", image);
    formData.append("showInNavigation", showInNavigation);
    try {
      const response = await axios.post(
        "https://my-yugantar-store.onrender.com/api/collections/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        alert("Collection created successfully!");
        navigate("/dashboard/listcollections");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-[75%] border border-[#f1f1f1] p-[30px] rounded-[15px]">
        <h4 className="text-[#16404D] text-[19px] mb-6 flex items-center">
          <i
            className="fa-solid fa-arrow-left mr-3 cursor-pointer"
            onClick={() => navigate(-1)}
          ></i>
          Create Collection
        </h4>

        <form onSubmit={handleCreateCollection} className="space-y-5">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]"
              placeholder="e.g. Summer Collection"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-[#b9b9b9] py-[10px] px-[15px] rounded-[15px]"
              placeholder="Enter collection description..."
              required
            />
          </div>

          {/* subcollections */}
          <div className="flex flex-col">
            <label htmlFor="subcollections" className="mb-2">Subcollections (comma separated)</label>
            <input
              type="text"
              id="subcollections"
              value={subcollections}
              onChange={(e) => setsubcollections(e.target.value)}
              className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]"
              placeholder="e.g. Summer, Handmade, Trending"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="image" className="mb-2">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border border-[#b9b9b9] py-[5px] px-[15px] rounded-[15px]"
              accept="image/*"
              required
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg shadow-lg" />
            )}
          </div>


          {/* Show on Frontend Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showOnFrontend"
              checked={showOnFrontend}
              onChange={(e) => setShowOnFrontend(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="showOnFrontend" className="m-0">
              {/* Show this collection on frontend */}
              Include in homepage sections
              </label>
          </div>

          {/* Show in Navigation Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showInNavigation"
              checked={showInNavigation}
              onChange={(e) => setShowInNavigation(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="showInNavigation" className="m-0">Show this collection on Navigation (Header)</label>
          </div>


          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`oneButton ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateCollection;
