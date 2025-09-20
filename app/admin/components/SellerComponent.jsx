"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSuggestedImageUrl, getProductImageSuggestions } from "../../bazzar/utils/productImages";

export default function NewProduct({ id }) {
  // In a real-world scenario, you'd get the seller's user ID from your authentication context.
  const currentUserId = id; // Replace with actual logged-in user id

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    rating: "",
    reviews: "",
    createdAt: "",
    seller_id: currentUserId,
  });
  
  const [imageSuggestions, setImageSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  // Load image suggestions on component mount
  useEffect(() => {
    setImageSuggestions(getProductImageSuggestions());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-suggest image URL when name or category changes
    if (name === "name" || name === "category") {
      const suggestedUrl = getSuggestedImageUrl(
        name === "name" ? value : formData.name,
        name === "category" ? value : formData.category
      );
      
      if (suggestedUrl && suggestedUrl !== "https://placehold.co/400x300") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          image: suggestedUrl,
        }));
      }
    }
  };

  const handleImageSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      image: suggestion.url,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert fields to appropriate types if necessary.
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews, 10),
      createdAt: new Date(formData.createdAt),
    };

    const res = await fetch("/api/bazzar/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status == 200) {
      alert("Product published successfully!");
      router.push("/client");
    } else {
      const error = await res.json();
      alert(`Error: ${error.error}`);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold mb-6">Publish New Product</h1>
      </header>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Organic Almond Butter"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
            <option value="Fruits">Fruits</option>
            <option value="Oils">Oils</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fertilizers">Fertilizers</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium">
            Price (₹)
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="8.49"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Smooth and creamy almond butter made from organic almonds."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium">
            Image URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              placeholder="https://placehold.co/150x150"
              required
            />
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="absolute right-2 top-3 text-blue-600 hover:text-blue-800"
            >
              📷
            </button>
          </div>
          
          {/* Image Preview */}
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Image Suggestions */}
          {showSuggestions && (
            <div className="mt-2 p-3 border rounded bg-gray-50 max-h-60 overflow-y-auto">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Suggested Images:</h4>
              <div className="grid grid-cols-2 gap-2">
                {imageSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.key}
                    className="cursor-pointer border rounded p-2 hover:bg-blue-50"
                    onClick={() => handleImageSuggestionClick(suggestion)}
                  >
                    <img
                      src={suggestion.url}
                      alt={suggestion.name}
                      className="w-full h-16 object-cover rounded"
                    />
                    <p className="text-xs text-center mt-1">{suggestion.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="stock" className="block text-lg font-medium">
            Stock (kg in weight or number of products)
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="30"
            required
          />
        </div>
        <div>
          <label htmlFor="createdAt" className="block text-lg font-medium">
            Created At
          </label>
          <input
            type="datetime-local"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        {/* Hidden input for seller_id */}
        <input type="hidden" name="seller_id" value={formData.seller_id} />
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Publish Product
          </button>
        </div>
      </form>
    </main>
  );
}
