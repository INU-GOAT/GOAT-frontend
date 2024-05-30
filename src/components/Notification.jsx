import React, { useEffect, useState } from "react";
import { getNotifications, deleteNotification, connectSSE, disconnectSSE } from "../apis/notification";
import { acceptGroupInvitation } from "../apis/group";
import "./Notification.css";

const Notification = ({ onDelete }) => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const [sse, setSse] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await getNotifications();
        if (result && Array.isArray(result)) {
          setLocalNotifications(result);
        } else {
          setLocalNotifications([]);
        }
      } catch (error) {
        console.error("알림 조회 실패:", error.response ? error.response.data : error.message);
      }
    };

    const handleSSEMessage = (event) => {
      const newNotification = JSON.parse(event.data);
      console.log("New Notification Received: ", newNotification);
      setLocalNotifications((prevNotifications) => [newNotification, ...prevNotifications]);

      if (Notification.permission === "granted") {
        new Notification(newNotification.content);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(newNotification.content);
          }
        });
      }
    };

    const eventSource = connectSSE(handleSSEMessage);
    setSse(eventSource);

    fetchNotifications();

    return () => {
      if (eventSource) {
        eventSource.close();
        disconnectSSE(eventSource);
      }
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteNotification(id);
      if (result) {
        setLocalNotifications(localNotifications.filter((notification) => notification.id !== id));
        if (onDelete) {
          onDelete(id);
        }
      }
    } catch (error) {
      console.error("알림 삭제 실패:", error.response ? error.response.data : error.message);
    }
  };

  const handleAccept = async (notificationId) => {
    try {
      const result = await acceptGroupInvitation(notificationId, true);
      if (result) {
        handleDelete(notificationId);
      }
    } catch (error) {
      console.error("초대 수락 실패:", error.response ? error.response.data : error.message);
    }
  };

  const handleDecline = async (notificationId) => {
    try {
      handleDelete(notificationId);
    } catch (error) {
      console.error("초대 거절 실패:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="notification-popup">
      <ul>
        {localNotifications.map((notification) => (
          <li key={notification.id}>
            {notification.content}
            {notification.type === "INVITE" && (
              <>
                <button onClick={() => handleAccept(notification.id)}>수락</button>
                <button onClick={() => handleDecline(notification.id)}>거절</button>
              </>
            )}
            <button onClick={() => handleDelete(notification.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;