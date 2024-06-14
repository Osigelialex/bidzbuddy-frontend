import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../../config/axiosConfig";
import { GrStatusGood } from "react-icons/gr";
import { TbLetterX } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import ProductViewDialog from "./ProductViewDialog";
import Dialog from "./Dialog";
import { toast } from "sonner";

export default function UnapprovedProductsList({ data, handleRefresh }) {
  const [query, setQuery] = useState("");
  const [selectedProductData, setSelectedProductData] = useState({});
  const [isApproveProductDialog, setIsApproveProductDialog] = useState(false);
  const [isDeleteProductDialog, setIsDeleteProductDialog] = useState(false);
  const [isViewDialog, setIsViewDialog] = useState(false);

  const sortedData = data.sort((a, b) => a.id - b.id);
  const filteredRows = sortedData.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  );

  const approveProduct = async () => {
    try {
      await axios.patch(`api/v1/products/approve/${selectedProductData.id}`);
      setIsApproveProductDialog(false);
      handleRefresh();
      toast.success("Successfully Approved the product for Auction");
    } catch (error) {
      setIsApproveProductDialog(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request.data.message);
      } else {
        toast.error("Check your internet connnection and try again");
      }
    }
  };

  const rejectProduct = async () => {
    try {
      await axios.patch(`api/v1/products/reject/${selectedProductData.id}`);
      setIsDeleteProductDialog(false);
      handleRefresh();
      toast.success("Project has been rejected successfully");
    } catch (error) {
      setIsCloseBiddingDialog(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request.data.message);
      } else {
        toast.error("Check your internet connnection and try again");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 150 },
    {
      field: "productImageUrl",
      headerName: "Product Image",
      width: 110,
      type: "string",
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          className="h-10 w-10 cursor-pointer rounded-full"
        />
      ),
    },
    { field: "categoryName", headerName: "Category", width: 100 },
    { field: "condition", headerName: "Condition", width: 90 },
    {
      field: "productApproved",
      headerName: "Status",
      width: 90,
      type: "boolean",
      renderCell: (params) =>
        params.value === true ? (
          <span className="rounded bg-red-50 px-2 py-1 max-w-24 min-w-24 text-red-600">
            approved
          </span>
        ) : (
          <span className="rounded bg-yellow-50 px-3 py-1 max-w-24 min-w-24 text-yellow-600">
            unapproved
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
      width: 120,
      renderCell: (params) => `₦${formatCurrency(params.value)}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="flex items-center gap-3 align-middle">
            <button title="View Product">
              <FaRegEye
                size={25}
                className="cursor-pointer bg-purple-200 p-1 text-purple-400"
                onClick={() => {
                  setSelectedProductData(cellValues.row);
                  setIsViewDialog(true);
                }}
              />
            </button>

            <button title="Approve product">
              <GrStatusGood
                size={25}
                className="cursor-pointer bg-green-200 p-1 text-green-400"
                onClick={() => {
                  setSelectedProductData(cellValues.row);
                  setIsApproveProductDialog(true);
                }}
              />
            </button>

            <button title="Reject product">
              <TbLetterX
                size={25}
                className="cursor-pointer bg-red-200 p-1 text-red-400"
                onClick={() => {
                  setSelectedProductData(cellValues.row);
                  setIsDeleteProductDialog(true);
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-2">
      {isApproveProductDialog && (
        <Dialog
          title={`Are you sure you want to approve the product "${selectedProductData.name}" ?`}
          message={`By clicking continue, you will approve "${selectedProductData.name}"
           and buyers would be able to bid for it.`}
          color={"green"}
          callback={approveProduct}
          onClose={() => setIsApproveProductDialog(false)}
        />
      )}

      {isViewDialog && (
        <ProductViewDialog
          name={selectedProductData.name}
          productImageUrl={selectedProductData.productImageUrl}
          description={selectedProductData.description}
          category={selectedProductData.categoryName}
          minimumBid={selectedProductData.minimumBid}
          condition={selectedProductData.condition}
          onClose={() => setIsViewDialog(false)}
        />
      )}

      {isDeleteProductDialog && (
        <Dialog
          title={`Are you sure you want to reject the "${selectedProductData.name}" ?`}
          message={`By clicking continue, you will reject "${selectedProductData.name}" from the product creation request and delete the product, are you sure you want to continue?`}
          callback={rejectProduct}
          onClose={() => setIsReopenBiddingDialog(false)}
        />
      )}

      <div className="relative mx-auto w-1/2 mb-10 rounded-xl border bg-[#efefef] hover:ring-2 hover:ring-purple-300">
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
