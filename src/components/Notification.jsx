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

    const eventSource = connectNotificationSSE();
    setSse(eventSource);

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      } catch (error) {
        console.error("SSE 데이터 파싱 오류:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      alert('SSE 연결 오류가 발생했습니다. 다시 시도하세요.');
      eventSource.close();
      setSse(null);
    };

    return () => {
      if (eventSource) {
        eventSource.close();
        disconnectNotificationSSE().catch(error => {
          console.error('SSE 알림 해제 실패:', error);
        });
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