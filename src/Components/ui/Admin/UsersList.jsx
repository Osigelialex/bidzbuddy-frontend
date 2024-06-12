import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { CircularProgress } from "@mui/material";
import AdminUsersList from "../../atom/AdminUsersList";

const UsersList = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/v1/users");
      setUsers(response.data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <div className="pb-10 font-saira">
      <div className="flex flex-col justify-between bg-white p-3 mx-1 align-middle">
        <h1 className="text-md font-semibold">
          <p>Users</p>
        </h1>
        <div className="text-xs items-center gap-3 align-middle text-gray-500">
          <p>{new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>
      <div className="my-8 mx-2 overflow-x-scroll">
        {loading ? (
          <div className="min-h-screen grid place-items-center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <AdminUsersList data={users} />
        )}
      </div>
    </div>
  );
}

export default UsersList;