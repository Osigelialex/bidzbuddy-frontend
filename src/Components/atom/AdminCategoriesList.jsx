import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "../../config/axiosConfig";
import Dialog from "./Dialog";
import { toast } from "sonner";

export default function CategoriesList({ data, handleRefresh }) {
  const [query, setQuery] = useState("");

  const sortedData = data.sort((a, b) => a.id - b.id);
  const filteredRows = sortedData.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Category Name", width: 340 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <button className="bg-purple-200 p-2 text-purple-500">
          <FaPencil size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className="p-2">
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

      <ul className="mx-auto w-full bg-white sm:w-2/3 border">
        <div className="flex justify-between p-2">
          <h2>Product Categories</h2>
          <button className="bg-purple-200 px-3 py-1 text-black text-md">
            Create New
          </button>
        </div>
        {filteredRows.length == 0 && (
          <div className="grid place-items-center">
            <img src="/no-bids-found.gif" />
            <p>Category not found</p>
          </div>
        )}

        {filteredRows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between border bg-white p-3 align-middle"
          >
            <div className="flex gap-3">
              <MdOutlineCategory size={20} className="text-purple-500" />
              {row.name}
            </div>

            <button className="bg-purple-200 p-2 text-purple-500">
              <FaPencil size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
