import { useAuth } from "../../hooks/AuthProvider";
import { FaBook } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";

const Overview = () => {
  const auth = useAuth();

  return (
    <div className="h-full w-full rounded bg-white md:col-span-9">
      <div className="border-b p-5">
        <h1 className="text-left text-xl font-bold">Account Overview</h1>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <div className="min-h-40 rounded-md border">
          <div className="border-b p-3 flex items-center align-middle gap-3">
            <FaBook size={20} />
            <h1 className="text-left">Personal Information</h1>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <p>
              {auth.user?.firstname} {auth.user?.lastname}
            </p>
            <p className="text-sm text-gray-500">{auth.user?.email}</p>
            <p>username: {auth.user?.username}</p>
            <p>Account type: {auth.user?.role}</p>
          </div>
        </div>
        <div className="min-h-40 rounded-md border">
          <div className="border-b p-3 flex items-center align-middle gap-3">
            <FaRegAddressBook size={20} />
            <h1 className="text-left">Address Book</h1>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <h1>Your default shipping address:</h1>
            <p className="text-sm text-gray-500">
              {auth.user?.address ? auth.user?.address : <p>No address set</p>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
