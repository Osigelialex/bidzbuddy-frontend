import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "firstname", headerName: "FirstName", width: 200 },
  { field: "lastname", headerName: "LastName", width: 120 },
  { field: "username", headerName: "Username", width: 120 },
  { field: "email", headerName: "Email", width: 200 },
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
    row.firstname.toLowerCase().includes(query.toLowerCase()) ||
    row.username.toLowerCase().includes(query.toLowerCase()) ||
    row.lastname.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    
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
