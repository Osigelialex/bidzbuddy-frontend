import * as React from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import axios from "../../config/axiosConfig";
import Dialog from "./Dialog";
import EditCategoryDialog from "./EditDialog";
import { toast } from "sonner";

export default function CategoriesList({ data, handleRefresh }) {
  const [newCategory, setNewCategory] = useState("");
  const [addCategoryDialog, setAddCategoryDialog] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [prev, setPrev] = useState("");
  const [id, setId] = useState(null);
  const [query, setQuery] = useState("");

  const sortedData = data.sort((a, b) => a.id - b.id);
  const filteredRows = sortedData.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  );

  const addNewCategory = async () => {
    try {
      await axios.post("/api/v1/categories", { name: newCategory });
      handleRefresh();
      toast.success("Category added successfully");
      setNewCategory("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error. Please try again");
      } else {
        toast.error("An error occurred. Please try again");
      }
    }
  }

  const handleClick = (prev, id) => {
    setPrev(prev);
    setId(id);
    setEditCategory(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddCategoryDialog(true);
  }

  return (
    <div className="p-2 font-poppins">
      {addCategoryDialog && (
        <Dialog
          title="Add Category"
          message={`Are you sure you want to add \"${newCategory}\" as a new category?`}
          callback={addNewCategory}
          onClose={() => setAddCategoryDialog(false)}
        />
      )}

      {editCategory && (
        <EditCategoryDialog
          onClose={() => setEditCategory(false)}
          callback={handleRefresh}
          previous={prev}
          id={id}
        />
      )}

      <div className="relative mx-auto mb-10 w-full rounded-xl border bg-[#efefef] hover:ring-2 hover:ring-purple-300 sm:w-1/2">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl p-2 pl-8 outline-none"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-6 mb-5 w-1/3 min-h-12"
      >
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="px-2 border outline-none hover:ring-2 hover:ring-purple-300 col-span-5"
          required
        />
        <button type="submit" className="bg-purple-500 p-2 text-white h-full col-span-1 grid place-items-center">
          <FaPlus size={28} />
        </button>
      </form>

      <ul className="mx-auto w-full bg-white border">
        <div className="flex justify-between p-2">
          <h2>Product Categories</h2>
        </div>
        {filteredRows.length == 0 && (
          <div className="grid place-items-center">
            <img src="/no-bids-found.gif" loading="lazy" />
            <p>Category not found</p>
          </div>
        )}

        {filteredRows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between border bg-white p-3 align-middle"
          >
            <div className="flex gap-3">

              {row.name}
            </div>

            <button className="p-2 text-purple-500">
              <FaPencil size={20} onClick={() => handleClick(row.name, row.id)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
