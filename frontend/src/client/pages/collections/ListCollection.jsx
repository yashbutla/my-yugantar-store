import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function ListCollection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://my-yugantar-store.onrender.com/api/collections/admin/collections");
      setCollections(res.data);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collectionId) => {
    navigate(`/dashboard/editcollection/${collectionId}`);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-[#16404D] text-[19px]">Collections</h4>
        <NavLink to="/dashboard/createcollection">
          <button className="oneButton">Create Collection</button>
        </NavLink>
      </div>

      <div className="border border-[#f1f1f1] border-solid pt-[20px] rounded-[15px]">
        <div className="ml-4 mb-4">
          <h4>All</h4>
        </div>

        {loading ? (
          <p className="text-center p-4">Loading collections...</p>
        ) : error ? (
          <p className="text-center p-4 text-red-500">{error}</p>
        ) : collections.length === 0 ? (
          <p className="text-center p-4">No collections found.</p>
        ) : (
          <table className="styled-table w-full text-left">
            <thead className="bg-[#16404D] text-white">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Products</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={`https://my-yugantar-store.onrender.com${collection.image}`}
                      alt={collection.title}
                      className="w-[60px] h-[60px] object-cover rounded-[50%]"
                    />
                  </td>
                  <td className="p-3">{collection.title}</td>
                  <td className="p-3">{collection.products?.length || 0}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(collection._id)}
                      className="viewButton"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default ListCollection;
