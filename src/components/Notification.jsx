import React, { useEffect, useState } from "react";
import { getNotifications, deleteNotification } from "../apis/notification";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await getNotifications();
      if (result) {
        setNotifications(result);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteNotification(id);
    if (result) {
      setNotifications(notifications.filter((notification) => notification.id !== id));
    }
  };

  return (
    <div className="notification-popup">
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.comment}
            <button onClick={() => handleDelete(notification.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;