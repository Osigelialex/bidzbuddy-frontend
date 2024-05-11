import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "../../config/axiosConfig";
import CircularProgress from "@mui/material/CircularProgress";

const NewProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyValidImage = () => {
    const validImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (image && validImageTypes.includes(image.type)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("minimumBid", e.target.minimumBid.value);
    formData.append("condition", e.target.condition.value);
    formData.append("categoryId", e.target.category.value);
    formData.append("description", e.target.description.value);
    formData.append("productImage", image);

    try {
      await axios.post("/api/v1/products", formData);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  return (
    <form
      className="mb-10 mt-10 grid w-full place-items-start gap-5 p-3 shadow-md sm:mx-60 sm:w-1/2 sm:p-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md w-full text-center">
          {error}
        </div>
      )}
      <h1 className="mb-8 text-xl font-bold">Tell us about your new product</h1>

      <div className="flex w-full flex-col">
        <label
          className="text-sm font-bold"
          aria-label="Product Image"
          htmlFor="name"
        >
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-sm border border-gray-300 p-2"
          required
        />
      </div>

      <div className="flex w-full flex-col">
        <label
          className="text-sm font-bold"
          htmlFor="minimumBid"
          aria-label="Minimum Bid"
        >
          Minimum Bid for your product <span className="text-red-500">*</span>
        </label>
        <input
          id="minimumBid"
          type="number"
          max={10000000}
          step={5000}
          min={5000}
          className="w-full rounded-sm border border-gray-300 p-2"
          required
        />
      </div>

      <div className="flex w-full flex-col">
        <label className="text-sm font-bold" aria-label="Condition">
          Select the condition of your product{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          id="condition"
          className="w-full rounded-sm border border-gray-300 bg-white p-2"
          required
        >
          <option value="NEW">New</option>
          <option value="USED">Used</option>
        </select>
      </div>

      <div className="flex w-full flex-col">
        <label className="text-sm font-bold" aria-label="Category">
          What category does your product belong to{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          className="w-full rounded-sm border border-gray-300 bg-white p-2"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full flex-col">
        <label className="text-sm font-bold" aria-label="Product Description">
          Describe your product <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          maxLength={500}
          minLength={50}
          required
          className="min-h-28 w-full rounded-sm border border-gray-300 p-2"
        ></textarea>
      </div>

      <div className="flex w-full flex-col">
        <label className="text-sm font-bold" aria-label="Product Image">
          Upload an image of your product{" "}
          <span className="text-red-500">*</span>
        </label>
        <label
          className="cursor-pointer font-bold text-gray-500"
          aria-label="Product Image"
          htmlFor="image"
        >
          {image && verifyValidImage(image) ? (
            <img src={URL.createObjectURL(image)} />
          ) : (
            <AddPhotoAlternateIcon />
          )}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer grid place-items-center rounded-md bg-purple-500 p-3 font-bold text-white transition-all duration-300 ease-in-out hover:bg-purple-600"
      >
        {loading ? <CircularProgress size={20} /> : "Add Product"}
      </button>
    </form>
  );
};

export default NewProductForm;
