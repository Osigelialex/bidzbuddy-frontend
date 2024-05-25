import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/formatCurrency";

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
    field: "isBiddingClosed",
    headerName: "Status",
    width: 90,
    type: "boolean",
    renderCell: (params) =>
      params.value ? (
        <span className="rounded bg-red-50 px-2 py-1 text-red-600">Closed</span>
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
];

export default function ProductsList({ data }) {
  const rows = data.map((item, index) => ({ id: index + 1, ...item }));

  return (
    <>
      <form>
        <input
          type="search"
          placeholder="Search..."
          className="mb-5 bg-[#efefef] p-2 rounded-xl"
        />
      </form>

      <div className="bg-white" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}
