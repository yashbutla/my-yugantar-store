import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Listproducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://my-yugantar-store.onrender.com/api/getAllProducts")
      .then((res) => {
        console.log("Fetched Products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleEditProduct = (id) => {
    navigate(`/dashboard/editproduct/${id}`);
  };

  return (
    
    <section>
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-[#16404D] text-[19px]">Products</h4>
        <NavLink to="/dashboard/addproducts">
          <button className="oneButton">Add Product</button>
        </NavLink>
      </div>

      <div className="border border-[#f1f1f1] border-solid pt-[20px] rounded-[15px]">
        <div className="ml-4 mb-4">
          <h4>All</h4>
        </div>

        <table className="styled-table">
          <thead className="bg-[#16404D] text-[#fff] py-[15px]">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Collection</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`https://my-yugantar-store.onrender.com${product.images[0]}`}
                        alt={product.title}
                        className="w-[60px] h-[60px] object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{product.title}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.collection && product.collection.length > 0
                      ? product.collection.map((col) => col.title).join(", ")
                      : "N/A"}
                  </td>
                  <td>{product.vendor || "N/A"}</td>
                  <td>
                    <button
                      className="viewButton"
                      onClick={() => handleEditProduct(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Listproducts;
