import Banner from "../Components/ui/Banner";
import getTimeDifference from "../utils/getTimeDifference";
import { TbNotification } from "react-icons/tb";
import Navbar from "../Components/ui/Navbar";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AiOutlineClear } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "../config/axiosConfig";
import { toast } from "sonner";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const markNotificationsAsRead = async () => {
    try {
      await axios.patch("/api/v1/notifications/mark-all-as-read");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    try {
      await axios.delete(`/api/v1/notifications/delete/${selectedNotificationId}`);
      setRefresh(prev => !prev);
      toast.success("Notification deleted successfully");
    } catch (error) {
      if (error) {
        toast.error("An error occurred while deleting notification")
      }
    }
  }

  const handleDeleteAll = async () => {
     try {
      await axios.delete("/api/v1/notifications/delete-all");
      setRefresh(prev => !prev);
      toast.success("All notifications cleared successfully")
     } catch (error) {
      if (error) {
        toast.error("An error occurred when clearing notifications");
      }
     }
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/v1/notifications");
        setNotifications(response.data);
        setLoading(false);
        markNotificationsAsRead();
      } catch (error) {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [refresh]);

  return (
    <>
      <Navbar />
      <Banner title="Notifications" />
      <div className="mx-auto p-10 sm:w-5/6 mb-20">
        <div className="flex justify-between mb-5">
          <h1 className="mb-6 text-lg font-bold">Notifications</h1>
          {notifications.length > 0 && (<button
            title="Clear all notifications"
            onClick={handleDeleteAll}
            className="bg-red-400 p-1 w-10 h-8 grid place-items-center text-white"
          >
            <AiOutlineClear size={20} />
          </button>)}
        </div>

        {/* No notifications found */}
        {!loading && notifications.length === 0 && (
          <div className="grid place-items-center">
            <img loading="lazy" src="/no-bids-found.gif" />
            <p className="text-gray-500">Wow, such empty</p>
          </div>
        )}

        {loading ? (
          <div className="grid place-items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {notifications.map((notification, index) => (
              <div
                key={index}
                onMouseEnter={() => setSelectedNotificationId(notification.id)}
                onMouseDown={() => setSelectedNotificationId(notification.id)}
                onMouseLeave={() => setSelectedNotificationId(null)}
                className="mb-4 flex"
              >
                <div className="flex min-h-full flex-1 cursor-pointer bg-gray-100 p-3 transition duration-300 ease-in-out hover:bg-gray-200">
                  <div className="flex w-full items-center justify-between align-middle">
                    <div className="flex items-center gap-3 align-middle">
                      <TbNotification className="text-gray-500" size={30} />
                      <p
                        className={`${notification.read ? "text-gray-500" : ""} font-semibold`}
                      >
                        {notification.message}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {getTimeDifference(notification.timestamp)}
                    </p>
                  </div>
                </div>
                <div
                  onClick={handleClick}
                  className={`${selectedNotificationId === notification.id ? "cursor-pointer w-10 opacity-100" : "w-0 opacity-0"} duration-800 grid place-items-center bg-red-400 text-white transition-all ease-in-out`}
                >
                  <RiDeleteBinLine size={20} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default NotificationPage;
