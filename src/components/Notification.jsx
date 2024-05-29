import React, { useEffect, useState } from "react";
import { getNotifications, deleteNotification, connectNotificationSSE, disconnectNotificationSSE } from "../apis/notification";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = connectNotificationSSE((event) => {
      if (event.data) {
        const newNotification = event.data;
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      }
    });

    return () => {
      if (eventSource) {
        eventSource.close();
        disconnectNotificationSSE();
      }
    };
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteNotification(id);
    if (result) {
      setNotifications(notifications.filter((notification) => notification.id !== id));
    }
  };

  return (
    <div className="notification-popup">
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.content}
            <button onClick={() => handleDelete(notification.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;