import { Link } from "react-router-dom"
import GridViewIcon from '@mui/icons-material/GridView';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';

const SDSidebar = () => {
  return (
    <div className="flex flex-col justify-between p-4 sm:col-span-2 border-r min-h-full max-h-screen">
      <div>
        <Link to="#">
          <div className="py-3 text-gray-400 font-bold flex items-center align-middle gap-3">
            <GridViewIcon />
            <p>Overview</p>
          </div>
        </Link>
        <Link to="#">
          <div className="py-3 text-gray-400 font-bold flex items-center align-middle gap-3">
            <StorefrontIcon />
            <p>My Products</p>
          </div>
        </Link>
        <Link to="#">
          <div className="py-3 text-gray-400 font-bold flex items-center align-middle gap-3">
            <LocalAtmIcon />
            <p>Orders</p>
          </div>
        </Link>
        <Link to="#">
          <div className="py-3 text-gray-400 font-bold flex items-center align-middle gap-3">
            <NotificationsNoneIcon />
            <p>Notifications</p>
          </div>
        </Link>
        <hr className="my-3"/>
        <Link to="#">
          <div className="py-3 text-gray-400 font-bold flex items-center align-middle gap-3">
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SDSidebar;