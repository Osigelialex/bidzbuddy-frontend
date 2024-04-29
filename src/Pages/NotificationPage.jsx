import Banner from "../Components/ui/Banner";
import { useAuth } from "../hooks/AuthProvider";
import { CiLock } from "react-icons/ci";
import getTimeDifference from "../utils/getTimeDifference";
import { TbNotification } from "react-icons/tb";

const NotificationPage = () => {
  const auth = useAuth();

  return (
    <>
      <Banner title="Notifications" />
      {auth.user ? (
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
      ) : (
        <div className="grid place-items-center gap-3 mx-auto py-10">
          <CiLock size={70} />
          <p className="text-lg">Please login to view your notifications</p>
        </div>
      )}
      
    </>
  );
}
 
export default NotificationPage;