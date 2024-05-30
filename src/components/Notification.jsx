import React, { useEffect, useState } from "react";
import { getNotifications, deleteNotification, connectNotificationSSE, disconnectNotificationSSE } from "../apis/notification";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [sse, setSse] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await getNotifications();
      if (result && Array.isArray(result)) {
        setNotifications(result);
      } else {
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const eventSource = connectNotificationSSE();
    setSse(eventSource);
    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      eventSource.close();
      setSse(null);
    };

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
      <ul>
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