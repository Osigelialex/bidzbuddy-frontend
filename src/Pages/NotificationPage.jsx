import Banner from "../Components/ui/Banner";
import { useAuth } from "../hooks/AuthProvider";
import getTimeDifference from "../utils/getTimeDifference";
import { TbNotification } from "react-icons/tb";
import Navbar from "../Components/ui/Navbar";


const NotificationPage = () => {
  const auth = useAuth();

  return (
    <>
      <Navbar />
      <Banner title="Notifications" />
        <div className="p-10 mx-auto sm:w-5/6">
        <h1 className="font-bold text-lg mb-6">Notifications</h1>
        {auth.user.notifications.toReversed().map((notification, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mb-3 flex justify-between">
            <div className="flex gap-3">
              <TbNotification className="text-gray-500" size={30} />
              <p className="font-semibold">{notification.message}</p>
            </div>
            <p className="text-sm text-gray-500">{getTimeDifference(notification.timestamp)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
 
export default NotificationPage;