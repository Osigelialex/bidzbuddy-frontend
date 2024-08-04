import { useAuth } from "../../hooks/AuthProvider";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

const Overview = () => {
  const auth = useAuth();

  return (
    <div className="h-full w-full rounded bg-white md:col-span-9 p-5">
      <h1 className="text-left text-lg font-semibold mb-5">My Profile <span className="text-gray-500 text-sm">&gt; {auth.user.role} Account</span> </h1>
      <div className="border border-gray-100 rounded-md px-3 py-5 flex item-center align-middle gap-5 shadow-sm">
        <div>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, fontSize: 35 }}>{auth.user.username[0].toUpperCase()}</Avatar>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{auth.user.firstname} {auth.user.lastname}</h2>
          <p className="text-gray-500">{auth.user.username}</p>
          <p className="text-gray-500">{auth.user.email}</p>
        </div>
      </div>
      <div className="border border-gray-100 rounded-md shadow-sm mt-8 px-3 py-5">
        <h1 className="font-semibold text-lg mb-5">Personal Information</h1>
        <div className="grid sm:grid-cols-2 gap-3 text-gray-500">
          <div className="flex flex-col gap-3">
            <label for="firstname">First Name</label>
            <input
              id="firstname"
              type="text"
              value={auth.user.firstname}
              className="border w-full p-2 border-gray-300 outline-none rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div className="flex flex-col gap-3">
            <label for="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              value={auth.user.lastname}
              className="border w-full p-2 border-gray-300 outline-none rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div className="flex flex-col gap-3">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              value={auth.user.username}
              className="border w-full p-2 border-gray-300 outline-none rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div className="flex flex-col gap-3">
            <label for="email">Email</label>
            <input
              id="email"
              type="text"
              value={auth.user.email}
              className="border w-full p-2 border-gray-300 outline-none rounded-md bg-gray-100"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              value="07026833840"
              className="border w-full p-2 border-gray-300 outline-none rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="address">Shipping Address</label>
            <input
              id="address"
              type="text"
              value="No 6, dummy address, Fake Street, Nigeria"
              className="border w-full p-2 border-gray-300 outline-none rounded-md"
            />
          </div>
        </div>
        <button className="bg-purple-500 text-white rounded-md px-5 py-2 mt-5">Update Profile</button>
      </div>
    </div>
  );
};

export default Overview;
