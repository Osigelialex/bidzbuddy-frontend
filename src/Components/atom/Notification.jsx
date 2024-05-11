import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../../hooks/AuthProvider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

const Notification = () => {

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotificationCount = async () => {
      const response = await axios.get('/api/v1/notifications/count');
      setCount(response.data);
    }

    getNotificationCount();
  }, []);

  const handleClick = (event) => {
    navigate('/notifications');
  };


  return (
    <>
      <Badge
        badgeContent={count === 0 ? undefined : count}
        color="secondary"
        className="cursor-pointer"
      >
        <NotificationsIcon
          color="action"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      </Badge>
    </>
  );
};

export default Notification;
