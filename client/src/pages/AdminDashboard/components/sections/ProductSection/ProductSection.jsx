import styles from "./ProductSection.module.css";
import { useState, useEffect } from "react";
import ProductForm from "./ProductForm/ProductForm";
import api from "../../../../../api/axios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  // console.log("api:",api)
  // Fetch all products
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/product?page=${page}&limit=10`);
      // console.log("Fetch Products Response:", response.data);
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setTotalProducts(response.data.pagination.total);
        setCurrentPage(page);
      } else {
        alert("Failed to fetch products: " + (response.data.message || "Unknown error"));
        setError(response.data.message || "Failed to fetch products");
      }
    } catch (err) {
      alert("Error fetching products: " + (err.response?.data?.message || "Network error. Please try again."));
      setError(err.response?.data?.message || "Network error. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };



  // Delete product with confirmation
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/product/${id}`);
      
      if (response.data.success) {
        alert("Product deleted successfully!");
        fetchProducts(currentPage);
      } else {
        alert("Failed to delete product: " + (response.data.message || "Unknown error"));
        setError(response.data.message || "Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product: " + (err.response?.data?.message || "Network error. Please try again."));
      setError(err.response?.data?.message || "Network error. Please try again.");
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit product - open form with product data
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Handle form submit (create/update)
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (editingProduct) {
        // Update existing product
        response = await api.put(`/product/${editingProduct._id}`, formData);
        
        if (response.data.success) {
          alert("Product updated successfully!");
          handleCloseForm();
          fetchProducts(currentPage);
        } else {
          alert("Failed to update product: " + (response.data.message || "Unknown error"));
          setError(response.data.message || "Failed to update product");
        }
      } else {
        // Create new product
        response = await api.post("/product", formData);
        
        if (response.data.success) {
          alert("Product created successfully!");
          handleCloseForm();
          fetchProducts(1);
        } else {
          alert("Failed to create product: " + (response.data.message || "Unknown error"));
          setError(response.data.message || "Failed to create product");
        }
      }
    } catch (err) {
      
      const errorMsg = err.response?.data?.message || "Network error. Please try again.";
      alert("Error submitting form: " + errorMsg);
      setError(errorMsg);
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Get status badge class
  const getStatusClass = (stockQuantity) => {
    if (stockQuantity === 0) return styles.outOfStock;
    if (stockQuantity < 10) return styles.lowStock;
    return styles.inStock;
  };

  // Get status text
  const getStatusText = (stockQuantity) => {
    if (stockQuantity === 0) return "Out of Stock";
    if (stockQuantity < 10) return "Low Stock";
    return "In Stock";
  };

  // Pagination controls
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage);
    }
  };

  return (
    <div className={styles.products}>
      <div className={styles.header}>
        <div>
          <h2>Products Management</h2>
          <p className={styles.subtitle}>
            Total Products: {totalProducts} | Page {currentPage} of {totalPages}
          </p>
        </div>
        <button 
          className={styles.addButton} 
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          + Add Product
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Product Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Final Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  {/* <td>#{product.product_id || product._id.slice(-6)}</td> */}
                  <td>
                    <div className={styles.productInfo}>
                      {product.coverImage && (
                        <img 
                          src={product.coverImage} 
                          alt={product.name}
                          className={styles.productImage}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                          }}
                        />
                      )}
                      <div>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productBrand}>{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>₹{product.price?.toFixed(2) || '0.00'}</td>
                  <td>{product.discount || 0}%</td>
                  <td>₹{(product.finalPrice || product.price || 0).toFixed(2)}</td>
                  <td>{product.stockQuantity || product.sizes?.reduce((sum, s) => sum + s.stock, 0) || 0}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(product.stockQuantity || 0)}`}>
                      {getStatusText(product.stockQuantity || 0)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={styles.editBtn}
                      onClick={() => handleEdit(product)}
                      disabled={loading}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(product._id, product.name)}
                      disabled={loading}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className={styles.noData}>
                  {loading ? "Loading..." : "No products found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProductSection;