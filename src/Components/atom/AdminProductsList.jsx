import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "productImageUrl",
    headerName: "Product Image",
    width: 125,
    type: "string",
    sortable: false,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Product"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
    ),
  },
  { field: "categoryName", headerName: "Category", width: 120 },
  { field: "condition", headerName: "Condition", width: 70 },
  {
    field: "biddingClosed",
    headerName: "Status",
    width: 90,
    type: "boolean",
    renderCell: (params) => 
      params.value === true ? (
        <span className="rounded bg-red-50 px-2 py-1 text-red-600">
          Closed
        </span>
       ) : (
        <span className="rounded bg-green-50 px-2 py-1 text-green-600">
          Open
        </span>
      ),
  },
  {
    field: "minimumBid",
    headerName: "Minimum Bid",
    width: 130,
    renderCell: (params) => `₦${formatCurrency(params.value)}`,
  },
  {
    field: "currentBid",
    headerName: "Current Bid",
    width: 160,
    renderCell: (params) => `₦${formatCurrency(params.value)}`,
  },
  {
    headerName: "Actions",
    width: 200,
    renderCell: (cellValues) => {
      return <div className="flex items-center gap-3 align-middle">
        <ConfirmationDialog data={cellValues.row} />
      </div>
    },
  },
];

export default function ProductsList({ data }) {
  const [query, setQuery] = useState("");
  const sortedData = data.sort((a, b) => a.id - b.id);
  const filteredRows = sortedData.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  );

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`../../products/${params.row.id}`);
  }

  return (
    <div className="p-2">
      <div className="relative mb-5 inline-block rounded-xl bg-[#efefef] hover:ring-2 hover:ring-purple-300">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl p-2 pl-8 outline-none"
        />
      </div>

      <div className="bg-white" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          onRowClick={handleRowClick}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
