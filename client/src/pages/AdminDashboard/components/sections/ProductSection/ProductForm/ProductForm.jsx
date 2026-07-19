/* eslint-disable react-hooks/set-state-in-effect */
// eslint-disable-next-line no-unused-vars
import { UPLOADS_URL } from "../../../../../../config";
import DeletImageOnlyFromCloudnery from "../../../../../../ImageUpload/DeletImageOnlyFromCloudnery";
import FileUploadProduct from "../../../../../../ImageUpload/FileUploadProduct";
import styles from "./ProductForm.module.css";
import { useState, useEffect } from "react";

const ProductForm = ({ product = null, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    gender: "",
    price: "",
    discount: "",
    coverImage: "",
    images: [],
    sizes: [{ size: "M", stock: 0 }],
    material: "",
    fit: "",
    tags: [],
    isNewArrival: false,
    isPopular: false,
    isFeatured: false,
  });

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  // const [imageInput, setImageInput] = useState("");

  const categories = ["T-Shirts", "Shirts", "Pants", "Jeans"];
  const subCategories = [
    "Casual",
    "Formal",
    "Sports",
    "Party",
    "Western",
    "Traditional",
  ];
  const genders = ["Men", "Women", "Boys", "Girls", "Unisex"];
  const fits = ["Regular", "Slim", "Oversized", "Relaxed", "Skinny"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34"];

  console.log("UPLOADS_URL =>",UPLOADS_URL)

  // Populate form if editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        brand: product.brand || "",
        gender: product.gender || "",
        price: product.price || "",
        discount: product.discount || "",
        coverImage: product.coverImage || "",
        images: product.images || [],
        sizes: product.sizes || [{ size: "M", stock: 0 }],
        material: product.material || "",
        fit: product.fit || "",
        tags: product.tags || [],
        isNewArrival: product.isNewArrival || false,
        isPopular: product.isPopular || false,
        isFeatured: product.isFeatured || false,
      });
    }
  }, [product]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    } else if (isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
    }

    if (formData.discount) {
      const discountNum = parseFloat(formData.discount);
      if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
        newErrors.discount = "Discount must be between 0 and 100";
      }
    }

    if (formData.sizes.some((s) => s.stock < 0)) {
      newErrors.sizes = "Stock cannot be negative";
    }

    if (!formData.coverImage.trim()) {
      newErrors.coverImage = "Cover image URL is required";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  // const isValidUrl = (string) => {
  //   try {
  //     new URL(string);
  //     return true;
  //   } catch (_) {
  //     return false;
  //   }
  // };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle size changes
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    if (field === "stock") {
      newSizes[index].stock = parseInt(value) || 0;
    } else {
      newSizes[index].size = value;
    }
    setFormData({ ...formData, sizes: newSizes });
  };

  // Add size
  const addSize = () => {
    if (formData.sizes.length < 6) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, { size: "", stock: 0 }],
      });
    }
  };

  // Remove size
  const removeSize = (index) => {
    if (formData.sizes.length > 1) {
      const newSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData({ ...formData, sizes: newSizes });
    }
  };

  // Add tag
  const addTag = () => {
    if (
      tagInput.trim() &&
      !formData.tags.includes(tagInput.trim().toLowerCase())
    ) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim().toLowerCase()],
      });
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  // Add image
  // const addImage = () => {
  //   if (imageInput.trim() && isValidUrl(imageInput.trim())) {
  //     setFormData({
  //       ...formData,
  //       images: [...formData.images, imageInput.trim()],
  //     });
  //     setImageInput("");
  //   } else {
  //     alert("Please enter a valid image URL");
  //   }
  // };

  // Remove image
  // const removeImage = (index) => {
  //   const newImages = formData.images.filter((_, i) => i !== index);
  //   setFormData({ ...formData, images: newImages });
  // };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("iiiiiiiiiiiiii")
    if (validateForm()) {
      // Prepare data for API
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        discount: formData.discount ? parseFloat(formData.discount) : 0,
        sizes: formData.sizes.map((s) => ({
          ...s,
          stock: parseInt(s.stock) || 0,
        })),
        stockQuantity: formData.sizes.reduce(
          (sum, s) => sum + parseInt(s.stock || 0),
          0,
        ),
        inStock: formData.sizes.some((s) => parseInt(s.stock) > 0),
      };
      onSubmit(submitData);
    }
  };

  // Inside your component
  // const [imageInput, setImageInput] = useState("");

  // Function to handle image upload success
  const handleImageUploadSuccess = (filename) => {
    // Add the uploaded image to the images array
    console.log("image:",filename)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, filename],
    }));
  };

  // Function to handle cover image upload success
  const handleCoverImageUploadSuccess = (filename) => {
    console.log("coverImage=>",filename)

    setFormData((prev) => ({
      ...prev,
      coverImage: filename,
    }));
  };

  // Function to remove image
  const removeImage = async (index) => {
    const imageToRemove = formData.images[index];

    // If it's a Cloudinary image, delete it from Cloudinary
    if (imageToRemove && imageToRemove.includes("/")) {
      // Extract public ID from the URL
      const publicId = imageToRemove.split("/").pop().split(".")[0];
      await DeletImageOnlyFromCloudnery(publicId);
    }

    // Remove from state
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Function to remove cover image
  const removeCoverImage = async () => {
    const coverImage = formData.coverImage;
    console.log("coverImage=>",coverImage)

    if (coverImage && coverImage.includes("/")) {
      const publicId = coverImage.split("/").pop().split(".")[0];
      await DeletImageOnlyFromCloudnery(publicId);
    }

    setFormData((prev) => ({
      ...prev,
      coverImage: "",
    }));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Basic Information */}
            <div className={styles.section}>
              <h3>Basic Information</h3>

              <div className={styles.formGroup}>
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Classic Cotton T-Shirt"
                  className={errors.name ? styles.error : ""}
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Product description..."
                  className={errors.description ? styles.error : ""}
                />
                {errors.description && (
                  <span className={styles.errorText}>{errors.description}</span>
                )}
              </div>
            </div>
            {/* Category & Brand */}
            <div className={styles.section}>
              <h3>Category & Brand</h3>

              <div className={styles.formGroup}>
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={errors.category ? styles.error : ""}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className={styles.errorText}>{errors.category}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Sub Category</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g., Nike"
                  className={errors.brand ? styles.error : ""}
                />
                {errors.brand && (
                  <span className={styles.errorText}>{errors.brand}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? styles.error : ""}
                >
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <span className={styles.errorText}>{errors.gender}</span>
                )}
              </div>
            </div>
            {/* Pricing */}
            <div className={styles.section}>
              <h3>Pricing Details</h3>

              <div className={styles.formGroup}>
                <label>MRP Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={errors.price ? styles.error : ""}
                />
                {errors.price && (
                  <span className={styles.errorText}>{errors.price}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0-100"
                  min="0"
                  max="100"
                  className={errors.discount ? styles.error : ""}
                />
                {errors.discount && (
                  <span className={styles.errorText}>{errors.discount}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Final Price</label>
                <input
                  type="text"
                  value={
                    formData.price && formData.discount
                      ? (
                          formData.price -
                          (formData.price * formData.discount) / 100
                        ).toFixed(2)
                      : formData.price || "0.00"
                  }
                  disabled
                  className={styles.readonly}
                />
              </div>
            </div>
            {/* Images */}
            <div className={styles.section}>
              <h3>Product Images</h3>

              {/* Cover Image Upload */}
              <div className={styles.formGroup}>
                <label>Cover Image URL *</label>

                {/* Show the existing cover image preview if it exists */}
                {formData.coverImage && (
                  <div className={styles.imagePreview}>
                    <img
                      src={`${UPLOADS_URL}${formData.coverImage}`}
                      alt="Cover"
                    />
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className={styles.removeImageBtn}
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* File upload component for cover image */}
                <FileUploadProduct
                  name="coverImage"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      coverImage: e.target.value,
                    }));
                  }}
                  onUploadSuccess={handleCoverImageUploadSuccess}
                  folderName="cover-images" // Specify folder name for Cloudinary
                  accept=".jpg,.jpeg,.png,.webp"
                  required={false}
                />

                {errors.coverImage && (
                  <span className={styles.errorText}>{errors.coverImage}</span>
                )}
              </div>

              {/* Additional Images Upload */}
              <div className={styles.formGroup}>
                <label>Additional Images</label>

                <div className={styles.imageList}>
                  {formData.images.map((img, index) => (
                    <div key={index} className={styles.imageItem}>
                      <img
                        src={`${UPLOADS_URL}/${img}`}
                        alt={`Product ${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={styles.removeImageBtn}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* File upload component for additional images */}
                <FileUploadProduct
                  name="additionalImage"
                  onChange={(e) => {
                    // This will be handled by onUploadSuccess
                  }}
                  onUploadSuccess={handleImageUploadSuccess}
                  folderName="product-images"
                  accept=".jpg,.jpeg,.png,.webp"
                  required={false}
                />
              </div>
            </div>
            {/* Sizes & Stock */}
            <div className={styles.section}>
              <h3>Sizes & Stock</h3>

              {formData.sizes.map((sizeObj, index) => (
                <div key={index} className={styles.sizeRow}>
                  <select
                    value={sizeObj.size}
                    onChange={(e) =>
                      handleSizeChange(index, "size", e.target.value)
                    }
                  >
                    <option value="">Select Size</option>
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={sizeObj.stock}
                    onChange={(e) =>
                      handleSizeChange(index, "stock", e.target.value)
                    }
                    placeholder="Stock"
                    min="0"
                  />
                  {formData.sizes.length > 1 && (
                    <button type="button" onClick={() => removeSize(index)}>
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {errors.sizes && (
                <span className={styles.errorText}>{errors.sizes}</span>
              )}
              <button type="button" className={styles.addBtn} onClick={addSize}>
                + Add Size
              </button>
            </div>
            {/* Additional Details */}
            <div className={styles.section}>
              <h3>Additional Details</h3>

              <div className={styles.formGroup}>
                <label>Material</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="e.g., 100% Cotton"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Fit</label>
                <select name="fit" value={formData.fit} onChange={handleChange}>
                  <option value="">Select Fit</option>
                  {fits.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Tags</label>
                <div className={styles.tagInputGroup}>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g., summer, casual"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button type="button" onClick={addTag}>
                    Add
                  </button>
                </div>
                <div className={styles.tags}>
                  {formData.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Flags */}
            <div className={styles.section}>
              <h3>Product Flags</h3>

              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    checked={formData.isNewArrival}
                    onChange={handleChange}
                  />
                  New Arrival
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                  />
                  Popular
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                  />
                  Featured
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : product
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
