import Banner from "../Components/ui/Banner";
import getTimeDifference from "../utils/getTimeDifference";
import { TbNotification } from "react-icons/tb";
import Navbar from "../Components/ui/Navbar";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../config/axiosConfig";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const markNotificationsAsRead = async () => {
    try {
      await axios.patch('/api/v1/notifications/mark-all-as-read');
    } catch (error) {
      console.error(error);
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
        console.error(error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar />
      <Banner title="Notifications" />
      <div className="mx-auto p-10 sm:w-5/6">
        <h1 className="font-bold text-lg mb-6">Notifications</h1>
        {loading ? (
          <div className="grid place-items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {notifications.toReversed().map((notification, index) => (
              <div
                key={index}
                className="mb-3 flex justify-between rounded-lg bg-gray-100 p-4"
              >
                <div className="flex gap-3">
                  <TbNotification className="text-gray-500" size={30} />
                  <p className={`${notification.read ? "text-gray-500" : ""} font-semibold`}>{notification.message}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {getTimeDifference(notification.timestamp)}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default NotificationPage;